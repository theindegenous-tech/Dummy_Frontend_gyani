import {
  VerifiedRounded,
  UnpublishedRounded,
} from "@mui/icons-material";
import { LinearProgress, Skeleton } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function AiDetection() {
  const inputRef = useRef(null);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [detection, setDetection] = useState(null);
  const [text, settext] = useState(
    "Sample of Attacks applied on extracted facial image  it is shown that the extracted facial images are tested upon various image processing attacks such as"
  );
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

  let user = JSON.parse(localStorage.getItem("user"));

  const getData = async () => {
    setLoading(true);
    const res = await axios.post(
      "https://api.gyanibooks.com/inde_ai_detect/",
      {
        //DATA TO POST
        text: text,
        "userid":user.id
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setDetection((1-res.data.fake)*100);
    // console.log(1-res.data.fake)
    setLoading(false);
    window.scrollTo(0, 500);
  }

  return (
    <div
      className="h-screen flex justify-evenly items-center text-center w-full flex-col overflow-y-scroll scrollbar-hide px-10"
      style={{ fontFamily: "Work Sans" }}
    >
      <div>
        <h1
          className="text-[24px] lg:text-[40px] text-black font-[700]"
          style={{ fontFamily: "Work Sans" }}
        >
          {t("Detect AI Plagiarism")}
        </h1>
        <p
          className="text-black lg:text-[24px]"
          style={{ fontFamily: "Work Sans" }}
        >
          {t("There are no size limits!")}
        </p>
      </div>
      <div className="hidden">
        <p className="text-[20px]">
          {file
            ? t("Here is Your Uploaded File")
            : t("Upload a File / write Text you want to summarize")}
        </p>
        <input
          style={{ display: "none" ,cursor:"none"}}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
        />
      </div>
      {!loading ?
      <textarea
      className="bg-blue-50 rounded-lg outline-none focus:outline-4 focus:outline-blue-400 border-blue-400 h-[340px] text-center pt-10 w-full shadow-lg lg:w-[90%] scrollbar-hide"
      rows={10}
      value={text}
      onChange={(e) => settext(e.target.value)}
      onKeyDown={e=> e.key === 'Enter' && getData()}
      placeholder="Write Text Here"
    ></textarea>
    :
    <div
      className="bg-blue-50 rounded-lg border-blue-400 text-center pt-10 w-full !h-[40%] lg:w-1/2 px-10"
    >
      <Skeleton/>
      <Skeleton/>
      <Skeleton/>
      <Skeleton/>
      <Skeleton/>
    </div>
      }
      <button
        className="h-[48px] rounded-[8px] w-[109px] hover:bg-[#EFEFFD] text-[16px] border-2 font-[700] leading-[19px] text-[#428CFB] outline-none
        focus:outline-4 focus:outline-[#31D0AA] shadow-lg"  
        onClick={() => getData()}
      >
        DETECT
      </button>
      {!result && (
        <div className="flex flex-row gap-2 justify-around items-center w-[50%] lg:w-2/3">
          {detection !== null && (
            <div className="flex flex-col h-auto w-full justify-center items-center">
              <p className=" left-[50%] text-center bg-[#428CFB] w-min p-4 border-1  border-blue-600 rounded-full text-black font-bold m-2">
                {Math.floor(detection)}%
              </p>
              <div className="w-full flex justify-center items-center gap-2">
                <span className="hidden lg:block">{100- Math.floor(detection)}% FAKE</span>
                <UnpublishedRounded color="error" />
                <LinearProgress
                  variant="determinate"
                  className="py-[20px] w-full rounded-full"
                  value={detection}
                  color={`${detection <= 0 ? "error" : "primary"}`}
                />
                <VerifiedRounded color="primary" />{" "}
                <span className="hidden lg:block">{Math.floor(detection)}% REAL</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
