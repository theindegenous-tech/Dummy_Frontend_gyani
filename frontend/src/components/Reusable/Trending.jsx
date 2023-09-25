// import { useState, useEffect, useMemo, useContext } from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../books_landing/style.scss";
import "../books_landing/Hover.css";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import SortByLanguage from "../sort/SortByLanguage";
import SortByTitle from "../sort/SortByTitle";
import { SortByAuthor } from "../sort/SortByAuthor";
import LinesEllipsis from "react-lines-ellipsis";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";

//This All_books function requests for All the book data and stores it in array named books
export default function Trending({ books_props }) {
  //states to set book cover page as icons
  let { user, setReadingbook } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  let navigate = useNavigate();
  let path = "/dashboard/reading1";
  const [myLibrary, setmyLibrary] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const setAllBooks = async () => {
      await new Promise((r) => setTimeout(r, 3000));
      if (books_props) {
        new Promise((r) => setTimeout(r, 2000));
        setBooks(books_props);
      }
    };
    setAllBooks();
  }, [books_props]);

  const HandleAuthors = ({ authors }) => {
    const [authorString, setAuthorString] = useState("");
    useEffect(() => {
      if (authors) {
        let str = "";
        authors.forEach((author) => {
          str += author.first_name + " " + author.last_name + ", ";
        });
        str = str.substring(0, str.length - 2);
        setAuthorString(str);
      }
    }, [authors]);
    return <div>{authorString}</div>;
  };

  const [likedbooks, setlikedbooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(
        `http://api.gyanibooks.com/personalisation/${user.personalisation.id}/`,
        { withCredentials: true }
      );
      setlikedbooks(res.data.liked);
      setmyLibrary(res.data.mylibrary);
    }
    fetchData();
  }, []);

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
    setsortDrawerTab(2);
    return tabArray[currentsortDrawerTab];
  }

  //This function adds new book to likedBooks array if its not there
  const likeClick = async (book, event) => {
    likedbooks.includes(book.id) === false && likedbooks.push(book.id);
    user.personalisation.liked = likedbooks;
    let res = await axios.put(
      `http://api.gyanibooks.com/personalisation/${user.personalisation.id}/`,
      {
        data: { ...user.personalisation, liked: likedbooks },
      }
    );
    res.status === 200
      ? (event.target.style.color = "red")
      : (event.target.style.color = "white");
  };
  const removeLike = async (book, event) => {
    likedbooks.pop(book.id);
    let res = await axios.put(
      `http://api.gyanibooks.com/personalisation/${user.personalisation.id}/`,
      {
        data: { ...user.personalisation, liked: likedbooks },
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      event.target.style.color = "white";
    }
  };

  //This function adds new book to mylibraryBooks array if its not there
  const mylibraryClick = async (book) => {
    myLibrary.includes(book.id) === false && likedbooks.push(book.id);
    let res = await axios.put(
      `http://api.gyanibooks.com/personalisation/${user.personalisation.id}/`,
      {
        data: { ...user.personalisation, mylibrary: myLibrary },
        withCredentials: true,
      }
    );
    res.status === 200 && navigate(path);
  };

  const resp = {
    desktop: {
      breakpoint: { max: 3000, min: 350 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 100 },
      items: 1,
    },
  };

  //This function renders all books

  function Items({ currentItems }) {
    const fontArray = [
      "Work Sans",
      "Cursive",
      "Monospace",
      "Sans-serif",
      "Segoe UI",
    ];
    const colorArray = [
      "#E52165",
      "#0D1137",
      "#077B8A",
      "#D9138A",
      "#12A4D9",
      "#322E2F",
      "#6b7b8c",
      "#1E3D59",
      "#1868AE",
      "#7A2048",
      "#FF9a8D",
      "#7fe7dc",
    ];
    const boldArray = [
      "thin",
      "extrathin",
      "normal",
      "bold",
      "medium",
      "semibold",
    ];
    return (
      <Carousel
        responsive={resp}
        swipeable
        infinite
        ssr
        autoPlaySpeed={2000}
      >
        {currentItems &&
          currentItems.map((book, i) => {
            return (
              <div
                className="book_out "
                style={{
                  height: "504px",
                  width: "280px",
                  borderRadius: "8px",
                  gap: "24px",
                  border: "1px solid #EFEFFD",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: "1 1 139px",
                  order: "0",
                  flexGrow: "0",
                  boxSizing: "border-box",
                }}
                key={i}
              >
                <div
                  style={{
                    backgroundColor:
                      colorArray[Math.floor(Math.random() * colorArray.length)],
                  }}
                  className={`
                  h-[360px] w-[260px] rounded-[8px] border-[#FEFFD] items-center flex flex-col `}
                >
                  <div className="flex justify-start justify-items-start mt-2 ml-2 w-full  ">
                    {
                      <IconButton
                        onClick={(event) => {
                          likedbooks.includes(book.id)
                            ? removeLike(book, event)
                            : likeClick(book, event);
                        }}
                      >
                        <FavoriteIcon
                          style={{
                            color: likedbooks.includes(book.id)
                              ? "gray"
                              : "white",
                            cursor: "none",
                          }}
                        />
                      </IconButton>
                    }
                  </div>
                  <div
                    style={{
                      fontFamily:
                        fontArray[Math.floor(Math.random() * fontArray.length)],
                    }}
                    className="
                    flex flex-col items-center w-[250px]  mt-[20px]
                    leading-[28px] tracking-[-0.2] text-white"
                  >
                    <div
                      className={`text-[20px] text-center h-[200px] mx-2 font-${
                        boldArray[Math.floor(Math.random() * boldArray.length)]
                      } `}
                    >
                      {book.title}
                    </div>
                    <button
                      className="book_description h-[48px] w-[94px] rounded-[8px] py-[12px] px-[24px] gap-[8px] bg-white flex flex-col
                      items-center font-[700] text-[16px] leading-[19px tracking-[0.04em] text-[#42CBFB] font-normal text-center  shadow-xl"
                      style={{ fontFamily: "Work Sans" }}
                      onClick={() => {
                        setReadingbook(book);
                        {
                          mylibraryClick(book);
                        }
                      }}
                    >
                      READ
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    height: "88px",
                    width: "246px",
                    marginTop: "0px",
                    marginLeft: "16px",
                    gap: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    flex: "none",
                    order: "1",
                    alignSelf: "stretch",
                    flexGrow: "0",
                  }}
                >
                  <LinesEllipsis
                    text={book.title}
                    maxLine="2"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />

                  <div
                    style={{
                      width: "246px",
                      height: "44px",
                      textAlign: "left",
                      color: "#4A4A68",
                      fontFamily: "Work Sans",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "16px",
                      lineHeight: "22px",
                      flex: "none",
                      order: "1",
                      alignSelf: "stretch",
                      flexGrow: "0",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "left",
                        color: "#4A4A68",
                        fontFamily: "Work Sans",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "22px",
                        flex: "none",
                        order: "1",
                        alignSelf: "stretch",
                        flexGrow: "0",
                      }}
                    >
                      <HandleAuthors authors={book.author} />
                    </div>
                    <div
                      style={{
                        textAlign: "left",
                        color: "#4A4A68",
                        fontFamily: "Work Sans",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "22px",
                        letterSpacing: "-0.02em",
                        flex: "none",
                        order: "1",
                        alignSelf: "stretch",
                        flexGrow: "0",
                      }}
                    >
                      {book.year}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Carousel>
    );
  }

  return (
    <div className="!h-[100%] w-full  flex flex-col gap-[48px]  my-5 lg:pb-20 ">
      <h3
        style={{ fontFamily: "Work Sans" }}
        className="text-black text-[24px] leading-[28px] text-left m-[8px] font-bold"
      >
        {t("Currently Trending")}
      </h3>
      <div className="!w-full overflow-x-scroll scrollbar-hide px-10 lg:px-5">
        {books.length <= 0 ? (
          <div className="flex flex-row justify-between items-center flex-wrap gap-2 !w-full">
            <div className="flex flex-col justify-center items-center -gap-2">
              <Skeleton height={400} width={250} />
              <Skeleton height={50} width={150} />
              <Skeleton height={50} width={100} />
            </div>
            <div className="flex flex-col justify-start items-start -gap-2">
              <Skeleton height={400} width={250} />
              <Skeleton height={50} width={150} />
              <Skeleton height={50} width={100} />
            </div>
            <div className="flex flex-col justify-start items-start -gap-2">
              <Skeleton height={400} width={250} />
              <Skeleton height={50} width={150} />
              <Skeleton height={50} width={100} />
            </div>
          </div>
        ) : (
          <Items currentItems={books} />
        )}
      </div>
    </div>
  );
}

export { Trending };
