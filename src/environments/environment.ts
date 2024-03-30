// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: false, // TODO: Find out how to use emulators in android
  firebase: {
    apiKey: "AIzaSyDqKIS0Yj6TMszb88JBDkxvWp877a223HY",
    authDomain: "ionic-starter-6e5fa.firebaseapp.com",
    projectId: "ionic-starter-6e5fa",
    storageBucket: "ionic-starter-6e5fa.appspot.com",
    messagingSenderId: "230800217587",
    appId: "1:230800217587:web:3446db1006969fa3b06e86"
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
