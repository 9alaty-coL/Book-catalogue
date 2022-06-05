import classes from './Home.module.scss'
import { useQuery } from 'react-query'
import BookSection from '../components/BookSection'
import Button from '@mui/material/Button'
import { faPlusCircle} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getBooks, getBook } from '../services/firestore'
import { classifyBook } from '../utils/classifyBook'
import { CircularProgress } from '@mui/material'

const Home = () => {
    const fetchBooks = async () => {
        try {
            const docs = await getBooks()
            const books = classifyBook(docs)
            return books
        } catch (error) {
            throw(new Error(error.message))
        }
    }

    const books = useQuery('getBooks', fetchBooks)

    let content
    if (books.isLoading){
        content = <CircularProgress />
    }
    else if (books.isError){
        content = <span style={{color: "red"}}>{books.error}</span>
    }
    else if (books.isSuccess){
        const bookSections = []
        for (let k of Object.keys(books.data)){
            bookSections.push(<BookSection key={k} year={k} books={books.data[k]} />)
        }
        content = bookSections
    }

    return <div className={classes.main}>
    <div className={classes.title}>
        Welcome to book catalogue!!
    </div>
    <div className={classes.btn}>
        <Button variant='contained' color="success" style={{padding:"10px 20px 10px 20px"}}><FontAwesomeIcon icon={faPlusCircle}  style={{fontSize:"1.3rem", marginRight:"0.5rem"}}/>  Add a book</Button>
    </div>
        {content}
    </div>
}

export default Home