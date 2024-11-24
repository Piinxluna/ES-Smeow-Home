// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAGEdWt-jl63U323XFH_lZZTNHiNtEgl-g',
  authDomain: 'embeddedsystem-smeowhome.firebaseapp.com',
  databaseUrl:
    'https://embeddedsystem-smeowhome-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'embeddedsystem-smeowhome',
  storageBucket: 'embeddedsystem-smeowhome.firebasestorage.app',
  messagingSenderId: '919069312251',
  appId: '1:919069312251:web:845aa78bd9522f906fdc5e',
  measurementId: 'G-X4JTM1SW30',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
