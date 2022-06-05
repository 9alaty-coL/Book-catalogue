import classes from './BookSection.module.scss'
import Book from './Book'

const BookSection = props => {
    const books = props.books.map(v => {
        return <Book key={v.id} book={v}/>
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