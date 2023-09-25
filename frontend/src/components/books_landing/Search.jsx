import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect } from "react";
import "./Search.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Search({ setDiscovered, showButton, setCount }) {
  let navigate = useNavigate();
  const [searchBarText, setSearchBarText] = useState("");
  const [data, setData] = useState([]);
  const {t} = useTranslation();

  const getData = async (text) => {
    let result = [];
    let res = await axios.get(
      "https://api.gyanibooks.com/library/search/?q=" + text
    );
    await res.data.results.map((book) => {
      result.push(book.title);
    });
    setData(result);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="m-10 lg:ml-0 flex flex-col justify-center lg:items-center items:center mt-[40px] lg:mt-[40px]  mb-[2%] lg:w-full">
      <div className="bg-[#ECF1F4] focus-within:bg-white focus:border-[#428CFB] rounded-[18px] items-center justify-between flex flex-row text-[#8C8CA1] focus-within:outline-[#428CFB] focus-within:outline-[3px] outline-none font-[Work Sans] font-[500] rounded-[8px] h-[48px] w-[350px] lg:w-[700px] focus-within:shadow-xl focus-within:border-[#428CFB] ml-0 focus-within:border-[1px solid] focus-within:ring-2 focus-within:ring-indigo-200 text-[#8C8CA1] focus-within::outline-[#428CFB] focus-within:outline-[3px] outline-none">


        <input
          className="bg-inherit h-[40px] w-full rounded-[18px] outline-none"
          value={searchBarText}
          placeholder={t('Search by author, ISBN, title or topic')}
          onClick={(e) => e.preventDefault()}
          style={{
            paddingLeft: 30,
            fontSize: 14,
          }}
          inputprops={{ "aria-label": "search" }}
          onChange={(e) => {
            getData(e.target.value);
            setSearchBarText(e.target.value);
          }}
          list="books"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <SearchIcon
            onClick={() => {
              setDiscovered(searchBarText);
              setSearchBarText('');
              setCount(true);
            }}
            fontSize="small"
            className="mr-[30px] "
          />
        </div>
      </div>
      <div className="flex justify-center items-center w-[80%]">
      <ul id="books" className="!bg-[#ECF1F4] mt-5 w-[80%] rounded-lg flex flex-col justify-center items-center ">
        {searchBarText.length > 0 &&
          data
            .map((opt, i) => {
              return (
                <li
                  className="p-1 w-full hover:opacity-[.5]" style={{borderBottom:'0.5px solid gray'}}
                  onClick={(e) => {setSearchBarText(opt);e.target.style.display='none'}}
                  key={i}
                >
                  {opt}
                </li>
              );
            })
            .slice(0, 4)}
      </ul>
      </div>
      {showButton && (
        <div className="flex justify-center items-center w-full lg:pr-2">
          <button
            onClick={() => {
              setDiscovered(searchBarText);
              setSearchBarText('');
              setCount(true);
            }}
            className="h-[48px] rounded-[8px] w-[109px] hover:bg-[#EFEFFD] text-[16px] border-2 font-[700] leading-[19px] text-[#428CFB] outline-none focus:outline-4 focus:outline-[#31D0AA] shadow-lg scrollbar-hide"

          >
            Lets Go
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;