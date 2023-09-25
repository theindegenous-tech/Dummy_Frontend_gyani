import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import img1 from './phonelogo.png'
const axios = require('axios');




function Pricing(props) {
  const navigate = useNavigate();
  const [tab,settab] = useState(0);
  const [transactiondata,settransactiondata] = useState([]);
  const [currentplan,setcurrentplan] = useState([]);
  const [len,setlen] = useState(0);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
      
      let data = JSON.stringify({
          "userid": user.id
        });
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://api.gyanibooks.com/sub_details/',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          settransactiondata(response.data);
          setlen(response.data.length)
          setcurrentplan(response.data[response.data.length-1])
        })
        .catch((error) => {
          console.log(error);
        });
        
    }, []);


  return (
    <div className="flex flex-col scrollbar-hide">
      <section
        className="relative  bg-blueGray-50 overflow-hidden lg:w-full scrollbar-hide"
        style={{ fontFamily: "Work Sans" }}
      >
        <div className="relative z-10 container px-4 mx-auto scrollbar-hide">
          <div className="flex flex-wrap flex-col lg:flex-row justify-center lg:items-center ">
            <div className="w-full md:w-1/2 p-8">
              <div className="md:max-w-md">
                <h2 className="mb-2 lg:mb-8  text-5xl max-[470px]:text-3xl max-[1020px]:mb-5 text-black font-bold font-heading tracking-px-n leading-none">
                  Subscriptions
                </h2>
                <div className="p-9 bg-white rounded-lg drop-shadow-lg">
                  <div className="flex flex-wrap -m-8">
                    <div className="w-full sm:w-1/2 p-8">
                      <span className="mb-2 inline-block text-xl text-black font-bold uppercase tracking-px" style={{fontFamily:"Work Sans"}}>
                        Current Plan
                      </span>
                      <p className="text-gray-500 font-semibold leading-normal" style={{fontFamily:"Work Sans"}}>
                        Best for Startups &amp; Small Businesses
                      </p>
                    </div>
                    <div className="w-full sm:w-1/2 p-8">
                      <div className="sm:max-w-max ml-auto">
                        <p className="font-bold">
                          <span className="text-5xl leading-tight font-bold tracking-px-n" style={{fontFamily:"Work Sans"}}>
                            {parseInt(currentplan.amt)/100}
                          </span>
                          <span className="text-lg text-gray-500 leading-snug tracking-px-n" style={{fontFamily:"Work Sans"}}>
                            /mo
                          </span>
                        </p>
                        <p className="font-medium text-gray-500 leading-relaxed" style={{fontFamily:"Work Sans"}}>
                          Billed anually
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-9 ">
                    <button
                      className="h-[48px] w-full text-center flex flex-row justfy-center items-center rounded-[8px]  bg-blue-500 text-[16px]  
                      leading-[19px] text-white hover:bg-blue-700 shadow-lg font-bold !px-4"
                      style={{
                        fontFamily: "Work Sans",
                      }}
                      onClick={() => {
                                                navigate("/payable",{
                                                  state : {
                                                    amount: 100,
                                                    credits:750000
                                                  }
                                                });
                                              }}
                    >
                      Upgrade Plan &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8  ">
              <div
                className="md:max-w-md mx-auto "
                style={{ fontFamily: "Work Sans" }}
              >
                
                <div className="p-9 bg-white rounded-lg drop-shadow-lg max-[1000px]:mt-2 mt-20">
                  <div className="flex flex-wrap -m-8">
                    <div className="w-full sm:w-1/2 p-8">
                      <span className="mb-2 inline-block text-xl text-black font-bold uppercase tracking-px" style={{fontFamily:"Work Sans"}}>
                        Payment method
                      </span>
                      <div className="flex flex-row">
                      <p className="text-gray-500 font-semibold leading-normal" style={{fontFamily:"Work Sans"}}>
                        Credits left 
                      </p>
                      <p className="text-red-700 font-bold leading-normal ml-2" style={{fontFamily:"Work Sans"}}>
                        {user.credits_left}
                      </p>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 p-8">
                      <div className="sm:max-w-max ml-auto">
                      <img  src={img1} style={{Width : 75,height:75 }}></img>
                        {/* <p className="font-medium text-gray-500 leading-relaxed" style={{fontFamily:"Work Sans"}}>
                          Expiry : 09/25
                        </p> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-5">
                    <button
                      className="h-[48px] w-full text-center flex flex-row justfy-center items-center rounded-[8px]  bg-blue-500 text-[16px] font-[700] 
                      leading-[19px] text-white hover:bg-blue-700 shadow-lg  !px-4"
                      style={{
                        fontFamily: "Work Sans",
                      }}
                      
                    >
                      Edit &rarr;
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font overflow-hidden scrollbar-hide" style={{fontFamily:"Work Sans"}}>
        <div className="container px-5 py-2 mx-auto" style={{fontFamily:"Work Sans"}}>
        <div className="flex flex-col text-center w-full mb-6">
           <h1 className="sm:text-4xl text-3xl  title-font font-bold mb-1 text-gray-900" style={{fontFamily:"Work Sans"}}>
             Pricing
            </h1>            
            <div className="flex mx-auto bg-[#EFEFFD] overflow-hidden mt-4">
               <button style={{
                               backgroundColor:
                                 tab == 0 ? "#428CFB" : "#EFEFFD",
                               color: tab==0 ? "white":"#428CFB"
                             }} className=" border border-transparent rounded-lg  flex flex-row justify-center items-center space-x-2 py-2  w-full" onClick={() => {
                        settab(0)
                      }}>
               <p className="font-bold  px-4"> Plans</p>
              </button>
              {/* <button style={{
                               backgroundColor:
                                 tab == 1 ? "#428CFB" : "#EFEFFD",
                               color: tab==1 ? "white":"#428CFB"
                             }} className=" border border-transparent rounded-lg  flex flex-row justify-center items-center space-x-2 py-2  w-full"
              onClick={() => {
                settab(1);
              }}><p className="font-bold  px-2">Annually</p></button> */}
              {/* <button className="border border-transparent hover:border-blue-700 bg-blue-500 hover:bg-blue-700 text-white  flex flex-row justify-center items-center space-x-2 py-2  w-full" onClick={() => {
                        settab(2)
                      }}>
                <p className="font-bold  px-2">Offers</p>
              </button> */}
            </div>
          </div>
          {
            tab==0 && (
              <>
              <div className="flex flex-wrap justify-center -m-4  ">
            <div className="p-5 xl:w-[30%] md:w-1/2 w-full  max-[470px]:w-3/4">
              <div className="h-full p-8 bg-white rounded-lg drop-shadow-md border-2  flex flex-col relative overflow-hidden" >
                <h1 className="text-4xl text-red-400 font-bold mb-1  leading-none" style={{fontFamily:"Work Sans"}}>
                 Free
                </h1>
                <h2 className="text-xl tracking-widest title-font text-black mb-4 font-bold" style={{fontFamily:"Work Sans"}}>
                Gyani Lite
                </h2>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  100000 words
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Limited WhatsApp
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Access to notes
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Trial for AI Ink 
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Trial for AI Talk
                </p>
                <p className="flex items-center text-black font-bold" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  1 language
                </p>
                <button className="border border-transparent mt-auto hover:border-blue-700 font-bold bg-blue-500 hover:bg-blue-700 text-white  flex flex-row justify-center items-center space-x-2 py-2 rounded w-full px-2"
                 onClick={() => {
                  navigate("/payable",{
                    state : {
                      amount: 0,
                      credits:100000
                    }
                  });
                }}
                 style={{fontFamily:"Work Sans"}}>
                  Subscribe
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                {/* <p className="text-xs text-gray-500 mt-3" style={{fontFamily:"Work Sans"}}>
                  Literally you probably haven't heard of them jean shorts.
                </p> */}
              </div>
            </div>
            <div className="p-5 xl:w-[30%] md:w-1/2 w-full max-[470px]:w-3/4">
              <div className="h-full p-8 rounded-lg border-2 drop-shadow-md bg-white flex flex-col relative overflow-hidden">
                {/* <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl" style={{fontFamily:"Work Sans"}}>
                  POPULAR
                </span> */}
                <h1 className="text-4xl text-red-400 font-bold leading-none flex items-center  mb-1 ">
                  <span style={{fontFamily:"Work Sans"}}>$40 </span>
                  <span className="text-lg ml-1 font-normal text-gray-500" style={{fontFamily:"Work Sans"}}>
                   one time
                  </span>
                </h1>
                <h2 className="text-xl tracking-widest text-black title-font mb-4 font-bold" style={{fontFamily:"Work Sans"}}>
                Gyani Plus
                </h2>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0" style={{fontFamily:"Work Sans"}}>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  750000 words
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Whatsapp bot
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Access to notes
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  AI Ink 
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  AI Talk Limited
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Connect Google Drive, Dropbox and Microsoft 
                </p>
                <p className="flex items-center text-black font-bold mb-6" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  10+  languages
                </p>
                <button className="flexborder border-transparent mt-auto hover:border-blue-700 font-bold bg-blue-500 hover:bg-blue-700 text-white  flex flex-row justify-center items-center space-x-2 py-2 rounded w-full px-2"
                 onClick={() => {
                  navigate("/payable",{
                    state : {
                      amount: 40,
                      credits:750000
                    }
                  });
                }}
                 style={{fontFamily:"Work Sans"}}>
                  Subscribe
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                {/* <p className="text-xs text-gray-500 mt-3" style={{fontFamily:"Work Sans"}}>
                  Literally you probably haven't heard of them jean shorts.
                </p> */}
              </div>
            </div>
            <div className="p-5 xl:w-[30%] md:w-1/2 w-full max-[470px]:w-3/4">
              <div className="h-full p-8 rounded-lg border-2 drop-shadow-md bg-white flex flex-col relative overflow-hidden">
              <h1 className="text-4xl text-red-400 font-bold leading-none flex items-center  mb-1 " style={{fontFamily:"Work Sans"}}>
                  <span>$120</span>
                  <span className="text-lg ml-1 font-normal text-gray-500">
                    /year
                  </span>
                </h1>
                <h2 className="text-xl tracking-widest text-black title-font  mb-4 font-bold" style={{fontFamily:"Work Sans"}}>
                Maha Gyani 
                </h2>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Unlimited Words
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Whatsapp bot
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Access to notes
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  AI Ink 
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  AI Talk Unlimited
                </p>
                <p className="flex items-center text-black font-bold mb-2" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Third party integrations with API
                </p>
                <p className="flex items-center text-black font-bold mb-6" style={{fontFamily:"Work Sans"}}>
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-lime-400 text-green-700 font-bold rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  20+  languages
                </p>
                <button className="border border-transparent mt-auto hover:border-blue-700 font-bold bg-blue-500 hover:bg-blue-700 text-white  flex flex-row justify-center items-center space-x-2 py-2 rounded w-full px-2"
                 onClick={() => {
                  navigate("/payable",{
                    state : {
                      amount: 120,
                      credits:750000
                    }
                  });
                }}
                >
                  Subscribe
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                {/* <p className="text-xs text-gray-500 mt-3">
                  Literally you probably haven't heard of them jean shorts.
                </p> */}
              </div>
            </div>
          </div>
              </>
            )
          }
           {/* {
             tab==1 && (
              <>
              <div className="flex flex-wrap -m-4 max-[470px]:ml-10">
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full max-[470px]:w-3/4">
              <div className="h-full p-6 rounded-lg border-2 drop-shadow-md bg-white flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-bold">
                  START
                </h2>
                <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                  Free
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Vexillologist pitchfork
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Tumeric plaid portland
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Mixtape chillwave tumeric
                </p>
                <button className="border border-transparent mt-auto hover:border-blue-700 font-bold bg-blue-500 hover:bg-blue-700 text-white  flex flex-row justify-center items-center space-x-2 py-2 rounded w-full px-2"
                 onClick={() => {
                  navigate("/payable",{
                    state : {
                      amount: 0
                    }
                  });
                }}
                >
                  Subscribe
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Literally you probably haven't heard of them jean shorts.
                </p>
              </div>
            </div>
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full max-[470px]:w-3/4">
              <div className="h-full p-6 rounded-lg border-2 drop-shadow-md bg-white border-indigo-500 flex flex-col relative overflow-hidden">
                <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                  POPULAR
                </span>
                <h2 className="text-sm tracking-widest title-font mb-1 font-bold">
                  PRO
                </h2>
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>$138</span>
                  <span className="text-lg ml-1 font-normal text-gray-500">
                    /mo
                  </span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Vexillologist pitchfork
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Tumeric plaid portland
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Hexagon neutra unicorn
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Mixtape chillwave tumeric
                </p>
                <button className="flexborder border-transparent mt-auto hover:border-blue-700 font-bold bg-blue-500 hover:bg-blue-700 text-white  flex flex-row justify-center items-center space-x-2 py-2 rounded w-full px-2"
                 onClick={() => {
                  navigate("/payable",{
                    state : {
                      amount: 138
                    }
                  });
                }}
                >
                  Subscribe
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Literally you probably haven't heard of them jean shorts.
                </p>
              </div>
            </div>
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full max-[470px]:w-3/4">
              <div className="h-full p-6 rounded-lg border-2 drop-shadow-md bg-white flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-bold">
                  BUSINESS
                </h2>
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>$156</span>
                  <span className="text-lg ml-1 font-normal text-gray-500">
                    /mo
                  </span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Vexillologist pitchfork
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Tumeric plaid portland
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Hexagon neutra unicorn
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Vexillologist pitchfork
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Mixtape chillwave tumeric
                </p>
                <button className="border border-transparent mt-auto hover:border-blue-700 font-bold bg-blue-500 hover:bg-blue-700 text-white  flex flex-row justify-center items-center space-x-2 py-2 rounded w-full px-2"
                 onClick={() => {
                  navigate("/payable",{
                    state : {
                      amount: 156
                    }
                  });
                }}
                >
                  Subscribe
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Literally you probably haven't heard of them jean shorts.
                </p>
              </div>
            </div>
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full max-[470px]:w-3/4">
              <div className="h-full p-6 rounded-lg border-2 drop-shadow-md bg-white flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-bold">
                  SPECIAL
                </h2>
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>$172</span>
                  <span className="text-lg ml-1 font-normal text-gray-500">
                    /mo
                  </span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Vexillologist pitchfork
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Tumeric plaid portland
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Hexagon neutra unicorn
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Vexillologist pitchfork
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Mixtape chillwave tumeric
                </p>
                <button className="border border-transparent mt-auto hover:border-blue-700 font-bold bg-blue-500 hover:bg-blue-700 text-white  flex flex-row justify-center items-center space-x-2 py-2 rounded w-full px-2"
                 onClick={() => {
                  navigate("/payable",{
                    state : {
                      amount: 172
                    }
                  });
                }}
                >
                  Subscribe
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Literally you probably haven't heard of them jean shorts.
                </p>
              </div>
            </div>
          </div>
              </>
            )
          } */}
        </div>
      </section>
      <div className="flex flex-col text-center w-full mb-2 mt-2">
             <p className="sm:text-4xl max-[470px]:text-xl text-3xl font-bold title-font m-2 text-gray-900" style={{fontFamily:"Work Sans"}}>
               Transaction history
             </p>
             </div>
             {
              len==0 ? <p className="text-3xl max-[470px]:text-2xl text-gray-900 text-center" style={{fontFamily:"Work Sans"}}>
              No item available
            </p>:<div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">#</th>
                          <th scope="col" className="px-6 py-4">Amount</th>
                          <th scope="col" className="px-6 py-4">Date</th>
                          <th scope="col" className="px-6 py-4">Transaction Id</th>
                          <th scope="col" className="px-6 py-4">Status</th>
                          <th scope="col" className="px-6 py-4">Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                      {transactiondata.map((item, index) => (
                        <tr key={index} className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.amt}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.date_time}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.tx_id}</td>
                          <>
                          {
                           item.payment_confimation ? <td className="whitespace-nowrap text-blue-700 px-6 py-4">Success</td>: 
                           <td className="whitespace-nowrap text-red-700 px-6 py-4">Failed</td>
                          }
                          </>
                          <td className="whitespace-nowrap px-6 py-4">download</td>
                        </tr>
                      ))}
                      </>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            }
    </div>
  );
}

export default Pricing;



