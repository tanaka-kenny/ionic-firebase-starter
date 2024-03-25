// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: false, // TODO: Find out how to use emulators in android
  firebase: {
    apiKey: "AIzaSyC5PemASz1ZjWui_3X3r3lA7qfPPuTK3nY",
    authDomain: "quizquest-1dca2.firebaseapp.com",
    projectId: "quizquest-1dca2",
    storageBucket: "quizquest-1dca2.appspot.com",
    messagingSenderId: "688970826393",
    appId: "1:688970826393:web:53e657b7f1cd710592ee08",
    measurementId: "G-GP6YSXX0Y8"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
