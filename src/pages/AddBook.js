import classes from './AddBook.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from 'react-router-dom'
import {TextField, Button, CircularProgress} from '@mui/material'
import { useState, useRef , useEffect} from 'react';
import {useMutation } from 'react-query'
import { setBook } from '../services/firestore';

const AddBook = () => {
    const mutation = useMutation(setBook)
    const [numberOfAuthors, setNumberOfAuthors] = useState(1)
    const [authorsArray, setAuthorsArray] = useState([])
    const nameRef = useRef()
    const ratingRef = useRef()
    const yearRef = useRef()
    const isbnRef = useRef()
    const navigate = useNavigate()
    useEffect(() => {
        if (mutation.isSuccess){
            navigate('/')
        }
    }, [mutation.isSuccess]);
    const onChangeAuthorHandler = (i, e) => {
        let prev = [...authorsArray]
        prev[i] = e.target.value
        setAuthorsArray(prev)
    }
    const getAuthorInput = nums => {
        const res = []
        if (nums > 0 && nums < 11){
            for (let i = 0; i < nums; i++){
                res.push(<TextField key={i} variant='outlined' label={'Author ' + (i + 1)} onChange={onChangeAuthorHandler.bind(null, i)} required/>)
            }
        }
        return res
    }
    const onchangeHandler = e => {
        setNumberOfAuthors(e.target.value)
    }
    const submitHandler = e => {
        e.preventDefault()
        mutation.mutate({
            name: nameRef.current.value,
            authors: authorsArray.length > 0 ? authorsArray : null,
            year: +yearRef.current.value ?? null,
            rating: +ratingRef.current.value ?? null,
            isbn: isbnRef.current.value ?? null,
        })
    }
    return <div className={classes.main}>
        <div className={classes.back}>
            <FontAwesomeIcon icon={faArrowLeft} onClick={()=>navigate(-1)}/>
        </div>
        <div className={classes.title}>
            Add a book
        </div>
        <div className={classes.inputGroup}>
        <span>Enter book information</span>

        <form className={classes.form} onSubmit={submitHandler}>
            <TextField inputRef={nameRef} label="Name" variant="outlined" required/>
            <TextField label="Number of authors" variant="outlined" type="number" required InputProps={{inputProps: { max: 10, min: 1}}} defaultValue="1" onChange={onchangeHandler}/>
            <div className={classes.authorList}>
            {getAuthorInput(numberOfAuthors)}
            </div>
            <TextField inputRef={yearRef} label="Publication year (optional)" type="number" InputProps={{inputProps: { max: (new Date()).getFullYear(), min: 1800}}} variant="outlined" />
            <TextField inputRef={ratingRef} label="Rating (optional)" type="number" InputProps={{inputProps: { max: 10, min: 0}}} variant="outlined" />
            <TextField inputRef={isbnRef} label="ISBN (optional)" variant="outlined" />
            <div className={classes.btnGroup}>
                <Button style={{margin: "5px", padding: "10px", width: "100px"}}  type='submit' color='success' variant='contained' disabled={mutation.isLoading} >{mutation.isLoading ? <CircularProgress size="30px"/> : 'Add'}</Button>
                <Button style={{margin: "5px", padding: "10px", width: "100px"}}  color='error' variant='contained' disabled={mutation.isLoading} onClick={()=>navigate(-1)}>Back</Button>
            </div>
        </form>
        </div>
    </div>
}

export default AddBook