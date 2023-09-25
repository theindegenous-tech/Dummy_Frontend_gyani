import { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import "./Hover.css";
import { SortByAuthor } from "../sort/SortByAuthor";
import SortByLanguage from "../sort/SortByLanguage";
import SortByTitle from "../sort/SortByTitle";
import BookDescription from "../Reusable/BookDescription";
import { Trending } from "../Reusable/Trending";
import ePub from "epubjs";
import Discover2 from "../Discover/Discover2";

//This All_books function requests for All the book data and stores it in array named books
function Books(props) {
  const [books, setBooks] = useState([]);
  const [booksupdated, setBooksUpdated] = useState(false);
  // This hook fetches all books
  useEffect(() => {
    async function getAllBooks() {
      try {
        const Books = await axios.get("https://api.gyanibooks.com/library/BookList/", {
          withCredentials: false,
        });
        setBooks(Books.data);
        setBooksUpdated(true);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBooks();
  }, []);
  //This hook maps the book array and adds one more property to array of object namely imgurl which is used to display as icon of book
  const [imgval, setimgval] = useState(0);

  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    const updatedBooks = () => {
      var count = 0;
      let newbooks = books.map((item) => {
        if (item.url) {
          var desc = ePub(item.url);
          desc.coverUrl().then((data) => {
            item.imageurl = data;
            count = count + 1;
            setimgval(count);
          });
        }
        return item;
      });
      setBooks(newbooks);
    };
    if (booksupdated) {
      updatedBooks();
      setBooksUpdated(false);
    }
  }, [booksupdated]);

  //Render either sorted or home tab
  function RenderSelectedSortTab({
    currentsortDrawerTab,
    books,
    setsortDrawerTab,
  }) {
    var tabArray = [
      <SortByTitle books={books} setsortDrawerTab={setsortDrawerTab} />,
      <SortByAuthor books={books} setsortDrawerTab={setsortDrawerTab} />,
      <SortByLanguage books={books} setsortDrawerTab={setsortDrawerTab} />,
    ];
    setsortDrawerTab(currentsortDrawerTab);
    return tabArray[currentsortDrawerTab];
  }

  return (
    <>
      <div className=" flex flex-col justify-center items-center overflow-x-scroll w-[90%] !h-[100%] lg:px-10 ">
        <Discover2/>
        <Trending books_props={books} setDrawerTab={props.setDrawerTab} currentDrawerTab={props.currentDrawerTab}/>
        <BookDescription/>
        <BookDescription/>
      </div>
    </>
  );
}

export { Books };
