import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import Cover_pdf from "../LoginPage/Cover_pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

function BookDescription() {
  let browseclick = 0;
  const nav = 0;
  let navigate = useNavigate();
  let path = "/readbook";
  useEffect(() => {
    if (nav !== 0) {
      navigate(path);
    }
  }, []);

  const handleClick = () => {
    browseclick = browseclick + 1;
    navigate(path);
  };

  const { readingbook } = useContext(UserContext);
  return readingbook ? (
    <div style={{fontFamily:'Work Sans'}}
     className="flex w-full lg:h-[512px] flex-col overflow-hidden lg:flex-row justify-center items-center order-1 flex-grow-0 pr-[8px] lg:gap-[48px] border border-[#ECF1F4] hover:bg-[#EFEFFD]  mb-10 rounded-[8px] scrollbar-hide">
      <div
        className="flex flex-col lg:justify-center lg:items-start justify-center items-center"
      >
        <div className="w-auto h-[28px] mt-[48px] ml-[24px]">
          <h3 className="font-[Work Sans] text-[24px] font-[600] leading-[28.15px] tracking-[-2%] text-[#0e0e2c]"
          >
            {readingbook.title}
          </h3>
        </div>
        <div className="w-[104px] h-[44px] mt-[16px] ml-[24px]">
          <p className="font-[Work Sans] text-[16px] font-[500] leading-[22.4px] tracking-[-2%] text-[#4a4a68]" >
            <br />
            {readingbook.year}
          </p>
        </div>
        <div className="-tracking-[2%] gap-[16px] lg:w-[425px] h-auto mt-4 ml-6 flex flex-col items-start flex-none order-2 flex-grow-0 p-0 text-base font-medium leading-5 text-gray-700"s>
          Book Description Long Version....... Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
        <button
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            order: 3,
            padding: "12px 24px",
            width: "118px",
            height: "48px",
            background: "#EFEFFD",
            borderRadius: "8px",
            marginTop: "16px",
            marginLeft: "24px",
            fontFamily: "Work Sans",
            fontSize: "16px",
            fontWeight: "700",
            lineHeight: "18.77px",
            letterSpacing: "4%",
            color: "#428CFB",
          }}
          onClick={handleClick}
        >
          BROWSE
        </button>
      </div>
      <div className="lg:mt-20"><Cover_pdf url={readingbook.url} pgno={1} /></div>
    </div>
  ) : (
    <></>
  );
}

export default BookDescription;
