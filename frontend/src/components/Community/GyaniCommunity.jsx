import { AddToPhotosOutlined, Grid4x4Outlined, ListAlt } from "@mui/icons-material";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import { AddBox, Search,Clear } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function GyaniCommunity() {
  const [emails, setEmails] = useState([
    { date: 'DATE', data: "Import from refernce of manager - Anita" },
    { date: 'DATE', data: "Import from refernce of manager - Anita" },
    { date: 'DATE', data: "Import from refernce of manager - Anita" },
    { date: 'DATE', data: "Import from refernce of manager - Anita" },
    { date: 'DATE', data: "Import from refernce of manager - Anita" },
    { date: 'DATE', data: "Import from refernce of manager - Anita" },
    { date: 'DATE', data: "Import from refernce of manager - Anita" },
    { date: 'DATE', data: "Import from refernce of manager - Anita" },
  ]);
  const [grid, setGrid] = useState(true);
  const [shareDialog, setShareDialog] = useState(false);
  const [importfromdrivelocal, setimportfromdrivelocal] = useState(false);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const keys = Array.from(emails);
    const [reorderedKey] = keys.splice(result.source.index, 1);
    keys.splice(result.destination.index, 0, reorderedKey);
    setEmails(keys);
    console.log(emails);
  }
  return (
    <div
      className="!w-full scrollbar-hide overflow-y-scroll flex flex-col justify-center items-center"
      style={{ fontFamily: "Work Sans" }}
    >
      {/* NavBar  */}
      <div className="w-full flex flex-row justify-between items-center px-5 lg:px-10 py-3 border-b-4 bg-white">
        <span className="text-[24px] lg:text-5xl font-bold">
          Gyani Community
        </span>
        <button className="flex flex-row justify-evenly items-center lg:w-[200px] bg-blue-400 p-2 lg:py-4 rounded-lg text-white opacity-[0.9] hover:opacity-[1]" 
        onClick={() => {
          setShareDialog(true);
        }}
        >
          <AddBox/>{" "}
          <span className="text-[10px] lg:text-lg hidden lg:block">
            Add Content
          </span>
        </button>
      </div>

      {/* Action Bar  */}
      <div className="w-full flex flex-row lg:justify-start lg:gap-3 items-center px-2 !lg:px-10 py-5 border-b-4">
        {/* Sort Dropdown  */}
        <select
          className="pr-2 h-[41.6167px] rounded-lg bg-white border-[3px] border-gray-300 text-black ! !outline-none focus:text-inherit"
          //   value={sortOrder}
          //   onChange={(e) => setsortOrder(e.target.value)}
        >
          <option className="!" value={"new"}>
            Sort Newest
          </option>
          <option className="!" value={"asc"}>
            Ascending
          </option>
          <option className="!" value={"des"}>
            Descending
          </option>
        </select>

        {/* Search Bar  */}
        <div className="flex flex-row justify-between items-center lg:pr-2 h-[41.6167px] !w-2/3 rounded-lg bg-white border-[3px] border-gray-300 text-black !outline-none focus:text-inherit">
          <input
            placeholder="Search"
            className="bg-inherit h-full w-2/3 lg:w-full ml-2 outline-none lg:px-3"
          />
          <Search />
        </div>

        {/* Grid / List Toggle Button  */}
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
      </div>

      {/* Cards  */}
      <div className="w-full flex justify-evenly items-center overflow-x-scroll lg:overflow-hidden gap-4 mt-5">
        <DragDropContext
          onDragEnd={handleOnDragEnd}
          className="! scrollbar-hide overflow-y-none w-full"
        >
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters flex lg:flex-row flex-col flex-wrap justify-evenly items-center !w-full lg:ml-5"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {emails.map((mail, key) => (
                  <Draggable key={key} draggableId={key.toString()} index={key}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`!scrollbar-hide flex lg:flex-row justify-evenly items-center !scrollbar-hide lg:w-${
                          grid ? "[30%]" : "full"
                        }`}
                        key={key}
                      >
                        <Card date={mail.date} data={mail.data}/>
                      </li>
                    )}
                  </Draggable>
                ))}
                <div className="h-auto bg-white lg:w-[25%] my-2 mx-1 flex flex-col justify-between p-5 items-center text-black rounded-br-3xl border-2 shadow-lg cursor-pointer">
                  <div className="flex flex-row justify-center items-center w-full">
                    <AddToPhotosOutlined fontSize="large" />
                  </div>
                </div>
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Dialog
      className="bg-white/50"
        open={shareDialog}
        keepMounted
        onClose={() => setShareDialog(false)}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={
          {
            // className: "lg:w-",s
          }
        }
      >
        <DialogActions>
          <Button  onClick={() => setShareDialog(false)}><Clear /></Button>
        </DialogActions>
        <DialogTitle>Add Content</DialogTitle>
        <DialogContent className="mt-2 pt-2">
        <input class="form-check-input m-2" type="checkbox" value="" id="invalidCheck" required />
                     <label class="form-check-label" for="invalidCheck">
                     Publish from notes
                     </label>
                     <br></br>
                     <input class="form-check-input m-2" type="checkbox" value="" id="invalidCheck" required  onChange={
                                                                           (e) => {
                                                                               if (e.target.checked) {
                                                                                  setimportfromdrivelocal(true);
                                                                               }
                                                                               else{
                                                                                setimportfromdrivelocal(false);
                                                                               }
                                                                           }
                                                                       }/>
                     <label class="form-check-label" for="invalidCheck">
                     Import from google drive/local storage
                     </label>
                     <br></br>
                     {importfromdrivelocal && (
                      <>
                      <input class="form-check-input m-2 ml-5" type="checkbox" value="" id="invalidCheck" required />
                     <label class="form-check-label" for="invalidCheck">
                     Import from google drive
                     </label>
                     <br></br>
                     <input class="form-check-input m-2 ml-5" type="checkbox" value="" id="invalidCheck" required />
                     <label class="form-check-label" for="invalidCheck">
                     Import from google local storage
                     </label>
                     <br></br>
                      </>
                     )
                     }
                     <input class="form-check-input m-2" type="checkbox" value="" id="invalidCheck" required />
                     <label class="form-check-label" for="invalidCheck">
                     Create new notes
                     </label>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setShareDialog(false)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
