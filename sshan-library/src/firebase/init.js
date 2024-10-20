// import the functions you need from the SDKs-Software Development Kits you need
import { initializeApp } from "firebase/app"
// TO DO: Add SDKs for firebase products that you want to use 
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBQ2UG_Ep0Vmc9gMXVRutN-oOHYfOFHDjU",
  authDomain: "week7-sijia.firebaseapp.com",
  projectId: "week7-sijia",
  storageBucket: "week7-sijia.appspot.com",
  messagingSenderId: "213586902068",
  appId: "1:213586902068:web:3c1e949b3118f372ad5e61"
}

initializeApp(firebaseConfig)
const db = getFirestore()
export default db