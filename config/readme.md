# About This Folder

This folder contains the `keys.js`, which houses the API Keys for the application. Make sure to setup a `.env` file in the root of the application for development. Otherwise, setup the environment variables in the way that make sense for the platform you are using (E.g. Heroku, Azure, Custom...)

```env
COOKIE_KEY=Some randomly generated key for cookie encrypting/hashing
GOOGLE_CLIENT_ID=Get your client ID from console.developers.google.com
GOOGLE_CLIENT_SECRET=Get your client secret from console.developers.google.com
MONGODB_URI=Get your mongodb uri from your mongodb provider
PORT=5000 for development, or set by the platform for production
```
