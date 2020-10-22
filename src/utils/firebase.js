import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCXnpHlAd70b3oWhtSz51nj3l_jFvQ5ejg",
    authDomain: "inventory-management-sys-c24d8.firebaseapp.com",
    databaseURL: "https://inventory-management-sys-c24d8.firebaseio.com",
    projectId: "inventory-management-sys-c24d8",
    storageBucket: "inventory-management-sys-c24d8.appspot.com",
    messagingSenderId: "654517379804",
    appId: "1:654517379804:web:06c7c571a8fbc61a640a19",
    measurementId: "G-DRE622W2CJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase