// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs} from 'firebase/firestore'
// import { snapshot } from 'node:test';

const firebaseConfig = {
    apiKey: "AIzaSyATllaV9CO9I957w87Hz973CzhYoOhI9RE",
    authDomain: "something-b7d75.firebaseapp.com",
    projectId: "something-b7d75",
    storageBucket: "something-b7d75.appspot.com",
    messagingSenderId: "402872850268",
    appId: "1:402872850268:web:ebb11e6f4c008a23b41399",
    measurementId: "G-PYCJ0F3385"
  };
// initiilize the app
initializeApp(firebaseConfig);

// initilize firesotre db
const db = getFirestore()

//collection refrence
const colRef = collection(db, 'books')

// basically loads the collexction and returns a promise
getDocs(colRef)
    .then((snapshot) =>{
    // console.log(snapshot.docs) // docs represents all fo the data
    let books = []
    snapshot.docs.forEach((doc)=>{
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
})
.catch(err =>{
    console.log(err.message)
})
  