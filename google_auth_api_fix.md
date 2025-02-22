GitHub Copilot
Let me help you fix the Google OAuth configuration. Here are the steps to properly set up Google OAuth:

Google Cloud Console Setup:

Go to https://console.cloud.google.com/
Create a new project or select an existing one
Enable the Gmail API from the API Library
Configure the OAuth consent screen
Create OAuth credentials
Update Environment Variables

.env.local
Create or update your environment variables file:

Detailed steps to get the correct credentials:

1. Create Project & Configure OAuth Screen:
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing one
3. Go to "APIs & Services" > "OAuth consent screen"
4. Select "External" user type
5. Fill in required fields:
   - App name
   - User support email
   - Developer contact email
6. Save and continue
7. Under "Scopes", add:
   - /auth/userinfo.email
   - /auth/userinfo.profile
   - /auth/gmail.readonly
8. Add your email as a test user

2. Create OAuth Credentials:
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application"
4. Add authorized JavaScript origins:
   - http://localhost:3000
5. Add authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google
6. Click "Create"
7. Copy the generated Client ID and Client Secret

3. Enable Gmail API:
1. Go to "APIs & Services" > "Library"
2. Search for "Gmail API"
3. Click "Enable"

After completing these steps:

Paste the Client ID and Client Secret into your .env.local file
Generate a random string for NEXTAUTH_SECRET (you can use openssl rand -base64 32 in terminal)
Restart your Next.js development server
These steps should resolve the "invalid_client" error and allow Google Sign-in to work properly.
