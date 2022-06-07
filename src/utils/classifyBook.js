// ramdom a number between min and max
const getRamdom = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min
}

const addRecommended = (store, books) => {
    // add recommended book to store
    let goodBook = books.filter(v => {
        return v.year >= (new Date()).getFullYear() - 3 // pick books published at least 3 years
    })
    goodBook.sort((a, b) => - a.rating + b.rating) // sort books by rating

    if (goodBook.length > 0){
        goodBook = goodBook.filter(b => goodBook[0].rating === b.rating)
        store.Recommended = [goodBook[getRamdom(0, goodBook.length)]]
    }
}

const sortBookByAlphabet = (store) => {
    for (let k of Object.keys(store)){
        store[k].sort((a, b) => a.name > b.name ? 1 : -1)
    }
}

export const classifyBookByYear = (books) => {
    const store = {} 
    // store like a map with key is published year
    // data is an array of valid book

    books.forEach(v => {
        if (store[v.year]){
            store[v.year].push(v)
        }
        else{
            store[v.year] = []
            store[v.year].push(v)
        }
    })

    addRecommended(store, books)
    sortBookByAlphabet(store)

    return store
}

export const classifyBookByRating = (books) => {
    const store = {} 
    // store like a map with key is rating point
    // data is an array of valid book

    books.forEach(v => {
        if (store[v.rating]){
            store[v.rating].push(v)
        }
        else{
            store[v.rating] = []
            store[v.rating].push(v)
        }
    })

    addRecommended(store, books)
    sortBookByAlphabet(store)

    return store
}

export const classifyBookByAuthor = (books) => {
    const store = {} 
    // store like a map with key is author name
    // data is an array of valid book

    books.forEach(v => {
        for (let a of v.authors){
            if (store[a]){
                store[a].push(v)
            }
            else{
                store[a] = []
                store[a].push(v)
            }
        }
    })

    addRecommended(store, books)
    sortBookByAlphabet(store)

    return store
}