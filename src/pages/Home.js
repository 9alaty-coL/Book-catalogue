import classes from "./Home.module.scss";
import { useQuery } from "react-query";
import BookSection from "../components/BookSection";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getBooks } from "../services/firestore";
import {
  classifyBookByYear,
  classifyBookByRating,
  classifyBookByAuthor,
} from "../utils/classifyBook";
import {
  CircularProgress,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Home = () => {
  const [fetch, setFetch] = useState(false)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [groupOption, setGroupOption] = useState("year"); // state for group by

  // handle change for select option group by
  const handleChange = (e) => {
    setGroupOption(e.target.value);
    navigate("/?group=" + e.target.value);
  };

  // function fetch books for react-query
  const fetchBooks = async () => {
    try {
      const docs = await getBooks();
      return docs;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Call react-query
  const books = useQuery(["getBooks", fetch], fetchBooks);

  // Handle option group by
  useEffect(() => {
    if (searchParams.get("group")) {
      if (
        searchParams.get("group") !== "year" &&
        searchParams.get("group") !== "rating" &&
        searchParams.get("group") !== "author"
      ) {
        setGroupOption("year");
      } else {
        setGroupOption(searchParams.get("group"));
      }
    }
  }, [searchParams.get("group")]);

  //Handle data from react query
  let content;
  if (books.isLoading) {
    content = <CircularProgress  size="80px" style={{margin:"100px"}}/>;
  } else if (books.isError) {
    content = <span style={{ color: "red" }}>{books.error}</span>;
  } else if (books.isSuccess) {
    let bookSections = [];
    let booksData;
    if (groupOption === "rating") {
      booksData = classifyBookByRating(books.data);
    } else if (groupOption === "author") {
      booksData = classifyBookByAuthor(books.data);
    } else {
      booksData = classifyBookByYear(books.data);
    }
    for (let k of Object.keys(booksData)) {
      if (k === "undefined") {
        bookSections.unshift(
          <BookSection key={k} year={k} books={booksData[k]} />
        );
        continue;
      }
      bookSections.push(<BookSection key={k} year={k} books={booksData[k]} refetch={()=>setFetch(prev=>!prev)} />);
    }
    bookSections = bookSections.reverse();
    content = bookSections;
  }

  return (
    <div className={classes.main}>
      <div className={classes.title}>Welcome to book catalogue!!</div>
      <div className={classes.btn}>
        <Button
          variant="contained"
          color="success"
          style={{ padding: "10px 20px 10px 20px" }}
          onClick={()=>navigate('/add')}
        >
          <FontAwesomeIcon
            icon={faPlusCircle}
            style={{ fontSize: "1.3rem", marginRight: "0.5rem" }}
          />{" "}
          Add a book
        </Button>
      </div>
      <div className={classes.option}>
        <span>Group by: </span>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              style={{ width: "200px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={groupOption}
              onChange={handleChange}
            >
              <MenuItem value={"year"}>Year</MenuItem>
              <MenuItem value={"rating"}>Rating</MenuItem>
              <MenuItem value={"author"}>Author</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      {content}
    </div>
  );
};

export default Home;
