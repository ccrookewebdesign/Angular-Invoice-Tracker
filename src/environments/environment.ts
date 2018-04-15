// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB_XSJZ5fiDoT7h3xpYOZpQjV4SzmuiMN8',
    authDomain: 'angular-invoice-tracker.firebaseapp.com',
    databaseURL: 'https://angular-invoice-tracker.firebaseio.com',
    projectId: 'angular-invoice-tracker',
    storageBucket: 'angular-invoice-tracker.appspot.com',
    messagingSenderId: '418639189889'
  }
};
