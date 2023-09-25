import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ReactComponent as ReactLogo } from "../../components/LoginPage/login.svg";
import { useTranslation } from "react-i18next";
import { engQuotes, hinQuotes, kanQuotes } from "./Quotes";
import i18next from "i18next";
import Typewriter from "typewriter-effect";
import { Fade } from "react-reveal";
import {useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  
} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTracking } from 'react-tracking';
import './animation.css'



function HomeLanding() {
  let navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [index, setIndex] = useState(null);
  const [dailogue, setdailogue] = useState("false");
  const user = JSON.parse(localStorage.getItem("user"));
  const { t } = useTranslation();
  const { Track, trackEvent,getTrackingData} = useTracking({ page: 'HomeLanding' });
  

  useEffect(() => {
    async function getData() {
      setdailogue(localStorage.getItem("first_time_user"))
      const currentLanguage = i18next.language;
      if (currentLanguage === "en") {
        setQuotes(await engQuotes);
      } else if (currentLanguage === "hi") {
        setQuotes(await hinQuotes);
      } else if (currentLanguage === "ka") {
        setQuotes(await kanQuotes);
      } else {
        const result = await axios.get("https://type.fit/api/quotes");
        setQuotes(await result.data.slice(0.1));
      }
      setIndex(Math.floor(Math.random() * 19));
    }
    getData();
  }, []);

  return (
    <div className="lg:h-screen flex flex-col items-center justify-center text-center w-full">
      <h1
        className="text-[24px] lg:text-[40px] text-black text-left font-[700] w-full px-5 mt-10"
        style={{ fontFamily: "Work Sans" }}
      >
        <Fade top>
          <span className="text-[#FFD88D] w-full">
          {t("Hey")} {user.username}
          </span>
        </Fade>
        <Fade bottom>
          <p
            className="w-full text-[20px] text-left"
            style={{ fontFamily: "Work Sans" }}
          >
            {t("Here's a Quote for you,")}
          </p>
        </Fade>
      </h1>
      <>
      {
        dailogue=="true" ? <Tooltip open={dailogue=="true"}   placement='bottom'
        arrow title={<div className=" rounded-lg"><p className=" text-white text-base  max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Welcome to Gyani! Are you ready for your writing adventure? Jump aboard! Let's start the tutorial
          </p>
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
      <button  style={{
                            backgroundColor:"#428CFB",
                            color: "white"
                          }} className="pulse border border-transparent rounded-lg  flex flex-row justify-center items-center space-x-2 py-2  "  onClick={() => {
             setdailogue("false")
             let path = `/dashboard/mynotes`;
             navigate(path);
            }}>
              <div className="flex flex-row ">
                           <p className="text-[16px] font-[700] pl-3 px-1 max-[645px]:px-1  max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>New</p>
                           <p className="text-[16px] font-[700] pr-3 max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>Note &rarr;</p>
                           </div>
</button>
</Tooltip> :<button  style={{
                            backgroundColor:"#428CFB",
                            color: "white"
                          }} className="border border-transparent rounded-lg  flex flex-row justify-center items-center space-x-2 py-2  " onClick={() => {
             let path = `/dashboard/mynotes`;
             navigate(path, { state: { ordertonewnotes: true } });
            }}>
              <div className="flex flex-row">
                           <p className="text-[16px] font-[700] pl-4 px-1 max-[645px]:px-1  max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>New</p>
                           <p className="text-[16px] font-[700] pr-4 max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>Note &rarr;</p>
                           </div>
</button>
      }
      </>
       
      <div className="text-gray-600 body-font w-full flex flex-col justify-center items-center">
        <Fade left>
          <div className="container px-5 py-24 lg:pt-0 w-full mx-auto">
            <div className="flex justify-center item-center flex-wrap -m-4">
              <div className="p-4 w-full lg:w-2/3">
                <div
                  className="h-full bg-gray-100 p-8 w-full hover:shadow-xl shadow-sky-400 hover:rounded-none"
                  style={{
                    borderBottomLeftRadius: "50px",
                    borderTopRightRadius: "50px",
                    transition: ".8s",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="block w-5 h-5 text-gray-400 mb-4"
                    viewBox="0 0 975.036 975.036"
                  >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                  </svg>
                  <div className=" mb-6">
                    <p
                      className="w-full text-[30px]"
                      style={{ fontFamily: "Work Sans" }}
                    >
                      {index !== null && (
                        <Typewriter
                          options={{
                            strings: quotes[index].text || quotes[index],
                            autoStart: true,
                            loop: false,
                            deleteSpeed: 100000000000,
                          }}
                        />
                      )}

                      {/* {index !== null && (quotes[index].text || quotes[index])} */}
                    </p>
                  </div>
                  <a className="inline-flex items-center">
                    <span className="flex-grow flex flex-col pl-4 h-12">
                      <span
                        className=" text-gray-900 text-[20px]"
                        style={{ fontFamily: "Work Sans" }}
                      >
                        {index !== null &&
                        quotes[index].author !== "null" &&
                        quotes[index].author !== undefined
                          ? quotes[index].author !== "null" &&
                            "- " &&
                            quotes[index].author
                          : "-------"}
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        <div className="lg:h-full lg:w-full mt-20 lg:mt-0 scale-[300%] !h-[20%] object-left-bottom lg:mb-0 mb-10">
        <ReactLogo />
      </div>
      </div>
    </div>
  );
}

export default HomeLanding;
