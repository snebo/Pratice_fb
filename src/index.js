// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs, onSnapshot, query} from 'firebase/firestore'
// import { snapshot } from 'node:test';
// addDoc for creating a new document to a specific collection
// query and wbere for queryign
import {addDoc, deleteDoc, doc,  where} from 'firebase/firestore'
// for ordering collection entries
import { orderBy, serverTimestamp } from 'firebase/firestore';
import { getDoc, updateDoc } from 'firebase/firestore';

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

// queries
// const q  = query(colRef, where("author", "==", "very poor man"), orderBy('createdAt'))
const q = query(colRef, where("author", "==", "very poor man"))

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
onSnapshot(q, (snapshot) =>{
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
        createdAt: serverTimestamp(),
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

// getting a single book
const docRef = doc(db, 'books', '1QYf3paOXyUc4RGAuVUT')
getDoc(docRef).then((doc) =>{
    console.log(doc.data(), doc.id)
})
onSnapshot(docRef, (doc)=>{
    console.log(doc.data(), doc.id)
})

// updating a book
const updateBook = document.querySelector('.update')
updateBook.addEventListener('submit', (e) =>{
    e.preventDefault()
    const docRef = doc(db, 'books', updateForm.id.value)

    updateDoc(docRef, {
        title: 'updated'

    }).then(()=>{
        updateForm.reset()
    })
})