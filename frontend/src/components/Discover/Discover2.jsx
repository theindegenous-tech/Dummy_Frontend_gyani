import React, { useContext, useState, useEffect } from "react";
import Search from "../books_landing/Search";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import LinesEllipsis from "react-lines-ellipsis";
import { UserContext } from "../context/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

function Discover2() {
  let navigate = useNavigate();
  let path = "/dashboard/discoverbook";
  let { user, setReadingbook } = useContext(UserContext);
  const [myLibrary, setmyLibrary] = useState([]);
  const [likedbooks, setlikedbooks] = useState([]);
  const [discovered, setDiscovered] = useState([]);
  const [searchRes, setSearchRes] = useState([]);

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
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  //This function adds new book to likedBooks array if its not there
  const likeClick = async (book, event) => {
    likedbooks.includes(book.id) === false && likedbooks.push(book.id);
    console.log(user.personalisation.id);
    // console.log({...user.personalisation, liked:likedbooks})
    let res = await axios.put(
      `https://api.gyanibooks.com/personalisation/${user.personalisation.id}/`,
      {
        data: { ...user.personalisation, liked: likedbooks },
        withCredentials: true,
      }
    );
    res.status === 200
      ? (event.target.style.color = "red")
      : (event.target.style.color = "white");
  };
  const removeLike = async (book, event) => {
    likedbooks.pop(book.id);
    let res = await axios.put(
      `https://api.gyanibooks.com/personalisation/${user.personalisation.id}/`,
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
      `https://api.gyanibooks.com/personalisation/${user.personalisation.id}/`,
      {
        data: { ...user.personalisation, mylibrary: myLibrary },
        withCredentials: true,
      }
    );
    res.status === 200 && navigate(path);
  };
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

  function Items({ books }) {
    books();
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
      <Carousel responsive={resp} swipeable ssr autoPlaySpeed={2000}>
        {searchRes &&
          searchRes.map((book, i) => {
            return (
              <div
                className="book_out"
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
                  h-[360px] w-[260px] rounded-[8px] border-[#FEFFD] items-center flex flex-col`}
                >
                  <div className="flex justify-start justify-items-start mt-2 ml-2 w-full ">
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
                      items-center font-[700] text-[16px] leading-[19px tracking-[0.04em] text-[#42CBFB] font-normal text-center"
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
  const [count, setCount] = useState(true);
  const [notfound, setNotFound] = useState(false);
  const { t } = useTranslation();
  const getDiscovered = async () => {
    let result = [];
    if (discovered.length > 0 && count) {
      let res = await axios.get(
        "https://api.gyanibooks.com/library/search/?q=" + discovered
      );
      result = await res.data.results;
      setSearchRes(result);
      console.log(result);
      setCount(false);
    }
  };

  return (
    <div className=" w-full flex justify-center lg:justify-center items-center flex-col h-full ">
      <div className="flex flex-col items-center justify-center text-center w-full h-full">
        <h2 className="w-full h-full mt-10 text-center font-[Work Sans] text-[24px] lg:text-[40px] font-[700] leading-[46.92px] tracking-[-2%] text-[#0E0E2C]">
          {t("Find the next adventure to lose yourself in")}
        </h2>
        <h3 className="font-[Work Sans] text-[24px] font-[500] leading-[28px] text-[#0E0E2C] h-full">
          {t("Over 10,000 titles to choose from")}
        </h3>
      </div>
      <div className="flex flex-col lg:mt-[80px] w-full items-center h-full justify-center text-center">
        <Search
          showButton={true}
          setDiscovered={setDiscovered}
          setCount={setCount}
        />
      </div>
      {discovered.length > 0 && (
        <div className="w-full lg:mx-10 overflow-x-scroll lg:px-10 ">
          <h3
            style={{ fontFamily: "Work Sans" }}
            className="text-black text-[24px] leading-[28px] tracking-[-2%] flex text-center items-center my-10 "
          >
            Search Results
          </h3>
          <Items books={getDiscovered} />
        </div>
      )}
    </div>
  );
}

export default Discover2;
