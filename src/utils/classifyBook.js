export const classifyBook = (books) => {
    const store = {}
    books.forEach(v => {
        if (store[v.year]){
            store[v.year].push(v)
        }
        else{
            store[v.year] = []
            store[v.year].push(v)
        }
    })
    return store
}