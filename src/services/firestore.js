import {collection, getDocs,getDoc, getFirestore, doc, setDoc, deleteDoc} from 'firebase/firestore'
import {initializeApp} from 'firebase/app'
import { async } from '@firebase/util';


// config vars
var firebaseConfig = {
    // apiKey: "AIzaSyA7f4C7_PNupH0uCYfMsYrE6G9Ho49cwzw",
    authDomain: "book-catalogue-d1b90.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    // databaseURL: "https://Books.firebaseio.com",
    projectId: "book-catalogue-d1b90",
    storageBucket: "book-catalogue-d1b90.appspot.com",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const colRef = collection(db, 'Books')

export const getBooks = async () => {
    try {
        const res = await getDocs(colRef)
        // return res.docs
        const books = res.docs.map(doc => {return {id: doc.id, ...doc.data()}})
        return books
    } catch (error) {
        throw(new Error(error.message))
    }
}

export const getBook = async (id) => {
    try {
        const docRef = doc(db, 'Books', id)
        const res = await getDoc(docRef)
        return {id: id,...res.data()}
    } catch (error) {
        throw(new Error(error.message))
    }
}

export const setBook = async(data) => {
    try {
        await setDoc(doc(colRef), data)
    } catch (error) {
        throw (new Error(error.message))
    }
}

export const editBook = async(data) => {
    try{
        await setDoc(doc(colRef, data.bookId), data.data)
    } catch (error) {
        throw (new Error(error.message))
    }
}

export const deleteBook = async(data) => {
    try {
        await deleteDoc(doc(db, 'Books', data.bookId))
    } catch (error) {
        throw (new Error(error.message))
    }
}