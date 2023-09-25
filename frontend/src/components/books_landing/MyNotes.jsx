import {
  Add,
  Close,
  Delete,
  Done,
  Edit,
  ExpandMore,
  Favorite,
  Grid4x4Outlined,
  ListAlt,
  MenuOpenOutlined,
  MoreVert,
  Notes,
  Print,
  Refresh,
  Science,
  Search,
  Share,
  Stop,
  Save,
  Clear,
  Timer,
} from "@mui/icons-material";
import { grey} from '@mui/material/colors';
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import './animation.css'

import { useTranslation } from "react-i18next";
// import React, { useState } from 'react';
import NotesMaker from "../SummaryGenerator/NotesMaker.jsx";

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import Typewriter from "typewriter-effect";
import "../SummaryGenerator/NotesMaker.css";
import { database } from "../../Firebase.js";
import { ref, remove } from "firebase/database";
import {useLocation } from "react-router-dom";
import {useNavigate } from "react-router-dom";


function MyNotes() {
  let navigate = useNavigate();
  const { state } = useLocation();
  let user = JSON.parse(localStorage.getItem("user"));
  let [notes, updateNotes] = useState([]);
  const [grid, setGrid] = useState(false);
  const [changeTitle, setchangeTitle] = useState(-1);
  const [newTitle, setNewTitle] = useState();
  const [expand, setExpand] = useState(-1);
  const [search, setSearch] = useState("");
  const [sortOrder, setsortOrder] = useState("nosort");
  const [newNotes, setNewNotes] = useState(false);
  const [newNotesTitle, setNewNotesTitle] = useState("");
  const [showError, setshowError] = useState("");
  const [savedNotes, setSavedNotes] = useState(null);
  const [notesName, setNotesName] = useState("");
  const [category, setCategory] = useState(
    Object.keys(notes)[0] ? Object.keys(notes)[0] : ""
  );
  const [stopType, setStopType] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [score, setScore] = useState(0);
  const [viewNotes, toggleNotes] = useState(false);
  const [editNotes, setEditNotes] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editRequest, setEditRequest] = useState("POST");
  const [sideMenu, setSideMenu] = useState(false);
  const [timerStart, setTimerStart] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(null);
  const [time, setTime] = useState(parseInt(localStorage.getItem("notesTime")));
  const [editView, setEditView] = useState(true);
  const [editCatTitle, setEditCatTitle] = useState(false);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [shareDialog, setShareDialog] = useState([]);
  const [sharedalert, setSharedalert] = useState("");
  const [access, setAccess] = useState("view");
  const [accessMail, setAccessMail] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [catSwitch, setCatSwitch] = useState(false);
  const [notesId, setNotesId] = useState();
  const [Notesuuid ,setNotesuuid] = useState();
  const [importalert, setimportalert] = useState("");
  const [timerd, settimerd] = useState("false");
  const [plusd, setplusd] = useState("false");
  const [new1, setnew1] = useState("false");
  const [paged, setpaged] = useState("false");
  const [completiond, setcompletiond] = useState("false");
  const [notcompletiond, setnotcompletiond] = useState("false");
  const [re, setre] = useState("false");
  const [gs, setgs] = useState("false");
  const [sav, setsav] = useState("false");
  const [sar, setsar] = useState("false");
  const [re2, setre2] = useState("false");
  const [sty, setsty] = useState("false");
  const [parad, setparad] = useState("false");
  const [dri, setdri] = useState("false");
  
  


  // To View into Categories by Index
  const [catOpen, setCatOpen] = useState(-1);

  const fetchNotes = async () => {
    let res = await axios.get(
      `https://api.gyanibooks.com/library/notes/${user.personalisation.id}/`
    );
    updateNotes(res.data);
  };

  useEffect(() => {
    if(!(state===null)){
      setCategoryDialog(true);
      setplusd(localStorage.getItem("first_time_user"));
    }
    else{
      setplusd(localStorage.getItem("first_time_user"));
    }
   
    fetchNotes();
  }, []);

  async function handleDelete(id) {
    let res = await axios.get(
      `https://api.gyanibooks.com/library/notes/${user.personalisation.id}/${id}/delete/`
    );
    setshowError(res.status === 204 ? "Notes Deleted" : "");
    const deleteRef = ref(database, "/" + user.personalisation.id + "/" + id);

    remove(deleteRef).then(() => {
      console.log("location removed");
    });
    fetchNotes();
  }

  const { t } = useTranslation();

  const vertical = "top";
  const horizontal = "right";

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const keys = Object.keys(notes);
    const [reorderedKey] = keys.splice(result.source.index, 1);
    const vals = Object.values(notes);
    const [reorderedVal] = vals.splice(result.source.index, 1);
    keys.splice(result.destination.index, 0, reorderedKey);
    vals.splice(result.destination.index, 0, reorderedVal);
    let obj = {};
    keys.forEach((k, i) => {
      obj[k] = vals[i];
    });
    updateNotes(obj);
  }

  async function updateTitle(uuid, newTitle) {
    //Code for Updating Titles
    if (newTitle.trim().length <= 1) {
      setshowError("Please Add Title");
      setchangeTitle(-1);
    }

    // Else Update Title
    else {
      let payload = {
        title: uuid,
        new_title: newTitle,
        user: user.personalisation.id,
      };
      let res = await axios.post(
        `https://api.gyanibooks.com/library/update_notes_title/`,
        payload
      );
      if (res.data === "Title Updated") {
        fetchNotes();
        setchangeTitle(-1);
        setEditCatTitle(false);
        setEditTitle(newTitle);
      }
    }
    return;
  }

  const sortedData = (a, b) => {
    if (sortOrder === "asc") {
      return a.localeCompare(b);
    } else if (sortOrder === "des") {
      return b.localeCompare(a);
    } else {
      return;
    }
  };

  function find(note) {
    return (
      // note.title
      //   .toString()
      //   .toLowerCase()
      //   .includes(search.toString().toLowerCase()) ||
      note.toString().toLowerCase().includes(search.toString().toLowerCase())
      // note.notes
      //   .toString()
      //   .toLowerCase()
      //   .includes(search.toString().toLowerCase())
    );
  }

  function handleNewNotesClose() {
    if (newNotesTitle.length <= 3) {
      setshowError("Please provide Notes Name with minimum length 3!");
    } else {
      setshowError("");
      //Save New Notes
      setNewNotes(false);
    }
    fetchNotes();
  }

  // async function detectAI() {
  //   const div = document.getElementById("editorNotes");
  //   if (div !== null) {
  //     setLoading(true);

  //     let data = JSON.stringify({
  //       text: div.innerText,
  //     });
  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: "https://bot.gyanibooks.com/api/inde_ai_detect/",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: data,
  //     };

  //     const res = await axios.request(config);

  //     let real = 1 -res.data.fake;
  //     // console.log(real);
  //     setLoading(false);
  //     setScore(Math.floor(real*100));
  //   }
  // }

  // let interval = setInterval(() => {
  //   detectAI()
  // }, 10000);

  const printNotes = () => {
    let printContents = document.getElementById("printable").innerHTML;
    var myWindow = window.open("", "PrintNotes", "fullscreen=yes");
    myWindow.document.write(printContents);
    myWindow.print();
    myWindow.close();
  };

  useEffect(() => {
    let interval = null;
    if (isActive === true) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
        localStorage.setItem("notesTime", parseInt(time));
      }, 5);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    if((localStorage.getItem('notesTime')==="NaN")){
      localStorage.setItem("notesTime",0);
    }
    setTimerStart(true);
    setIsActive(true);
    // setInterval(detectAI, 10000);
    setTimeout(() => {
      setStopType(true);
    }, 3000);
  }, []);

  const handleTimerStart = () => {
    console.log(localStorage.getItem('notesTime'))
    if((localStorage.getItem('notesTime')==="NaN")){
      localStorage.setItem("notesTime",0);
    }
    setTimerStart(true);
    setIsActive(true);
    setTime(parseInt(localStorage.getItem("notesTime")));
  };

  const handleTimerStop = () => {
    setTimerStart(false);
    setIsActive(false);
    localStorage.setItem("notesTime", parseInt(time));
  };

  async function saveText() {
    setSyncing(true);
    setNotesName(
      user.personalisation.id + "." + category + "." + editRequest === "PUT"
        ? editTitle
        : newNotesTitle
    );
    if (editRequest === "POST" && newNotesTitle.length <= 3) {
      setOpen("Title Must be more than 3 characters !");
      setSyncing(false);
      return;
    }
    let payload = {
      user: user.personalisation.id,
      title: editRequest === "PUT" ? editTitle : newNotesTitle,
      category: category === undefined ? "Uncategorised" : category,
      notes: JSON.stringify(text),
    };
    let res = null;

    editRequest === "PUT"
      ? (res = await axios.put(
          "https://api.gyanibooks.com/library/notes/",
          payload
        ))
      : (res = await axios.post(
          "https://api.gyanibooks.com/library/notes/",
          payload
        ));
    if (res.status === 200) {
      setOpen(res.data);
    }

    if (res.status === 200) {
      //
      setSavedNotes(text);
      setSyncing(false);
      fetchNotes();
      return true;
    }
  }

  const handleEditNotes = (index, notes, title, cat,uuid, request) => {
    setExpand(index);
    setEditNotes(notes);
    setEditTitle(title);
    setEditRequest(request);
    setEditView(false);
    setCategory(cat);
    setNotesId(index);
    setNotesuuid(uuid);
  };

  function convertStoMs(seconds) {
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    let res = minutes + " : " + extraSeconds;
    return res;
  }

  

  async function createNewCategoryWithNotes(title) {
    // setNotesName(
    //   user.personalisation.id + "." + newCategory + "." + "untitled"
    // );
    let payload = {
      user: user.personalisation.id,
      title: title,
      category: catSwitch
        ? newCategory
        : category === undefined
        ? "Uncategorised"
        : category,
      notes: "",
    };

    let res = null;

    if (payload.title.length <= 3) {
      alert("Title must of more than 3 characters!");
      return;
    }
    if (payload.category.length <= 0) {
      alert("Category field is empty!");
      return;
    }

    res = await axios.post(
      "https://api.gyanibooks.com/library/notes/",
      payload
    );
    if (res.status === 200) {
      setOpen(res.data);
    }

    if (res.status === 200) {
      setSavedNotes(text);
    }
    fetchNotes();
    setCategoryDialog(false);
    return true;
  }
  async function shareNotes() {
    let data = JSON.stringify({
      note_uuid: shareDialog[0],
      shared_with: accessMail,
      access: access,
    });

    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "https://api.gyanibooks.com/share_note/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    let res = await axios.request(config).then((response) => {
      if (response.data.status === "success") {
        setShareDialog([]);
        setSharedalert(`Shared with ${access} access`);
      }
    });
  }
  return (
    <div
      className="w-full !scrollbar-hide  !overflow-none"
      style={{ fontFamily: "Work Sans" }}
    >
      {editView && (
      <div className="flex lg:flex-row flex-col justify-start lg:justify-between items-center lg:items-center lg:px-0 w-full   !overflow-none scrollbar-hide">
        {/* <h1
          style={{ fontFamily: "Work Sans" }}
          className="hidden lg:block lg:mx-0 text-[30px] lg:text-[50px] text-black font-[700] !text-left "
        >
          {!stopType ? (
            <Typewriter
              options={{
                strings: t("My Notes"),
                autoStart: true,
              }}
            />
          ) : (
            t("My Notes")
          )}
        </h1> */}
        {editView && (
          <div
            className="bg-gray-5 border-2 border-gray-200 focus-within:bg-white 
        items-center justify-between flex flex-row text-[#8C8CA1]
        focus-within:outline-[#428CFB] focus-within:outline-[3px] outline-none  font-[500]
        rounded-[8px] h-[48px] w-[350px] lg:w-1/3 focus-within:shadow-xl focus-within:border-[#428CFB]
        focus-within:border-[1px solid] text-[#8C8CA1] mt-10 lg:mt-0 shadow-lg ml-1"
          >
            <input
              className="bg-gray-50 focus-within:bg-white w-full outline-none py-2 pl-2 rounded-lg "
              type="text"
              placeholder="Search Notes by Category"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="bg-inherit" />
          </div>
        )}
        <div className="flex flex-row justify-between mt-5 items-center gap-3 lg:w-1/3 px-5 w-full  lg:mt-0 mr-14">
          {editView && (
            <>
              {grid ? (
                <Tooltip title="List" arrow>
                  <button
                    onClick={() => setGrid(!grid)}
                    className="px-4 py-2 rounded-lg flex flex-row justify-between items-center bg-gray-50 border-2 border-gray-200 text-black "
                  >
                    <ListAlt />
                  </button>
                </Tooltip>
              ) : (
                <Tooltip title="Grid" arrow>
                  <button
                    onClick={() => setGrid(!grid)}
                    className="px-4 py-2 rounded-lg flex flex-row justify-between items-center bg-gray-50 border-2 border-gray-200 text-black "
                  >
                    <Grid4x4Outlined />
                  </button>
                </Tooltip>
              )}
            </>
          )}
          {!viewNotes ? (
            <>
            {
              plusd=="true" ?<Tooltip open={plusd=="true"}  placement='bottom'
              arrow title={<div className=" rounded-lg"><p className="m-2 text-white text-base  max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Let's create your first note! 😎</p>
              </div>}
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: '#0E0E2C',
                      '& .MuiTooltip-arrow': {
                        color: '#0E0E2C',
                      },
                    },
                  },
                }}
                >
                  
               <button
                 onClick={() => {
                  setplusd("false")
             setCategoryDialog(true)
             setnew1("true")
                 }}
                 className="pulse px-4 py-2 rounded-lg flex flex-row justify-between items-center bg-blue-500 border-2 border-blue-500 hover:bg-blue-600 hover:border-blue-600 text-black "
               >
                 <Add sx={{ color: grey[50] }} />
               </button>
             </Tooltip> :
            <Tooltip title="Create New Note">
              <button
                onClick={() => setCategoryDialog(true)}
                className="px-4 py-2 rounded-lg flex flex-row justify-between items-center bg-blue-500 border-2 border-blue-500 hover:bg-blue-600 hover:border-blue-600 text-black "
              >
                <Add sx={{ color: grey[50] }} />
              </button>
              </Tooltip>
            }
            </>
          ) : (
            <button
              onClick={() => {
                setEditRequest("POST");
                setEditNotes(null);
                setExpand(-1);
                toggleNotes(!viewNotes);
                setEditView(true);
              }}
              className="px-4 py-2 rounded-lg flex flex-row justify-between items-center bg-gray-50 border-2 border-gray-200 text-black "
            >
              <span className="hidden lg:block">All Notes</span> <Notes />
            </button>
          )}

          {editView && (
            <select
              className="px-2 py-0 my-0 h-[41.6167px] rounded-lg bg-gray-50 border-2 border-gray-200 text-black ! !outline-none focus:text-inherit"
              value={sortOrder}
              onChange={(e) => setsortOrder(e.target.value)}
            >
              <option className="!" value={"nosort"}>
                No Sort
              </option>
              <option className="!" value={"asc"}>
                Ascending
              </option>
              <option className="!" value={"des"}>
                Descending
              </option>
            </select>
          )}
          {/* {viewNotes && (
            <button className="flex justify-start items-center  rounded-full px-[0.5px] bg-white border-2 border-white">
              <Tooltip arrow  title="Note's AI Score">
              <IconButton
                size="large"
                type="button"
                className="hover:opacity-[0.5]"
                onClick={() => setSideMenu(!sideMenu)}
              >
                <MenuOpenOutlined color="success" fontSize="large" />
              </IconButton>
                      </Tooltip>
            </button>
          )} */}
        </div>
      </div>
      )}
      <div className="scrollbar-hide  h-full ">
        {viewNotes ? (
          <div className="!lg:w-full overflow-y-none rounded-2xl py-2 scrollbar-hide">
            <div className="flex flex-row justify-between items-center  lg:mx-8 w-7/8">
              <div className="flex w-full px-5 flex-row justify-between items-cente !overflow-none  gap-2 lg:flex-row ">
                {editRequest === "POST" ? (
                  <input
                    className="pl-3  w-3/5 lg:w-1/5 hover:bg-[#EFEFFD]  outline-none focus:outline-[3px] py-3 focus:outline-blue-500 rounded-lg"
                    value={newNotesTitle}
                    onChange={(e) => setNewNotesTitle(e.target.value)}
                    placeholder="Notes Name"
                  />
                ) : editCatTitle ? (
                  <div className="flex justify-between items-center flex-row gap-2">
                    <input
                      placeholder={editTitle}
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onKeyUp={(e) =>
                        e.code === "Enter" ? updateTitle(e) : null
                      }
                      className="outline-none rounded-lg px-2"
                      onBlur={(e) => updateTitle(e)}
                    />
                    <div className="flex justify-between items-center flex-row  gap-2">
                      <div onClick={() => updateTitle(editTitle, newTitle)}>
                        <Done />
                      </div>
                      <div onClick={() => setEditCatTitle(!editCatTitle)}>
                        <Close />
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="lg:text-lg font-bold text-left uppercase  lg:w-1/3 ">
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                    >
                      {Object.keys(notes).map((cat, i) => (
                        <option value={cat} key={i}>
                          {cat}
                        </option>
                      ))}
                    </select>{" "}
                    /{" "}
                    <span onDoubleClick={() => setEditCatTitle(!editCatTitle)}>
                      {editTitle}
                    </span>
                  </span>
                )}
                <div className="hidden lg:px-10 lg:flex h-8 flex-col lg:flex-row lg:justify-center gap-4  items-center scrollbar-hide   w-full">
                  <>
                  {
                    re=="true"?<Tooltip open={re=="true"}   placement='bottom' 
                    arrow title={<div className=" rounded-lg"><p className=" text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Explore further information by pressing the ‘Research’ button here! 😋</p>
                     
                    </div>}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: '#0E0E2C',
                            '& .MuiTooltip-arrow': {
                              color: '#0E0E2C',
                            },
                          },
                        },
                      }}
                      >
                           <IconButton
                             onClick={() => { 
                              setre("false")
                              setre2("true")
                               setSideMenu(!sideMenu)
                             }}
                             className="pulse !p-3 py-2 flex flex-row justify-between items-center !hover:bg-[#EFEFFD] text-black  rounded-full"
                           >
                             <Science />
                           </IconButton>
                         </Tooltip> :
                  <Tooltip
                    title="Research"
                    arrow
                    className="!text-[20px]"
                    // followCursor
                  >
                    <IconButton
                      onClick={() => { 
                        setSideMenu(!sideMenu)
                      }}
                      className="!p-3 py-2 flex flex-row justify-between items-center !hover:bg-[#EFEFFD] text-black  rounded-full"
                    >
                      <Science />
                    </IconButton>
                  </Tooltip>
                  }
                  </>
                
                  <div className="flex flex-row justify-between lg:justify-start items-center gap-2 lg:gap-4 md:w-full md:px-0 px-6 mt-2 lg:mt-0">
                    <button
                      className="flex justify-start items-center rounded-full px-[0.5px] hover:bg-[#EFEFFD]"
                      onClick={() => {
                        saveText()
                        setsav("false")
                       localStorage.setItem("first_time_user", "false");
                      }}
                    >
                      <span className="hidden px-4">SAVE</span>
                      <>
                      {
                        sav=="true" ? <Tooltip open={sav=="true"}   placement='bottom'
                        arrow title={<div className=" rounded-lg"><p className=" text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Woohoo! You've just made your debut note!</p>
                        <p className=" text-white text-base text-center max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>🙌</p>
                        <p className=" text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Make sure to save it so you don't lose it!</p>
                        
                        </div>}
                          componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: '#0E0E2C',
                                '& .MuiTooltip-arrow': {
                                  color: '#0E0E2C',
                                },
                              },
                            },
                          }}
                          >
                                   <IconButton
                                     size="medium"
                                     type="button"
                                     className={`pulse hover:opacity-[0.5] ${
                                       syncing && "animate-spin"
                                     }`}
                                   >
                                     <Save  />
                                   </IconButton>
                                 </Tooltip>:
                      <Tooltip arrow  title="Save">
                        <IconButton
                          size="medium"
                          type="button"
                          className={` hover:opacity-[0.5] ${
                            syncing && "animate-spin"
                          }`}
                        >
                          <Save />
                        </IconButton>
                      </Tooltip>
                      }
                      </>
                    </button>
                    <button
                      className="flex justify-start items-center rounded-full px-[0.5px] gap-4 hover:bg-[#EFEFFD]" >
                      <span className="hidden px-4">SHARE</span>
                      <>
                      {
                        sar=="true"?<Tooltip open={sar=="true"}   placement='bottom'
                        arrow title={<div className=" rounded-lg"><p className="text-white  text-base" style={{ fontFamily: "Work Sans" }}>Awesome! You’re almost finished with your note journey! </p>
                        <p className="text-white text-base mt-2 max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}> 
              Why not share this with someone? Don't worry, you can manage who can edit or view it! You can even publish it within the Gyani community! After all, sharing is a form of caring!
              😍</p>
                        </div>}
                          componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: '#0E0E2C',
                                '& .MuiTooltip-arrow': {
                                  color: '#0E0E2C',
                                },
                              },
                            },
                          }}
                          >
                                 <IconButton
                                                     aria-label="share"
                                                     className="pulse px-[0.5px] !hover:bg-[#EFEFFD]"
                                                     onClick={() => {
                                                       console.log("clicked");
                                                       shareDialog.push(Notesuuid);
                                                       setsar("false")
                                                       setsav("true")
                                                     }}
                                                   >
                                                     <Share />
                                                   </IconButton>
                                 </Tooltip> :
                      <Tooltip arrow  title="Share">
                      <IconButton
                                          aria-label="share"
                                          className="px-[0.5px] !hover:bg-[#EFEFFD]"
                                          onClick={() => {
                                            console.log("clicked");
                                            shareDialog.push(Notesuuid);
                                          }}
                                        >
                                          <Share />
                                        </IconButton>
                      </Tooltip>
                      }
                      </>
                      
                    </button>
                    <Tooltip title="Print" arrow >
                      <button
                        className="flex justify-start items-center gap-4  rounded-full px-[0.5px] hover:bg-[#EFEFFD]"
                        onClick={() => printNotes()}
                      >
                        <IconButton
                          size="large"
                          className="px-[0.5px] !hover:bg-[#EFEFFD]"
                        >
                          <Print />
                        </IconButton>
                      </button>
                    </Tooltip>
                    <button
                      className="flex justify-start items-center rounded-full px-[0.5px] hover:bg-[#EFEFFD]"
                      onClick={() => {
                        setEditRequest("POST");
                setEditNotes(null);
                setExpand(-1);
                toggleNotes(!viewNotes);
                setEditView(true);
                      }}
                    >
                      <span className="hidden px-4">SAVE</span>
                      <Tooltip arrow  title="All Notes">
                        <IconButton
                          size="medium"
                          type="button"
                          className={` hover:opacity-[0.5] ${
                            syncing && "animate-spin"
                          }`}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                      </Tooltip>
                    </button>
                    <button
                      className="flex justify-start items-center rounded-full px-[0.5px] hover:bg-[#EFEFFD]"
                      onClick={() => {
                        setimportalert(true)
                      }}
                    >
                      <Tooltip arrow  title="Import Files">
                        <IconButton
                          size="medium"
                          type="button"
                          className={` hover:opacity-[0.5] ${
                            syncing && "animate-spin"
                          }`}
                        >
                          <FileUploadIcon />
                        </IconButton>
                      </Tooltip>
                    </button>
                    <>
                    {
                      timerd=="true" ?<Tooltip open={timerd=="true"}  placement='bottom'
                      arrow title={<div className=" rounded-lg"><p className="m-2 text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Let's start the timer! Then you can keep track of your writing time. ⏱️</p>
                      </div>}
                        componentsProps={{
                          tooltip: {
                            sx: {
                              bgcolor: '#0E0E2C',
                              '& .MuiTooltip-arrow': {
                                color: '#0E0E2C',
                              },
                            },
                          },
                        }}
                        >
                               <button className="pulse flex justify-start items-center  rounded-full px-[0.5px] hover:bg-[#EFEFFD]">
                                 {timerStart ? (
                                   <IconButton
                                     size="large"
                                     className="px-[0.5px] !border-solid !border-[1px] !border-red-500 !hover:bg-[#EFEFFD] animate-pulse "
                                     onClick={() => handleTimerStop()}
                                   >
                                     <Stop />
                                   </IconButton>
                                 ) : (
                                   <IconButton
                                     size="large"
                                     className="px-[0.5px] !hover:bg-[#EFEFFD]"
                                     onClick={() => {
                                       handleTimerStart()
                                       settimerd("false")
                                       setcompletiond("true")
                                     }}
                                   >
                                     <Timer />
                                   </IconButton>
                                 )}
                                 {"   "}
                               </button>
                             </Tooltip> :
                    <Tooltip
                      title={timerStart ? "Stop" : "Start"}
                      arrow
                      // followCursor
                    >
                      <button className="flex justify-start items-center  rounded-full px-[0.5px] hover:bg-[#EFEFFD]">
                        {timerStart ? (
                          <IconButton
                            size="large"
                            className="px-[0.5px] !border-solid !border-[1px] !border-red-500 !hover:bg-[#EFEFFD] animate-pulse "
                            onClick={() => handleTimerStop()}
                          >
                            <Stop />
                          </IconButton>
                        ) : (
                          <IconButton
                            size="large"
                            className="px-[0.5px] !hover:bg-[#EFEFFD]"
                            onClick={() => {
                              handleTimerStart()
                            }}
                          >
                            <Timer />
                          </IconButton>
                        )}
                        {"   "}
                      </button>
                      </Tooltip>
                    }
                    </>
                    
                    {timerStart && convertStoMs(parseInt(time / 1000))}
                  </div>
                </div>
                <>
                {
                 gs=="true" ?<Tooltip open={gs=="true"}  placement='bottom' 
                 arrow title={<div className=" rounded-lg"><p className=" text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Click here to see the magic! Gyani AI lets you do all the writing work! ✍️</p>
                 {/* <ArrowBackIcon className="ml-16 cursor-pointer" fontSize="large" onClick={()=>{
                setSideMenu(false)
                setgs("false")
                setparad("true")
              }}/> */}
              {/* <ArrowForwardIcon className="ml-2 cursor-pointer" fontSize="large" onClick={()=>{
                setSideMenu(true)
                setsty("true")
                setgs("false")
              }}/> */}
                 
                 </div>}
                   componentsProps={{
                     tooltip: {
                       sx: {
                         bgcolor: '#0E0E2C',
                         '& .MuiTooltip-arrow': {
                           color: '#0E0E2C',
                         },
                       },
                     },
                   }}
                   >
                    <button
                     onClick={() => {
                      setSideMenu(true)
                setsty("true")
                setgs("false")
                    }}
                    style={{
                      backgroundColor:"#428CFB",
                      color: "white"
                    }} className="pulse border border-transparent rounded-lg  flex flex-row justify-center items-center space-x-1 py-2  "
                  >
                    <span className="text-[16px] font-bold pl-3   max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>Gyani</span>
                      <span className="text-[16px] font-bold pr-3   max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>AI</span>
                  </button>
                  </Tooltip> :
                <button
                 onClick={() => {
                  setSideMenu(!sideMenu)
                }}
                style={{
                  backgroundColor:"#428CFB",
                  color: "white"
                }} className="border border-transparent rounded-lg  flex flex-row justify-center items-center space-x-1 py-2  "
              >
                <span className="text-[16px] font-bold pl-3    max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>Gyani</span>
                  <span className="text-[16px] font-bold pr-3    max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>AI</span>
              </button>
                }
                </>
                
              </div>
            </div>
            <div
              className="w-full h-screen scrollbar-hide overflow-y-scroll"
              id="printable"
            >
              {expand < 0 ? (
                <NotesMaker
                  notes={null}
                  setText={setText}
                  text={text}
                  newNotesTitle={newNotesTitle}
                  editTitle={editTitle}
                  category={category}
                  setNotesName={setNotesName}
                  setSavedNotes={setSavedNotes}
                  fetchNotes={fetchNotes}
                  request="POST"
                  sideMenu={sideMenu}
                  timer={parseInt(time / 1000)}
                  setSideMenu={setSideMenu}
                  re2={re2}
                  setre2={setre2}
                  sty={sty}
                  setsty={setsty}
                  sar={sar}
                  setsar={setsar}
                  gs={gs}
                  setgs={setgs}
                  re={re}
                  setre={setre}
                  parad={parad}
                  setparad={setparad}
                  dri={dri}
                  setdri={setdri}
                  handleTimerStart={handleTimerStart}
                  handleTimerStop={handleTimerStop}
                  timerStart={timerStart}
                  convertStoMs={convertStoMs}
                  time={time}
                  timerd={timerd}
                  settimerd={settimerd}
                  setcompletiond={setcompletiond}
                  completiond={completiond}
                  Notesuuid={Notesuuid}
                  shareDialog={shareDialog}
                  sav={sav}
                  setsav={setsav}
                />
              ) : (
                <NotesMaker
                  notes={editNotes}
                  setText={setText}
                  text={text}
                  newNotesTitle={newNotesTitle}
                  editTitle={editTitle}
                  category={category}
                  setNotesName={setNotesName}
                  setSavedNotes={setSavedNotes}
                  fetchNotes={fetchNotes}
                  request="PUT"
                  sideMenu={sideMenu}
                  setSideMenu={setSideMenu}
                  re2={re2}
                  setre2={setre2}
                  notesId={notesId}
                  sty={sty}
                  setsty={setsty}
                  sar={sar}
                  setsar={setsar}
                  gs={gs}
                  setgs={setgs}
                  re={re}
                  setre={setre}
                  parad={parad}
                  setparad={setparad}
                  dri={dri}
                  setdri={setdri}
                  handleTimerStart={handleTimerStart}
                  handleTimerStop={handleTimerStop}
                  timerStart={timerStart}
                  convertStoMs={convertStoMs}
                  time={time}
                  timerd={timerd}
                  settimerd={settimerd}
                  setcompletiond={setcompletiond}
                  completiond={completiond}
                  Notesuuid={Notesuuid}
                  shareDialog={shareDialog}
                  sav={sav}
                  setsav={setsav}
                />
              )}
            </div>
          </div>
        ) : notes ? (
          <DragDropContext
            onDragEnd={handleOnDragEnd}
            className="! scrollbar-hide overflow-y-none w-full"
          >
            <Droppable droppableId="cat">
              {(provided) => (
                <ul
                  className="characters !overflow-none mt-10 flex lg:flex-row flex-col flex-wrap justify-evenly items-start w-full lg:ml-0"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {Object.keys(notes)
                    .filter(find)
                    .sort(sortedData)
                    .map((cat, i) => (
                      <Draggable key={cat} draggableId={cat} index={i}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`!scrollbar-hide lg:w-${
                              grid ? "[30%]" : "full"
                            }`}
                          >
                            <Card className="!p-0 !w-[95%]">
                              <CardHeader
                                // avatar={
                                //   <Avatar
                                //     sx={{
                                //       bgcolor: "#F1B503",
                                //       opacity: "0.5",
                                //     }}
                                //     aria-label="recipe"
                                //   >
                                //     {cat}
                                //   </Avatar>
                                // }
                                title={cat}
                                subheader={Object.values(notes)
                                  [i][0].date_created.substring(0, 10)
                                  .split("-")
                                  .reverse()
                                  .join("-")}
                                action={
                                  <IconButton
                                    className="px-[0.5px] !hover:bg-[#EFEFFD]"
                                    expand={catOpen === i}
                                    onClick={() => {
                                      setCatOpen(i);
                                      catOpen === i
                                        ? setCatOpen(-1)
                                        : setCatOpen(i);
                                    }}
                                  >
                                    <ExpandMore
                                      aria-expanded={catOpen === i}
                                      aria-label="show more"
                                    >
                                      <ExpandMore />
                                    </ExpandMore>
                                  </IconButton>
                                }
                              />

                              <CardActions
                                className="flex justify-between mx-2"
                                disableSpacing
                              ></CardActions>
                              <Collapse in={catOpen === i}>
                                <CardContent>
                                  {Object.values(notes)[i].map(
                                    ({ title, notes, id, uuid }, key) => (
                                      <div
                                        className={`flex lg:w-full flex-row justify-evenly items-center text-center text-gray-800   h-[50px]  rounded-lg bg-gradient-to-r from-[#EFEFFD] border-2 border-gray-200 my-4 `}
                                        key={key}
                                      >
                                        {changeTitle === id ? (
                                          <div className="flex justify-between items-center flex-row gap-2 !w-full">
                                            <input
                                              placeholder={title}
                                              value={newTitle}
                                              onChange={(e) =>
                                                setNewTitle(e.target.value)
                                              }
                                              onKeyUp={(e) =>
                                                e.code === "Enter"
                                                  ? updateTitle(e)
                                                  : null
                                              }
                                              className="outline-none rounded-lg px-2 text-center !w-[100%]"
                                              onBlur={(e) => updateTitle(e)}
                                            />
                                            <div className="flex justify-between items-center flex-row gap-2">
                                              <div
                                                onClick={() =>
                                                  updateTitle(id, newTitle)
                                                }
                                              >
                                                <Done />
                                              </div>
                                              <div
                                                onClick={() =>
                                                  setchangeTitle(-1)
                                                }
                                              >
                                                <Close />
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <span
                                            onDoubleClick={() =>
                                              setchangeTitle(id)
                                            }
                                            className="w-[200px]"
                                          >
                                            {!stopType ? (
                                              <Typewriter
                                                options={{
                                                  strings: title,
                                                  autoStart: true,
                                                  delay: 300,
                                                }}
                                              />
                                            ) : (
                                              title
                                            )}
                                          </span>
                                        )}
                                        <span className="h-full pt-5 w-1/2 rounded-lg">
                                          {}
                                        </span>
                                        <Button
                                          className="flex flex-row justify-center items-center !"
                                          onClick={() => {
                                            handleEditNotes(
                                              id,
                                              notes,
                                              title,
                                              cat,
                                              uuid,
                                              "PUT"
                                            );
                                            toggleNotes(!viewNotes);
                                            setpaged(localStorage.getItem("first_time_user"))
                                          }}
                                        >
                                          <Tooltip title="Edit" arrow>
                                            <div className="flex justify-end items-end w-100 ml-2">
                                              <Edit />
                                            </div>
                                          </Tooltip>
                                        </Button>
                                        <IconButton
                                          aria-label="share"
                                          className="px-[0.5px] !hover:bg-[#EFEFFD]"
                                          onClick={() => {
                                            console.log("clicked");
                                            shareDialog.push(uuid);
                                          }}
                                        >
                                          <Share />
                                        </IconButton>
                                        <IconButton
                                          onClick={() => handleDelete(id)}
                                        >
                                          <Delete />
                                        </IconButton>
                                      </div>
                                    )
                                  )}
                                </CardContent>
                              </Collapse>
                            </Card>
                          </li>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <p className="w-full bg-blue-400 h-20">Loading</p>
        )}
      </div>
      <Dialog
      className="bg-white/50"
        open={importalert}
        keepMounted
        onClose={() => setimportalert(false)}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={
          {
            className: "lg:w-1/2",
          }
        }
      >
        <DialogActions>
          <Button  onClick={() => setimportalert(false)}><Clear /></Button>
        </DialogActions>
        <DialogTitle className="font-bold">Import Files</DialogTitle>
        <DialogContent className="mt-2 pt-2">
        <input class="form-check-input m-2" type="checkbox" value="" id="invalidCheck" required />
                     <label class="form-check-label" for="invalidCheck">
                     Are you importing documents from your local storage
                     </label>
                     <br></br>
                     <input class="form-check-input m-2" type="checkbox" value="" id="invalidCheck" required />
                     <label class="form-check-label" for="invalidCheck">
                     Are you importing documents from google drive
                     </label>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={() => setShareDialog(false)}>Submit</Button>
        </DialogActions> */}
      </Dialog>
      <Dialog
        open={categoryDialog}
        keepMounted
        onClose={() => {
          setnew1("false")
          setCategoryDialog(false)
        }}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          className: "lg:w-1/2",
        }}
      >
        <DialogActions>
          <Button  onClick={() => {
            setnew1("false")
            setCategoryDialog(false)
          }}><Clear /></Button>
        </DialogActions>
        <DialogTitle className="font-bold" >Create a new Note</DialogTitle>
        <DialogContent>
          New Category
          <Switch
            checked={catSwitch}
            onChange={() => setCatSwitch(!catSwitch)}
            inputProps={{ "aria-label": "controlled" }}
          />
          <DialogContentText id="alert-dialog-slide-description">
            {catSwitch ? (
              <>
                <input
                  type="text"
                  placeholder="Category Name"
                  onChange={(e) => setNewCategory(e.target.value)}
                  rows={1}
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3 scrollbar-hide"
                />
                <div className="my-5" />
                <input
                  id="newNotesTitleName"
                  type="text"
                  placeholder="Note's Name"
                  rows={1}
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3 scrollbar-hide"
                />
              </>
            ) : (
              <div className="w-full">
                Select Category <br />
                <Select
                  placeholder="Select Category"
                  defaultValue={"Uncategorised"}
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  fullWidth
                >
                  {Object.keys(notes).map((cat, i) => (
                    <MenuItem value={cat} key={i}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
                <div className="my-5" />
                <input
                  id="newNotesTitleName"
                  type="text"
                  placeholder="Note's Name"
                  rows={1}
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3 scrollbar-hide"
                />
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Tooltip open={new1=="true"}   placement='bottom'
            arrow title={<div className=" rounded-lg"><p className="m-2 text-white text-base max-[750px]:text-xs " style={{ fontFamily: "Work Sans" }}>Got a bunch of projects? Create a whole category for them.
            This lets you organize your projects. Come up with a cool name for it! 😉</p>
            </div>}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: '#0E0E2C',
                    '& .MuiTooltip-arrow': {
                      color: '#0E0E2C',
                    },
                  },
                },
              }}
              >
              <Button
                variant="contained"
                onClick={() => {
                  setnew1("false")
                  setplusd("false")
                  createNewCategoryWithNotes(
                    document.getElementById("newNotesTitleName").value
                  );
                }}
              >
                Create
              </Button>
              </Tooltip>
          <Button onClick={() => setCategoryDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    

      <Dialog
        open={paged=="true"}
        keepMounted
        onClose={() => {
          setpaged("false")
          
      }}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            backgroundColor: 'black',
            borderRadius:10
          },
        }}
      >
        <DialogContent className="  rounded-lg ">
          <p className="text-white text-base  max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Kudos! Your first note has been successfully created!
          🎉 </p>
          {/* <ArrowBackIcon sx= {
                      {
                       color: 'white',
                     }
                   } className="ml-16 cursor-pointer" fontSize="large" onClick={()=>{
          }}/> */}
          <ArrowForwardIcon sx= {
                      {
                       color: 'white',
                     }
                   } className="ml-2 cursor-pointer" fontSize="large" onClick={()=>{
            settimerd("true");
            handleTimerStop()
            setpaged("false")
          }}/>
        </DialogContent>
      </Dialog>

      <Dialog
        open={completiond=="true"}
        keepMounted
        onClose={() => {
          setcompletiond("false")
          
         } }
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            backgroundColor: "black",
            borderRadius:10
          },
        }}
      >
        <DialogContent className="  rounded-lg">
          <p className="text-white text-base  max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Excellent work! You're making great progress!🚀
          </p>
          {/* <ArrowBackIcon sx= {
                      {
                       color: 'white',
                     }
                   } className="ml-16 cursor-pointer" fontSize="large" onClick={()=>{
                    settimerd("true")
                    setcompletiond("false")
          }}/> */}
          <ArrowForwardIcon sx= {
                      {
                       color: 'white',
                     }
                   } className="ml-2 cursor-pointer" fontSize="large" onClick={()=>{
                    setcompletiond("false")
                    setre("true")
          }}/>
        </DialogContent>
      </Dialog>

      

      {/* Share Notes Drawer  */}
      <Dialog
        open={shareDialog && shareDialog.length > 0}
        keepMounted
        onClose={() => setShareDialog([])}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={
          {
            // className: "lg:w-",s
          }
        }
      >
        <DialogActions>
          <Button  onClick={() => setShareDialog([])}><Clear /></Button>
        </DialogActions>
        <DialogTitle className="font-bold">Share Notes</DialogTitle>
        <DialogContent className="mt-2 pt-2">
          <TextField
            placeholder="Enter Mail"
            onChange={(e) => setAccessMail(e.target.value)}
            id="outlined-basic"
            label="Mail"
            variant="filled"
          />
          <Select onChange={(e) => setAccess(e.target.value)} value={access}>
            <MenuItem value="edit">Editor</MenuItem>
            <MenuItem value="view">Viewer</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => shareNotes()}>
            Share
          </Button>
          <Button variant="contained" >
            Share To Community
          </Button>
          <Button variant="outlined" onClick={() => setShareDialog([])}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={open}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          severity={`${
            open === "Title Must be more than 3 characters !"
              ? "error"
              : "success"
          }`}
          sx={{
            backgroundColor:
              open === "Title Must be more than 3 characters !"
                ? "red"
                : "lightGreen",
          }}
        >
          {open}
        </Alert>
      </Snackbar>

      {/* Shared Notes Alert  */}
      <Snackbar
        open={sharedalert.length > 0}
        autoHideDuration={3000}
        onClose={() => setSharedalert("")}
        message={sharedalert}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          severity={"success"}
          sx={{
            backgroundColor: "lightGreen",
          }}
        >
          {sharedalert}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MyNotes;
