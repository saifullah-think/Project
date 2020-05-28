import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA_-ZAMxuxq67f6IGpQ28shj5cGgdcrsPY",
    authDomain: "pureartisann.firebaseapp.com",
    databaseURL: "https://pureartisann.firebaseio.com",
    projectId: "pureartisann",
    storageBucket: "pureartisann.appspot.com",
    messagingSenderId: "822904665456",
    appId: "1:822904665456:web:25691873cba1af2e228bb5",
    measurementId: "G-RE6GRCMK0R"
  };
  firebase.initializeApp(firebaseConfig)

  export {
      firebase
  }