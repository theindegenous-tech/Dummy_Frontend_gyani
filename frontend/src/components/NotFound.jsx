import React from "react";
import { useNavigate } from "react-router-dom";
import "./nfCss.css";

function NotFound() {
  const navigate = useNavigate();
  return (
      <div className=" w-full rounded-[10px] flex items-center justify-center min-h-screen bg-indigo-500  bg-fixed bg-cover bg-bottom error-bg">
        <div className="container h-[100%]">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
              <div className="relative ">
                <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
                  <span>4</span>
                  <span>0</span>
                  <span>4</span>
                </h1>
                <span className="absolute  top-0   -ml-12  text-gray-300 font-semibold">
                  Oops!
                </span>
              </div>
              <h5 className="text-gray-300 font-semibold -mr-10 -mt-3">
                Page not found
              </h5>
              <p className="text-gray-100 mt-2 mb-6">
                we are sorry, but the page you requested was not found
              </p>
              <button
                className="h-[48px] rounded-[8px] w-[120px] bg-[#31D0AA] text-[16px] font-[700] 
            leading-[19px] text-white"
                onClick={()=>navigate('/dashboard/home')}
                style={{
                  fontFamily: "Work Sans",
                  boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default NotFound;
