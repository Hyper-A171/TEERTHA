const { google } = require('googleapis');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

async function testOAuth() {
  console.log('Testing with:');
  console.log('Client ID:', CLIENT_ID);
  console.log('Client Secret:', CLIENT_SECRET);
  console.log('Refresh Token:', REFRESH_TOKEN);

  try {
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    
    console.log('Requesting access token refresh...');
    const tokenResponse = await oauth2Client.getAccessToken();
    console.log('Token refreshed successfully!');
    console.log('Access Token:', tokenResponse.token);
  } catch (error) {
    console.error('OAuth Refresh Failed:');
    if (error.response && error.response.data) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error);
    }
  }
}

testOAuth();
