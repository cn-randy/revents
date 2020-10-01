import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig =  {
    apiKey: "AIzaSyC2JJQIN-jeVowqimgU_0SIU2yeK-3wUoc",
    authDomain: "revents-course-31e54.firebaseapp.com",
    databaseURL: "https://revents-course-31e54.firebaseio.com",
    projectId: "revents-course-31e54",
    storageBucket: "revents-course-31e54.appspot.com",
    messagingSenderId: "886029620315",
    appId: "1:886029620315:web:de57fde873de839c99db7e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()

export default firebase
