import classes from './Book.module.scss'

const BOOK_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Book.svg/1751px-Book.svg.png'

const Book = props => {
    return <div className={classes.main} title={props.name}>
        <img src={BOOK_URL} alt="a book"/>
        <div className={classes.info}>
            <span className={classes.name}>{props.name}</span>
        </div>
    </div>
}

export default Book