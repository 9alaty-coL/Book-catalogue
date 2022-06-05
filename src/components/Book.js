import classes from './Book.module.scss'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

const BOOK_URL = 'https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png'

const Book = props => {
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
                <Button variant='outlined' color='error'>Delete</Button>
            </div>
        </div>
}

export default Book