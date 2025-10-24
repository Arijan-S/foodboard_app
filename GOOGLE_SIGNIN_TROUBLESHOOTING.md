# Google Sign-In Troubleshooting Guide

## Common Issues and Solutions

### 1. "Popup was blocked" Error

**Problem**: Browser blocks the Google sign-in popup
**Solutions**:

- Allow popups for your domain in browser settings
- Try using an incognito/private window
- Disable ad blockers temporarily
- Check if browser extensions are interfering

### 2. "Google sign-in is not enabled" Error

**Problem**: Google OAuth is not properly configured in Firebase Console
**Solutions**:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`fir-project-a1973`)
3. Go to Authentication > Sign-in method
4. Enable Google provider
5. Add your domain to authorized domains:
   - `localhost` (for development)
   - Your production domain (when deployed)

### 3. "This domain is not authorized" Error

**Problem**: Your domain is not in the authorized domains list
**Solutions**:

1. In Firebase Console > Authentication > Settings
2. Add your domain to "Authorized domains":
   - `localhost` (for development)
   - Your production domain

### 4. "Network error" or Connection Issues

**Problem**: Network connectivity or Firebase configuration issues
**Solutions**:

- Check internet connection
- Verify Firebase configuration in `src/firebase/firebase.js`
- Ensure all environment variables are set correctly
- Check if Firebase project is active and billing is enabled

### 5. "Account exists with different credential" Error

**Problem**: User already has an account with email/password
**Solutions**:

- Use email/password login instead
- Or link accounts in Firebase Console

## Debugging Steps

### 1. Check Browser Console

Open browser developer tools (F12) and look for:

- Error messages in Console tab
- Network errors in Network tab
- Any blocked requests

### 2. Verify Firebase Configuration

Check that your Firebase config in `src/firebase/firebase.js` has:

- Correct API key
- Correct auth domain
- Correct project ID
- All required fields populated

### 3. Test in Different Environments

- Try different browsers (Chrome, Firefox, Safari)
- Try incognito/private mode
- Try different devices
- Check if it works on localhost vs production

### 4. Check Firebase Console

1. Go to Firebase Console
2. Check Authentication > Users tab for any error logs
3. Check Authentication > Sign-in method to ensure Google is enabled
4. Check Project Settings > General for correct configuration

## Environment Variables

Create a `.env` file in your project root with:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_DATABASE_URL=your_database_url
```

## Testing the Fix

1. Start the development server: `npm run dev`
2. Open browser console (F12)
3. Try Google sign-in
4. Check console for detailed error messages
5. Follow the specific error message guidance

## Still Having Issues?

If you're still experiencing problems:

1. Check the browser console for specific error codes
2. Verify your Firebase project settings
3. Ensure Google OAuth is properly configured
4. Try the troubleshooting steps above
5. Contact support with specific error messages

## Current Firebase Configuration

Your app is currently using these Firebase settings:

- Project ID: `fir-project-a1973`
- Auth Domain: `fir-project-a1973.firebaseapp.com`
- Database URL: `https://fir-project-a1973-default-rtdb.firebaseio.com`

Make sure these match your Firebase Console settings.
