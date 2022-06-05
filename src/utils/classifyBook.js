const addRecommended = (store, books) => {
    // add recommended book to store
    const goodBook = books.filter(v => {
        return v.year >= (new Date()).getFullYear() - 3 // pick books published at least 3 years
    })
    goodBook.sort((a, b) => - a.rating + b.rating) // sort books by rating

    if (goodBook.length > 0){
        store.Recommended = [goodBook[0]]
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

    return store
}