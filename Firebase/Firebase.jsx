import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";
import { Database } from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyBvZZf8W7vmmmPaD0q5UbeIrwXv4hPdtm8",
    authDomain: "paper-mad-43651.firebaseapp.com",
    projectId: "paper-mad-43651",
    storageBucket: "paper-mad-43651.appspot.com",
    messagingSenderId: "645856088755",
    appId: "1:645856088755:web:97570570933575f90756c6",
    databaseURL:'https://paper-mad-43651-default-rtdb.asia-southeast1.firebasedatabase.app'
    
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

   export const FirebaseStorage = getStorage();
 export const db = getFirestore(app);