import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBSy9mHdF6XVcsSAqky0_OO82PGBFpuifo",
    authDomain: "gotittest-354b5.firebaseapp.com",
    databaseURL: "https://gotittest-354b5.firebaseio.com",
    projectId: "gotittest-354b5",
    storageBucket: "gotittest-354b5.appspot.com",
    messagingSenderId: "429020013061"
    // apiKey: "AIzaSyBWOoFp6MBky95HaC-WvsxSMyc0m8a1f6k",
    // authDomain: "arsenic-374f3.firebaseapp.com",
    // databaseURL: "https://arsenic-374f3.firebaseio.com",
    // projectId: "arsenic-374f3",
    // storageBucket: "arsenic-374f3.appspot.com",
    // messagingSenderId: "1019223436905"
  };
firebase.initializeApp(config);

export default firebase;