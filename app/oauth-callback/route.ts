import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  
  return new NextResponse(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Google Drive API Authorization</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #0f172a;
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          .card {
            background: #1e293b;
            padding: 2.5rem;
            border-radius: 1rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
            max-width: 500px;
            width: 90%;
            text-align: center;
            border: 1px solid #334155;
          }
          h1 {
            color: #38bdf8;
            margin-top: 0;
            font-size: 1.75rem;
          }
          p {
            color: #94a3b8;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }
          .code-box {
            background: #0f172a;
            color: #38bdf8;
            padding: 1rem;
            border-radius: 0.5rem;
            font-family: monospace;
            word-break: break-all;
            margin: 1.5rem 0;
            border: 1px solid #334155;
            font-size: 0.95rem;
            user-select: all;
          }
          .copy-btn {
            background: #38bdf8;
            color: #0f172a;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;
          }
          .copy-btn:hover {
            background: #0ea5e9;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Authorization Successful!</h1>
          <p>You have successfully authorized the application. Please copy the authorization code below and paste it in the chat with your assistant.</p>
          <div class="code-box" id="code">${code || 'No authorization code found in URL'}</div>
          <button class="copy-btn" id="copyBtn">Copy Code</button>
        </div>
        <script>
          document.getElementById('copyBtn').addEventListener('click', () => {
            const codeText = document.getElementById('code').innerText;
            navigator.clipboard.writeText(codeText).then(() => {
              const btn = document.getElementById('copyBtn');
              btn.innerText = 'Copied!';
              btn.style.background = '#10b981';
              btn.style.color = '#ffffff';
              setTimeout(() => {
                btn.innerText = 'Copy Code';
                btn.style.background = '#38bdf8';
                btn.style.color = '#0f172a';
              }, 2000);
            });
          });
        </script>
      </body>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}
