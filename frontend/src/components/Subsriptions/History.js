import {
  Add,
  Close,
  Delete,
  Edit,
  Grid4x4Outlined,
  ListAlt,
  Search,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  Fab,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Snackbar,
} from "@mui/material";

import { useTranslation } from "react-i18next";
// import React, { useState } from 'react';
import NotesMaker from "../SummaryGenerator/NotesMaker.jsx";

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import Typewriter from "typewriter-effect";
import { LightSpeed } from "react-reveal";
// import './style.scss';

function MyNotes() {
  let user = JSON.parse(localStorage.getItem("user"));

  const [notes, updateNotes] = useState([]);
  const [grid, setGrid] = useState(false);
  const [changeTitle, setchangeTitle] = useState(-1);
  const [newTitle, setNewTitle] = useState([]);
  const [expand, setExpand] = useState(-1);
  const [search, setSearch] = useState("");
  const [sortOrder, setsortOrder] = useState("nosort");
  const [newNotes, setNewNotes] = useState(false);
  const [newNotesTitle, setNewNotesTitle] = useState("");
  const [showError, setshowError] = useState("");
  const [savedNotes, setSavedNotes] = useState(null);
  const [notesName, setNotesName] = useState("");
  const [category, setCategory] = useState("cat-1");

  const fetchNotes = async () => {
    let res = await axios.get(
      `https://api.gyanibooks.com/library/notes/${user.personalisation.id}/`
    );
    updateNotes(res.data);
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  async function handleDelete(title) {
    let res = await axios.get(
      `https://api.gyanibooks.com/library/notes/${user.personalisation.id}/${title}/delete/`
    );
    setshowError(res.status === 204 ? "Notes Deleted" : "");
    fetchNotes();
  }

  const { t } = useTranslation();

  const vertical = "top";
  const horizontal = "right";

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateNotes(items);
    // console.log(items)
  }

  function updateTitle(e) {
    //Code for Updating Titles
    if (newTitle.title.trim().length <= 1) {
      setshowError("Please Add Title");
      setchangeTitle(-1);
    }

    // Else Update Title
    else {
      setchangeTitle(-1);
    }
    return;
  }

  const sortedData = (a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "des") {
      return b.title.localeCompare(a.title);
    } else {
      return;
    }
  };

  function find(note) {
    return (
      note.title
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase()) ||
      note.category
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase())
    );
  }

  function handleNewNotesClose() {
    if (newNotesTitle.length <= 3) {
      setshowError("Please provide Notes Name with minimum length 3!");
    } else {
      setshowError("");
      //Save New Notes
      console.log(notes);
      setNewNotes(false);
    }
    fetchNotes();
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 10,
  };

  return (
    <div className="w-full mx-2 lg:mx-10" style={{ fontFamily: "Work Sans" }}>
      <div className="flex mx-5 lg:flex-row flex-col justify-start lg:justify-between items-start lg:items-center w-full lg:w-[90%] mb-10 gap-3 ">
        <h1
          style={{ fontFamily: "Work Sans" }}
          className=" lg:mx-0 text-[30px] lg:text-[50px] text-black font-[700] text-left w-full lg:w-[30%]"
        >
          {t("Payments")}
        </h1>
        <div className="flex flex-row !justify-between items-center hover:bg-[#EFEFFD] rounded-2xl shadow-lg lg:w-1/3 w-5/6 lg:mx-0">  
          <input
            className="hover:bg-[#EFEFFD] w-full outline-none focus:outline-[3px] py-3 pl-2 focus:outline-blue-500 rounded-lg cursor-none"
            type="text"
            placeholder="Search Notes by Title"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search />
        </div>
        <div className="flex flex-row justify-between items-center lg:w-1/3 w-5/6">  
          {grid ? (
            <button
              onClick={() => setGrid(!grid)}
              className="px-4 py-2 rounded-lg shadow-lg hover:bg-[#EFEFFD] text-black cursor-none"
            >
              List <ListAlt />
            </button>
          ) : (
            <button
              onClick={() => setGrid(!grid)}
              className="px-4 py-2 rounded-lg shadow-lg hover:bg-[#EFEFFD] text-black cursor-none"
            >
              Grid <Grid4x4Outlined />
            </button>
          )}
          <Select
            className="px-4 py-0 my-0 h-[41.6167px] rounded-lg shadow-lg hover:bg-[#EFEFFD] text-black border-none outline-none !cursor-none hover:cursor-none"
            value={sortOrder}
            onChange={(e) => setsortOrder(e.target.value)}
          >
            <MenuItem className="!cursor-none" value={"nosort"}>No Sort</MenuItem>
            <MenuItem className="!cursor-none" value={"asc"}>Ascending</MenuItem>
            <MenuItem className="!cursor-none" value={"des"}>Descending</MenuItem>
          </Select>
        </div>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div
                className={` w-full mx-2 ${
                  grid
                    ? "flex flex-row lg:justify-start items-center flex-wrap" 
                    : "lg:mr-32"
                }`}
              >
                {notes
                  .filter(find)
                  .sort(sortedData)
                  .map(({ title, category, id, notes }, index) => {
                    return (
                      <Draggable key={title} draggableId={title} index={index}>
                        {(provided) => (
                          // <LightSpeed left>
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <>
                                <div
                                  className={`flex ${
                                    grid ? "w-5/6" : "w-[90%]"
                                  } flex-row justify-evenly items-center text-center text-gray-800   h-[50px] shadow-lg rounded-lg hover:bg-[#EFEFFD] !cursor-none`}
                                  key={index}
                                >
                                  {changeTitle === index ? (
                                    <input
                                      placeholder={title}
                                      value={newTitle.title}
                                      onChange={(e) =>
                                        setNewTitle({
                                          title: e.target.value,
                                          id: index,
                                        })
                                      }
                                      onKeyUp={(e) =>
                                        e.code === "Enter"
                                          ? updateTitle(e)
                                          : null
                                      }
                                      className="outline-none focus:outline-2 focus:outline-blue-500 rounded-lg px-2"
                                      onBlur={(e) => updateTitle(e)}
                                    />
                                  ) : (
                                    <span
                                      onDoubleClick={() =>
                                        setchangeTitle(index)
                                      }
                                      className="w-[200px]"
                                    >
                                      {title}
                                    </span>
                                  )}
                                  <span className="h-full pt-5 w-1/2 rounded-lg">
                                    {}
                                  </span>
                                  <Button
                                    className="flex flex-row justify-center items-center !cursor-none"
                                    onClick={() => setExpand(index)}
                                  >
                                    EDIT
                                    <div className="flex justify-end items-end w-100 ml-2">
                                      <Edit />
                                    </div>
                                  </Button>
                                  <IconButton
                                    onClick={() => handleDelete(title)}
                                    className="!cursor-none"
                                  >
                                    <Delete />
                                  </IconButton>
                                </div>
                                {expand === index && (
                                  <Modal
                                    open={expand === index}
                                    onClose={() => {
                                      setExpand(-1);
                                      fetchNotes();
                                    }}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    className="w-full scrollbar-hide"
                                  >
                                    <div
                                      style={style}
                                      className="!lg:w-2/3 bg-white overflow-y-scroll shadow-lg px-10 rounded-2xl py-2 scrollbar-hide"
                                    >
                                      <div className="flex justify-between items-center pt-4">
                                        <span className="text-2xl font-bold mx-10 uppercase">
                                          {title}
                                        </span>
                                        <IconButton
                                          aria-label="Close"
                                          onClick={() => {
                                            setExpand(-1);
                                            fetchNotes();
                                          }}
                                          className="!bg-gray-500 !text-white"
                                        >
                                          <Close />
                                        </IconButton>
                                      </div>
                                      <div>
                                        <NotesMaker
                                          notes={notes}
                                          newNotesTitle={title}
                                          category={category}
                                          setNotesName={setNotesName}
                                          setSavedNotes={setSavedNotes}
                                          request="PUT"
                                        />
                                      </div>
                                    </div>
                                  </Modal>
                                )}
                              </>
                            </li>
                          // </LightSpeed>
                        )}
                      </Draggable>
                    );
                  })}
              </div>
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Fab
        onClick={() => setNewNotes(true)}
        variant="circular"
        color="primary"
        aria-label="add"
        size="medium"
        style={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
          cursor:"none"
        }}
      >
        <Add />
      </Fab>
      <Modal
        open={newNotes}
        onClose={() => handleNewNotesClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="w-full h-full flex justify-center items-center"
      >
        <div
          className="bg-white py-5 pb-20 px-4 w-[90%] h-[90%] overflow-y-scroll rounded-2xl shadow-2xl"
          style={{ border: "0px solid black" }}
        >
          <div className="flex flex-row justify-between items-center mx-8">
            <input
              className="mb-5 pl-5 w-1/2 hover:bg-[#EFEFFD]  outline-none focus:outline-[3px] py-3 focus:outline-blue-500 rounded-lg"
              value={newNotesTitle}
              onChange={(e) => setNewNotesTitle(e.target.value)}
              placeholder="Notes Name"
            />
            <Select
              className="px-4 py-0 my-0 h-[41.6167px] rounded-lg shadow-lg hover:bg-[#EFEFFD] text-black border-none outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={"cat-1"}>Category 1</MenuItem>
              <MenuItem value={"cat-2"}>Category 2</MenuItem>
              <MenuItem value={"cat-3"}>Category 3</MenuItem>
            </Select>
            <IconButton
              aria-label="Close"
              onClick={() => handleNewNotesClose()}
              className="!bg-gray-500 !text-white"
            >
              <Close />
            </IconButton>
          </div>
          <NotesMaker
            notes={null}
            newNotesTitle={newNotesTitle}
            category={category}
            setNotesName={setNotesName}
            setSavedNotes={setSavedNotes}
            request="POST"
          />
        </div>
      </Modal>
      <Snackbar
        open={showError.length > 1}
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={() => setshowError("")}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setshowError("")}
        >
          {showError}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MyNotes;
