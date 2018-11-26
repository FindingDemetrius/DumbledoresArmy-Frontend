// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCjAcWtMLdUUn1qHnIgG7Z5i_LyQh9FXn0',
    authDomain: 'geoquiz-1e874.firebaseapp.com',
    databaseURL: 'https://geoquiz-1e874.firebaseio.com',
    projectId: 'geoquiz-1e874',
    storageBucket: 'geoquiz-1e874.appspot.com',
    messagingSenderId: '804254899672'
  },
  apiUrl: 'https://geoquiz-1e874.appspot.com/api'
  //apiUrl: 'http://127.0.0.1:8080/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
