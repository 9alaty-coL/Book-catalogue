import classes from './BookSection.module.scss'
import Book from './Book'

const BookSection = props => {
    // get all books from one section
    const books = props.books.map(v => {
        return <Book key={v.id} book={v} refetch={props.refetch}/>
    })
    
    return <div className={classes.main}>
    <div className={classes.year}>
        <span>{props.year}</span>
    </div>
        <div className={classes.books}>
            {books}
        </div>
    </div>
}

export default BookSection