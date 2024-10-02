// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs, onSnapshot} from 'firebase/firestore'
// import { snapshot } from 'node:test';
// addDoc for creating a new document to a specific collection
import {addDoc, deleteDoc, doc} from 'firebase/firestore'

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
// getDocs(colRef)
//     .then((snapshot) =>{
//     // console.log(snapshot.docs) // docs represents all fo the data
//     let books = []
//     snapshot.docs.forEach((doc)=>{
//         books.push({...doc.data(), id: doc.id})
//     })
//     console.log(books)
// })
// .catch(err =>{
//     console.log(err.message)
// })

// adding realtime updates
onSnapshot(colRef, (snapshot) =>{
    let books = []
    snapshot.docs.forEach((doc)=>{
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
})

// create Document
const newBookForm = document.querySelector('.add')
newBookForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    addDoc(colRef, {
        title: newBookForm.title.value,
        author: newBookForm.author.value,
    }).then(() => {
        newBookForm.reset() // resets the fields
    })
})

//delete Book
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    // get refrence to the doucments we want to delete
    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef).then(()=>{
        deleteBookForm.reset()
    })
})

// for update, i can refrence a db her and probable change the
// value as a placehold for the database