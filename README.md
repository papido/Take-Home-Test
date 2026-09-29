# User Authentication App

A simple Expo React Native app with Login, Signup, and Home screens. It uses React Navigation, React Context, and AsyncStorage.

## Run

```sh
npm install
npx expo start --go
```

Scan the QR code with Expo Go. `npm start` starts the development-client build instead.

## Authentication

Authentication uses local mock accounts. The signed-in user's name and email are saved so the session is restored when the app reopens. Mock accounts are kept in memory, so after logging out and restarting the app, sign up again to create an account.
