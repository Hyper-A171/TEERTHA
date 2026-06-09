const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Load environment variables
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'https://teertha.vercel.app/oauth-callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment variables.');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Generate authorization URL
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: ['https://www.googleapis.com/auth/drive']
});

console.log('\n================================================================');
console.log('1. Open this URL in your browser to authorize the application:');
console.log(authUrl);
console.log('================================================================\n');
console.log('2. After authorizing, you will see a page showing your authorization code.');
console.log('3. Copy the code (or the entire redirected URL) and paste it below, then press Enter:');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('\nPaste code or redirect URL here: ', async (input) => {
  rl.close();
  
  let code = input.trim();
  if (code.includes('code=')) {
    try {
      const urlObj = new URL(code);
      code = urlObj.searchParams.get('code') || code;
    } catch (e) {
      // Not a valid URL, treat as direct code
    }
  }

  if (!code) {
    console.error('Invalid code. Could not extract the authorization code.');
    process.exit(1);
  }

  console.log('Exchanging authorization code for tokens...');
  try {
    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens.refresh_token) {
      console.warn('\nWarning: No refresh token was returned.');
      console.warn('If you have already authorized this app, Google does not send a new refresh token.');
      console.warn('Go to https://myaccount.google.com/connections, remove permissions for your app, and run this script again.');
    } else {
      console.log('\nSuccess! Received Refresh Token.');
      
      // Update .env file
      const envPath = path.join(__dirname, '.env');
      let envContent = fs.readFileSync(envPath, 'utf8');
      
      // Replace GOOGLE_REFRESH_TOKEN value
      const regex = /^GOOGLE_REFRESH_TOKEN=.*$/m;
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `GOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"`);
      } else {
        envContent += `\nGOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"`;
      }
      
      fs.writeFileSync(envPath, envContent, 'utf8');
      console.log('Updated .env file with new GOOGLE_REFRESH_TOKEN.');
    }
  } catch (error) {
    console.error('Error exchanging code:', error.message || error);
  }
});
