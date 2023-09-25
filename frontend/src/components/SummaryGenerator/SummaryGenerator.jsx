import { DescriptionOutlined } from "@mui/icons-material";
import { LinearProgress, Skeleton } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Fade } from "react-reveal";
import Typewriter from "typewriter-effect";

export default function SummaryGenerator() {
  const inputRef = useRef(null);
  const [file, setFile] = useState("");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [text, settext] = useState("");
  const [edit, setEdit] = useState(false);
  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };
  const { t } = useTranslation();

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setFile(event.target.result);
    };
    reader.readAsDataURL(fileObj);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "90%",
    width: "90%",
    backgroundColor: "#1D0E07",
    color: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  async function getData() {
    document.getElementById('textarea').disabled = true;
    setLoading(true);
    const res = await axios.post(
      "https://bot.gyanibooks.com/api/inde_summary/",
      {
        //DATA TO POST
        text: text,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setResult(res.data);
    setLoading(false);
    document.getElementById('textarea').disabled = false;
  }

  return (
    <div
      className="h-screen flex justify-around items-center py-10 text-left w-full flex-col overflow-y-scroll px-5 scrollbar-hide"
      style={{ fontFamily: "Work Sans" }}
    >
     <Fade left>
     <div className="text-left w-full mt-20 lg:mt-0">
        <h1
          className="text-[24px] lg:text-[40px] text-black font-[700]"
          style={{ fontFamily: "Work Sans" }}
        >
          {t("Summarize a Document")}
        </h1>
        <p
          className="text-black lg:text-[24px]"
          style={{ fontFamily: "Work Sans" }}
        >
          {t("There are no size limits!")}
        </p>
      </div>
     </Fade>
      <div className="hidden">
        <p className="text-[20px]">
          {file
            ? t("Here is Your Uploaded File")
            : t("Upload a File / write Text you want to summarize")}
        </p>
        {!file && (
          <div className="flex justify-center items-center flex-row w-full">
            <button
              onClick={handleClick}
              className="mt-[33px] h-[48px] rounded-[8px] w-[109px] hover:bg-[#EFEFFD] text-[16px] font-[700] 
            leading-[19px] text-[#428CFB] "
            >
              {t("BROWSE")}
            </button>
            {/* <div className="m-2 "/>
           <button
           onClick={()=>setEditModal(!editModal)}
           className="mt-[33px] h-[48px] rounded-[8px] w-[109px] hover:bg-[#EFEFFD] text-[16px] font-[700] 
           leading-[19px] text-[#428CFB]"
         >
           Write Text
         </button> */}
          </div>
        )}
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
        />
      </div>
      {uploading && (
        <div className="flex h-[20%] lg:h-[10%] flex-col justify-between items-center">
          <div>
            <DescriptionOutlined className="!text-[2em]" />
          </div>
          <div className="lg:text-[20px]">
            <div className="text-[#6979F8]" style={{ fontFamily: "Work Sans" }}>
              Uploading {`fileName`} 90/100%
            </div>
            <div>Patience is a Virtue</div>
          </div>
          <div>
            <button
              onClick={handleClick}
              className="w-[127px] h-[25px] bg-[#fff] border-[1px] rounded-[8px] text-black "
            >
              <LinearProgress
                className="!h-full rounded-[8px] !w-full"
                variant="determinate"
                value={90}
              />
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row w-full justify-between items-center pt-10"> 
      <Fade left>
      <div className="w-full flex flex-col h-auto justify-center items-center"> 
      <textarea
        className="bg-blue-50 rounded-lg outline-none focus:outline-4 focus:outline-blue-400 border-blue-400 h-[340px] text-center pt-10 w-full shadow-lg lg:w-[90%]  scrollbar-hide"
        rows={10}
        value={text}
        onChange={(e) => settext(e.target.value)}
        onKeyUp={(e)=> e.key === 'Enter' && getData()}
        placeholder="Write Text Here"
        id="textarea"
      ></textarea>

      <button
        className="h-[48px] rounded-[8px] w-[109px] mt-5 hover:bg-[#EFEFFD] text-[16px] border-2 font-[700] leading-[19px] text-[#428CFB]
        outline-none focus:outline-4 focus:outline-[#31D0AA] shadow-lg"
        onClick={() => getData()}
      >
        {t("SUMMARIZE")}
      </button>
      </div>
      </Fade>
      <div className="mt-10 lg:mt-0"/>
     <Fade right>
     <div className="w-full flex flex-col h-auto justify-center items-center"> 
      { loading ?
      <div className="pl-10 flex flex-col justify-start items-start bg-blue-50 rounded-lg border-blue-400 h-[340px] text-center pt-10 w-full  lg:w-[90%]" >
      <Skeleton animation="wave" className="w-[90%]" />
      <Skeleton animation="wave" className="w-[50%]" />
      <Skeleton animation="wave" className="w-[80%]" />
      <Skeleton animation="wave" className="w-[90%]" />
      <Skeleton animation="wave" className="w-[70%]" />
      </div>
      :
      <div
        className="bg-blue-50 rounded-lg outline-none focus:outline-4 focus:outline-blue-400 border-blue-400 h-[340px] text-center pt-10 w-2/3 shadow-lg lg:w-[90%]"
        disabled={!edit}
      >
        <Typewriter
            options={{
              strings: result,
              autoStart: true,
            }}
          />
      </div>
      }

      <button
        className="h-[48px] rounded-[8px] w-[109px] hover:bg-[#EFEFFD] text-[16px] border-2 font-[700] leading-[19px] text-[#428CFB]
        outline-none focus:outline-4 focus:outline-[#31D0AA] mt-5 shadow-lg"
        onClick={() => setEdit(!edit)}
      >
        {t('COPY')}
      </button>
      </div>
     </Fade>
      </div>
      <div>
      </div>
    </div>
  );
}
