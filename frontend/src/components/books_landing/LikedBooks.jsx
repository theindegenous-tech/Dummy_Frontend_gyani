import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./style.scss";
import "./Hover.css";
import { UserContext } from "../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import Carousel from "react-multi-carousel";
import LinesEllipsis from "react-lines-ellipsis";
import "react-multi-carousel/lib/styles.css";

function LikedBooks() {
  const [likedbooks, setLikedBooks] = useState([]);
  let { setReadingbook } = useContext(UserContext);
  const [temp,settemp] = useState([]);
  const [count, setCount] = useState(true);
  let user = JSON.parse(localStorage.getItem("user"));


  const getBooks = async () => {
    if(count){
      await axios.get(
        `http://api.gyanibooks.com/personalisation/${user.personalisation.id}/`
      ).then(res=>{
        settemp(res.data.liked);
        console.log(temp)
      })
      // let allBooks = await axios.get(`https://api.gyanibooks.com/library/BookList/`);
      let allBooks = await axios.get(`http://api.gyanibooks.com/library/BookList/`);
      let books = allBooks.data.filter((book) => {
        return temp.includes(book.id);
      });
      setLikedBooks(books);
      setCount(false);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

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

  //This function removes book from likedbooks

  const disLike = async (id, event) => {
    temp.splice(temp.indexOf(id), 1);
    settemp(temp);
    let res = await axios.put(
      `http://api.gyanibooks.com/personalisation/${user.personalisation.id}/`,
      {
        data: { ...user.personalisation, liked: temp },
      }
    );
    if (res.status === 200) {
      event.target.style.color = "white";
    }
  }
  const resp = {
    desktop: {
      breakpoint: { max: 3000, min: 450 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 350, min: 2 },
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
      <Carousel responsive={resp} swipeable infinite ssr autoPlaySpeed={2000}>
        {currentItems &&
          currentItems.map((book, i) => {
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
                  style={{backgroundColor:colorArray[Math.floor(Math.random() * colorArray.length)]}}
                  className={`
                  h-[360px] w-[260px] rounded-[8px] border-[#FEFFD] items-center flex flex-col`}
                >
                   <div className="flex justify-start justify-items-start mt-2 ml-2 w-full ">
                  {
                    <DeleteIcon
                      style={{ color: "white" }}
                      onClick={(event) => {
                        disLike(book.id, event);
                      }}
                    />
                  }
                </div>
                  <div
                    style={{
                      fontFamily:
                        fontArray[Math.floor(Math.random() * fontArray.length)],
                    }}
                    className="book_description
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
                      className="h-[48px] w-[94px] rounded-[8px] py-[12px] px-[24px] gap-[8px] bg-white flex flex-col
                      items-center font-[700] text-[16px] leading-[19px tracking-[0.04em] text-[#42CBFB] font-normal text-center cursor-none"
                      style={{fontFamily:'Work Sans'}}
                      onClick={() => {
                        setReadingbook(book);
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
    <div className="bg-white w-[99%] flex flex-col justify-center mt-10">
      <div
        style={{
          height: "auto",
          background: "#FFFFFF",
          backgroundColor: "#FFFFFF",
        }}
      >
        {getBooks() && likedbooks.length > 0 ? (
          <div className="w-[80%] mx-auto overflow-x-scroll ">
            <Items currentItems={likedbooks} />
          </div>
        ):
        <p className="text-center">No Liked Books found </p>}
      </div>
    </div>
  );
}

export { LikedBooks };
