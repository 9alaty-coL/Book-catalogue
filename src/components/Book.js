import classes from './Book.module.scss'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import DeleteModal from './DeleteModal'
import { deleteBook } from '../services/firestore'
import {useMutation} from 'react-query'
import { CircularProgress } from '@mui/material'

const BOOK_URL = 'https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png'

const Book = props => {
    const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const mutation = useMutation(deleteBook)

    useEffect(()=>{
        if (mutation.isSuccess){
            props.refetch()
            handleClose()
        }
    }, [mutation.isSuccess])

    const deleteHandler = (id) => {
        mutation.mutate({bookId: id})
    }

    return <div className={classes.main} title={props.book.name}>
            <img src={BOOK_URL} alt="a book"/>
            <div className={classes.info}>
                <span className={classes.name}>{props.book.name}</span>
                <span className={classes.authors}><b>Author:</b> {props.book.authors.join(', ')}</span>
                <span className={classes.rating}><b>Year:</b> {props.book.year ?? 'undefined'}</span>
                <span className={classes.rating}><b>Rating:</b> {props.book.rating ?? '...'}/10</span>
                <span className={classes.isbn}><b>ISBN:</b> {props.book.isbn}</span>
            </div>
            <div className={classes.btnGroup}>
            <Link to={'edit/' + props.book.id} style={{textDecoration: "none", color:"black"}}>
                <Button style={{marginRight:"5px"}} variant='outlined' color='primary'>Edit</Button>
            </Link>
                <Button variant='outlined' color='error' onClick={()=>setOpen(true)}>Delete</Button>
            </div>
            <DeleteModal open={open} handleClose={handleClose}>
                <h2>Delete this book?</h2>
                <span >You can't undo this action after delete <b>{props.book.name}</b></span>
                <div className={classes.deleteBtnGroup}>
                    <Button disabled={mutation.isLoading} variant='contained' color='error' onClick={deleteHandler.bind(null, props.book.id)}>{mutation.isLoading ? <CircularProgress size="30px"/> :'Delete'}</Button>
                    <Button disabled={mutation.isLoading} variant='contained' style={{backgroundColor:"#777", marginLeft:"5px"}} onClick={()=>setOpen(false)}>Cancel</Button>
                </div>
            </DeleteModal>
        </div>
}

export default Book