import {collection, getDocs,getDoc, getFirestore, doc} from 'firebase/firestore'
import {initializeApp} from 'firebase/app'
import { async } from '@firebase/util';

var firebaseConfig = {
    // apiKey: "AIzaSyA7f4C7_PNupH0uCYfMsYrE6G9Ho49cwzw",
    authDomain: "book-catalogue-d1b90.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    // databaseURL: "https://Books.firebaseio.com",
    projectId: "book-catalogue-d1b90",
    storageBucket: "book-catalogue-d1b90.appspot.com",
    // messagingSenderId: "SENDER_ID",
    // appId: "APP_ID",
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    // measurementId: "G-MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const colRef = collection(db, 'Books')

export const getBooks = async () => {
    const res = await getDocs(colRef)
    // return res.docs
    const books = res.docs.map(doc => {return {id: doc.id, ...doc.data()}})
    return books
}


export const getBook = async (id) => {
    const docRef = doc(db, 'Books', id)
    const res = await getDoc(docRef)
    return {id: id,...res.data()}
}