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

## Features

- Signup checks that fields are filled, the email is valid, and the password has at least 6 characters.
- Login validates the email and password format and reports incorrect credentials.
- Password visibility can be toggled on Login and Signup.
- Navigation shows Login and Signup while signed out, and Home while signed in.
- Home displays the user's name and email and provides a Logout button.
- AsyncStorage restores the signed-in user after the app is reopened and clears the session on logout.
