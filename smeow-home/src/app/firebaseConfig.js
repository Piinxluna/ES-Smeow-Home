// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: 'embeddedsystem-smeowhome.firebaseapp.com',
  databaseURL:
    'https://embeddedsystem-smeowhome-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'embeddedsystem-smeowhome',
  storageBucket: 'embeddedsystem-smeowhome.firebasestorage.app',
  messagingSenderId: process.env.FB_MESS_SENDER_ID,
  appId: process.env.FB_API_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export { database }
