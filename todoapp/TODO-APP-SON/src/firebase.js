import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyCVMCEMsT2gO7Vb2eRj_gRvq3ehSy7QDRM",
    authDomain: "authdeneme-319b2.firebaseapp.com",
    projectId: "authdeneme-319b2",
    storageBucket: "authdeneme-319b2.appspot.com",
    messagingSenderId: "901697971913",
    appId: "1:901697971913:web:a6dfce3a3bb8d6b1a18f18"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db }