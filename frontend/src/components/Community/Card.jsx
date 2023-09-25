import { Link, ContentCopy, MenuOpen } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import React from "react";

export default function Card(props) {
  return (
    <div className="h-auto bg-white w-full m-2 flex flex-col justify-between p-5 items-center text-black rounded-br-3xl border-2 shadow-lg cursor-pointer">
      <div className="flex flex-row justify-between items-center w-full border-b-2">
        <button>
          <Link />
        </button>
        <span>{props.date}</span>
        <Checkbox></Checkbox>
      </div>
      <div className="text-center my-2">
        <span className="!text-center">
          {props.data}
        </span>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <button className="opacity-[0.5]">
          <ContentCopy />
        </button>
        <button>
          <MenuOpen />
        </button>
      </div>
    </div>
  );
}
