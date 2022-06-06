import classes from './Edit.module.scss'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getBook } from '../services/firestore'
import { CircularProgress, TextField, Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { editBook } from '../services/firestore'


const Detail = () => {
    const params = useParams()
    const bookId = params.bookId // book Id from params
    const mutation = useMutation(editBook)
    const book = useQuery(['getBook', bookId], getBook.bind(null, bookId), {cacheTime: 0})

    const [authorsArray, setAuthorsArray] = useState([]) // control array of uthor

    // input Ref
    const nameRef = useRef()
    const ratingRef = useRef()
    const yearRef = useRef()
    const isbnRef = useRef()
    const navigate = useNavigate()

    // if data edited than redirect to home
    useEffect(() => {
        if (mutation.isSuccess){
            navigate('/')
        }
    }, [mutation.isSuccess]);

    // if book detail loaded than set default value for authors
    useEffect(() => {
        if (book.data?.authors){
            setAuthorsArray(book.data.authors)
        }
    }, [book.isSuccess])


    // handle submit
    const submitHandler = e => {
        e.preventDefault()
        mutation.mutate({
            bookId: bookId,
            data: {
                name: nameRef.current.value,
                authors: authorsArray,
                year: +yearRef.current.value ?? null,
                rating: +ratingRef.current.value ?? null,
                isbn: isbnRef.current.value ?? null,
            }
        })
    }


    // add new author 's name to array
    const onChangeAuthorName = (index, e) => {
        let newAuthorArray = [...authorsArray]
        newAuthorArray[index] = e.target.value
        setAuthorsArray(newAuthorArray)
    }


    // variable to render
    let detail
    if (book.isLoading){
        detail = <CircularProgress />
    }
    else if (book.isError){
        detail = <span style={{color: "red"}}>{book.error}</span>
    }
    else if (book.isSuccess){
        detail = <div className={classes.inputGroup}>
        <span>Edit book information</span>

        <form className={classes.form} onSubmit={submitHandler}>
            <TextField inputRef={nameRef} label="Name" variant="outlined" defaultValue={book.data.name} required/>
            {/* <TextField label="Number of authors" variant="outlined" type="number" required InputProps={{inputProps: { max: 10, min: 1}}} defaultValue="1" onChange={onchangeHandler}/> */}
            <div className={classes.authorList}>
            {book.data.authors.map((author, index) => <TextField key={author} label={'Author ' + (index+1) + ':'} defaultValue={author} onChange={onChangeAuthorName.bind(null, index)}/>)}
            </div>
            <TextField defaultValue={book.data.year} inputRef={yearRef} label="Publication year (optional)" type="number" InputProps={{inputProps: { max: (new Date()).getFullYear(), min: 1800}}} variant="outlined" />
            <TextField defaultValue={book.data.rating} inputRef={ratingRef} label="Rating (optional)" type="number" InputProps={{inputProps: { max: 10, min: 0}}} variant="outlined" />
            <TextField defaultValue={book.data.isbn} inputRef={isbnRef} label="ISBN (optional)" variant="outlined" />
            <div className={classes.btnGroup}>
                <Button style={{margin: "5px", padding: "10px", width: "100px"}}  type='submit' color='success' variant='contained' disabled={mutation.isLoading} >{mutation.isLoading ? <CircularProgress size="30px"/> : 'Save'}</Button>
                <Button style={{margin: "5px", padding: "10px", width: "100px"}}  color='error' variant='contained' disabled={mutation.isLoading} onClick={()=>navigate(-1)}>Back</Button>
            </div>
        </form>
        </div>
    }

    return <div className={classes.main}>
        <div className={classes.back}>
            <FontAwesomeIcon icon={faArrowLeft} onClick={()=>navigate(-1)}/>
        </div>
        <div className={classes.title}>
            Edit book
        </div>
        {detail}
    </div>
}

export default Detail