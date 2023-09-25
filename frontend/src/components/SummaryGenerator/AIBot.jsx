import {
  ArrowBack,
  ArrowDownwardOutlined,
  Close,
  Sync,
} from "@mui/icons-material";
import { Fab, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Fade } from "react-reveal";
import "./index.css";
import gyani from "../../SVGAvatars/logoHalf.svg";
import { useNavigate } from "react-router-dom";  

function AIBot() {
  let user = JSON.parse(localStorage.getItem("user"));

  const [displayMessages, setdisplayMessages] = useState([]);

  const bottomRef = useRef(null);

  const history = useNavigate();

  useEffect(() => {
    let msgs = JSON.parse(localStorage.getItem("chats"));
    if (msgs !== null) setdisplayMessages(msgs);
  }, []);

  const [msg, setMsg] = useState("");
  const [input, setInput] = useState(false);

  function bottomScroll() {
    document.getElementById("bottomRef").scrollIntoView({ behavior: "smooth" });
  }

  setTimeout(() => {
    bottomScroll()
  }, 1);

  async function getChat() {
    if (msg.length <= 0) {
      alert("Please Write Message !");
      return;
    }
    setInput(true);
    bottomScroll();
    displayMessages.push([msg, "sent"]);
    bottomScroll();
    setMsg("");
    let res = await axios.post("https://bot.gyanibooks.com/api/chat_bot/", {
      text: msg+' answer in short like 1 to 5 sentences',
      user:user.id
    });
    bottomScroll();
    displayMessages.push([res.data.data, "rcvd"]);
    bottomScroll();
    // objDiv.scrollTop = objDiv.scrollHeight;
    // console.log(objDiv.scrollTop);
    setInput(false);
  }

  function saveChats() {
    localStorage.setItem("chats", JSON.stringify(displayMessages));
    console.log("Chats Saved Locally ");
  }

  return (
    <div className="sm:p-6 justify-between flex flex-col h-screen w-full mx-10 lg:mx-0 scrollbar-hide ">
      <div className="flex sm:items-center justify-between border-b-2 border-gray-200 w-full px-8 scrollbar-hide">
        <div className="relative flex items-center space-x-4">
          <IconButton className="!lg:hidden" onClick={()=>history(-1)}>
            <ArrowBack />
          </IconButton>
          <div className="lg:relative">
            <span className="absolute text-green-500 right-0 bottom-0">
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span>
            <img
              src={gyani}
              alt="GyaniLogo"
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">Gyani Bot</span>
            </div>
            <span className="text-md text-gray-600">Intelligent AI</span>
          </div>
        </div>
        <Tooltip title="Save Chats" className="!cursor-none" arrow>
          <button className="rounded-full  px-[0.5px] lg:m-5 !cursor-none hover:bg-[#EFEFFD]">
            <IconButton
              aria-label="Close"
              onClick={() => saveChats()}
              size="medium"
              type="button"
              className={` hover:opacity-[0.5] !cursor-none`}
            >
              <Sync />
            </IconButton>
          </button>
        </Tooltip>
      </div>
      <div
        id="messages"
        style={{ fontFamily: "Work Sans" }}
        className="flex flex-col p-3 overflow-y-scroll  scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch messages scrollbar-hide"
      >
        {displayMessages &&
          displayMessages.map((msg, i) => (
            <Fade bottom>
              <div className="chat-message py-2" key={i}>
                <div
                  className={`flex items-end ${
                    msg[1] === "sent" && "justify-end"
                  }`}
                >
                  <div className="flex flex-col space-y-2 text-md max-w-lg mx-2 order-2 items-end">
                    <div>
                      <span
                        className={`px-4 py-2 rounded-lg inline-block rounded-bl-none ${
                          msg[1] === "sent"
                            ? "bg-[#428CFB] text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {msg[0]}
                      </span>
                    </div>
                  </div>
                  {/* <img
                    src={`${
                      msg[1] === "rcvd"
                        ? gyani
                        : "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                    } `}
                    alt="My profile"
                    className={`w-10 h-10 rounded-full ${
                      msg[1] === "sent" ? "order-2" : "order-1"
                    }`}
                  /> */}
                </div>
              </div>
            </Fade>
          ))}
        <div id="bottomRef" ref={bottomRef} />
      </div>
      <div className="px-4 mb-2">
        <div className="relative pt-4 flex justify-between items-center w-full">
          <input
            type="text"
            placeholder="Write your message!"
            value={msg}
            rows={1}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.shiftKey && e.code === 13) setMsg(msg + "\n");
              else if (e.key === "Enter" && !input && !e.shiftKey) getChat();
            }}
            className="lg:w-[80%] focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-3 scrollbar-hide w-full mr-2"
          />
          <div className=" right-0 items-center inset-y-0 sm:flex">
            <button
              disabled={input}
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-[#428CFB] hover:bg-[#428CFB] focus:outline-none"
              onClick={() => getChat()}
            >
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIBot;
