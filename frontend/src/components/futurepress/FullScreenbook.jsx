import axios from "axios";
import { React, useEffect, useState, useContext } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { SpeakerNotesOff } from "@mui/icons-material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import _ from "lodash";
import "./index.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import NotesMaker from "../SummaryGenerator/NotesMaker";
import { Fab } from "@mui/material";

function FullScreenbook() {
  const [book, setBook] = useState(null);
  const [notes, setnotes] = useState(false);
  const [show, setShow] = useState(true);
  const [page, setPage] = useState(1);
  const [pageLocation, setpageLocation] = useState(null);
  const [pos, setPos] = useState("left");
  let { user, setUser } = useContext(UserContext);
  let readingbook = JSON.parse(
    localStorage.getItem("READING_BOOK_LOCALSTORAGE")
  );
  let navigate = useNavigate();
  let path = "/login";
  let browseclick = 0;
  const [nav, setnav] = useState(0);
  let path2 = "/dashboard/reading1";
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    if (nav !== 0) {
      navigate(path2);
    }
  }, [nav]);

  const handleClick = () => {
    browseclick = browseclick + 1;
    setnav(browseclick);
  };

  function handlePos() {
    pos === "right" ? setPos("left") : setPos("right");
  }

  const getFile = async (url) => {
    const data = await axios.get("http://cors-anywhere.herokuapp.com/" + url, {
      responseType: "blob",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
    const r = new Blob([data.data], { type: "application/pdf" });
    var reader = new FileReader();
    reader.readAsDataURL(r);
    reader.onloadend = () => {
      setBook(reader.result);
    };
  };

  // This is a hook that runs as soon as the page renders and a url string is recieved to the component as props
  //upon recieving it, a state variable is loaded with the book
  useEffect(() => {
    const fetchData = async () => {
      document.addEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      if (readingbook) {
        getFile(readingbook.url);
      }
    };
    fetchData();
  }, [readingbook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(!show);
    var bookmarktitle = document.getElementById("bookmark").value;
    let data = {};
    data["book_id"] = readingbook.id;
    data["bookmark_name"] = bookmarktitle;
    data["location"] = Object.assign({}, pageLocation);
    data["personalisation"] = user.personalisation.id;
    let res = await axios({
      method: "post",
      url: "http://api.gyanibooks.com/bookmarks/",
      data: data,
    });
    if (res.status === 201) {
      let updatedUser = await axios({
        method: "get",
        url: "http://api.gyanibooks.com/user/",
        withCredentials: true,
      });
      setUser(updatedUser.data);
    }
  };

  function Form() {
    return (
      <form onSubmit={handleSubmit}>
        <input id="bookmark" placeholder="Bookmark Title"></input>
        <button type="submit">Add Bookmark</button>
      </form>
    );
  }

  const RemoveBookmark = (e) => {
    e.preventDefault();
    console.log("BookMark clicked");
    user.personalisation.bookmarks.forEach(async (bookmark) => {
      console.log(bookmark);
      if (_.isEqual(bookmark.location, pageLocation)) {
        let res = await axios.delete(
          "http://api.gyanibooks.com/bookmarks/" + bookmark.id + "/"
        );
        if (res.status === 204) {
          let updatedUser = await axios({
            method: "get",
            url: "http://api.gyanibooks.com/user/",
            withCredentials: true,
          });
          setUser(updatedUser.data);
        }
      }
    });
  };

  function BookMark() {
    return (
      <div>
        {1 ? (
          <BookmarkIcon onClick={RemoveBookmark} />
        ) : (
          <BookmarkBorderIcon onClick={() => setShow(!show)} />
        )}
      </div>
    );
  }
  const [pagesRendered, setpagesRendered] = useState(0);
  const [numPages, setnumPages] = useState(0);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setPage(1);
    setnumPages(numPages);
  };

  const onRenderSuccess = () =>
    this.setState((prevState) => ({
      pagesRendered: prevState.pagesRendered + 1,
    }));
  const pagesRenderedPlusOne = Math.min(pagesRendered + 1, numPages);

  return (
    <div
      id="full-screen"
      className="flex flex-col justify-center items-center p-0 m-1 lg:mt-2 overflow-hidden h-auto w-full"
    >
      <div className="flex flex-row-reverse gap-[10px]  justify-around items-end">
        <CloseFullscreenIcon onClick={handleClick} />
        {show ? <BookMark onClick={(e) => RemoveBookmark(e)} /> : <Form />}
      </div>

      <div className="buttons">
        <a
          id="prev"
          href="#prev"
          className="arrow"
          style={{ display: page <= 1 ? "hidden" : "block" }}
          onClick={() => setPage(page <= 1 ? 1 : page - 1)}
        >
          ‹
        </a>
        <a
          id="next"
          href="#next"
          className="arrow"
          onClick={() => setPage(page + 2)}
        >
          ›
        </a>
      </div>
      <div className="">
        {book == null ? (
          <div>LOADING BOOK PLEASE WAIT</div>
        ) : (
          <div className="w-full">
            {window.innerWidth >= 1024 ? (
              <>
                <Document
                  // file={readingbook.url}
                  file={book}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <div className="container" id="block_container">
                    <div>
                      <div className="flex flex-row items-center justify-center">
                        {Array.from(
                          new Array(pagesRenderedPlusOne),
                          (el, index) => {
                            const isCurrentlyRendering =
                              pagesRenderedPlusOne === index + 1;
                            const isLastPage = numPages === index + 1;
                            const needsCallbackToRenderNextPage =
                              isCurrentlyRendering && !isLastPage;

                            return (
                              <>
                                <Page
                                  bookmark="s for the application tier"
                                  scale={2}
                                  loading={() => console.log("Loadning")}
                                  pageNumber={page}
                                  onRenderSuccess={
                                    needsCallbackToRenderNextPage
                                      ? onRenderSuccess
                                      : null
                                  }
                                  pageIndex={page}
                                />
                                <Page
                                  bookmark="s for the application tier"
                                  scale={2}
                                  loading={() => console.log("Loadning")}
                                  pageNumber={page + 1}
                                  onRenderSuccess={
                                    needsCallbackToRenderNextPage
                                      ? onRenderSuccess
                                      : null
                                  }
                                  pageIndex={page}
                                />
                              </>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </Document>
                {/* <PDFCompressor file={book}/> */}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center mt-10 w-full mx-auto">
                <Document
                  // file={"http://cors-anywhere.herokuapp.com/" + readingbook.url}
                  file={book}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(new Array(pagesRenderedPlusOne), (el, index) => {
                    const isCurrentlyRendering =
                      pagesRenderedPlusOne === index + 1;
                    const isLastPage = numPages === index + 1;
                    const needsCallbackToRenderNextPage =
                      isCurrentlyRendering && !isLastPage;

                    return (
                      // <Page
                      //   scale={0.5}
                      //   key={`page_${index + 1}`}
                      //   loading={()=>console.log('Loadning')}
                      //   onRenderSuccess={
                      //     needsCallbackToRenderNextPage ? onRenderSuccess : null
                      //   }
                      //   pageNumber={index + 1}
                      // />
                      <Page
                        bookmark="s for the application tier"
                        scale={2}
                        loading={() => console.log("Loading")}
                        pageNumber={page}
                        onRenderSuccess={
                          needsCallbackToRenderNextPage ? onRenderSuccess : null
                        }
                        pageIndex={page}
                      />
                    );
                  })}
                </Document>
                <div className="flex justify-between items-center w-full">
                  <button onClick={() => setPage(page <= 1 ? 1 : page - 1)}>
                    LEFT
                  </button>
                  <button onClick={() => setPage(page + 2)}>RIGHT</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="w-[80%] h-screen hidden">
        <embed
          src={book}
          color="white"
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </div>
      {notes && (
        <>
          <div
            className={` ${pos}-0 bg-white py-5 pb-20 px-4 w-full lg:w-2/3 lg:h-[70%] overflow-y-scroll rounded-2xl shadow-2xl`}
            style={{ border: "0px solid black" }}
          >
            <button className="px-2 py-2 bg-[#428CFB] text-white rounded-full mb-5 " onClick={()=>handlePos()}>{pos === 'left' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}</button>
            <input className="ml-10 py-2 pl-5 w-1/2 rounded-full bg-blue-100" placeholder="File Name"/>
            <NotesMaker notes={notes}/>

          </div>
        </>
      )}
      <Fab
        onClick={() => setnotes(!notes)}
        variant="extended"
        color="primary"
        sx={{backgroundColor:'#428CFB',color:'white'}}
        className="!rounded-lg"
        aria-label="add"
        size="large"
        style={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
      >
        {!notes ? <SpeakerNotesIcon /> : <SpeakerNotesOff />}
        <span className="ml-2">Notes</span>
      </Fab>
    </div>
  );
}

export { FullScreenbook };
