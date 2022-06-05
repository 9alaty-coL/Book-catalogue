import classes from './Detail.module.scss'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getBook } from '../services/firestore'
import { CircularProgress } from '@mui/material'

const Detail = () => {
    const params = useParams()
    const bookId = params.bookId
    const book = useQuery('getBook', getBook.bind(null, bookId))
    let detail
    if (book.isLoading){
        detail = <CircularProgress />
    }
    else if (book.isError){
        detail = <span style={{color: "red"}}>{book.error}</span>
    }
    else if (book.isSuccess){
        detail = <h1>{JSON.stringify(book.data)}</h1>
    }

    return <>
        {detail}
    </>
}

export default Detail