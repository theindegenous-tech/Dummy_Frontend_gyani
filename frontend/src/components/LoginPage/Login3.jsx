import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/AuthContext";
import { ReactComponent as ReactLogo } from "./login.svg";
import axios from "axios";
import "./Signup.css";
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import logo from "../../SVGAvatars/fullLogo.svg";

// // import Pdf from "react-pdf";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login_3() {

  const [open_err, setOpenErr] = React.useState(false);
  const [open_suc, setopen_suc] = useState(false);

  // const { state } = useLocation();
  // const { email } = state;
  let { user, setUser } = useContext(UserContext);

  let navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErr(false);
  };
  const handleClose_success = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    open_suc(false);
  };

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  const handleSubmit = async (e) => {
    //Prevent page reload
    e.preventDefault();

    var { email, password } = document.forms[0];
    try {
      let res = await axios.post("https://api.gyanibooks.com/login/", {
        email: email.value,
        password: password.value,
      });
      console.log(res)
      localStorage.setItem("token", res.data[1]["access"]);
      localStorage.setItem("user", JSON.stringify(res.data[0]));
      localStorage.setItem("first_time_user", res.data[2]);
      setopen_suc(true);
      setUser(res.data);
      
      window.location = "/dashboard/home";
    } catch (error) {
      setOpenErr(true);
      console.log(error);
    }
  };

  const handleClick = () => {
    let path = `/signup`;
    navigate(path);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className="ml-[20px] mr-[20px]">
      <div className="flex lg:flex-row flex-col items-center justify-between">
        <h1 className="flex items-center text-center h-[75px] !font-[1000] font-sans text-[64px] leading-[75px] mt-[24px] tracking[-0.02em] text-[#0E0E2C] ">
          {/* <a href="/">Gyani</a> */}
          <img src={logo} />
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center text-center lg:mt-[54px] h-[75px] mt-20">
        <h2 className="font-[Work Sans] text-[40px] font-[700] leading-[47px] tracking-[-0.02em]">
          Enter your password to get started.
        </h2>
        <h3 className="font-[Work Sans] text-[24px] font-[500] leading-[28px] text-[#0E0E2C]">
          Just a few more steps and you're finished!
        </h3>
        <h3 className="font-[Work Sans] text-[24px] font-[500] leading-[28px] text-[#0E0E2C]">
          We hate paperwork, too.
        </h3>
      </div>
      <div className="flex items-center flex-col justify-center text-center gap-[8px] mt-[28px] w-full">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <input
              type="email"
              name="email"
              placeholder="EMAIL ADDRESS"
              className={`lg:w-[659px] w-[300px] h-[48px] mt-[22px] pl-2 outline-none rounded-[8px] bg-[#ECF1F4] shadow-[inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)] order-1  focus:outline-4 ${open_err && 'outline-red-400 border-red'} focus:outline-blue-400 border-red`}
            ></input>
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              className={`lg:w-[659px] w-[300px] h-[48px] mt-[22px] pl-2 outline-none rounded-[8px] bg-[#ECF1F4] shadow-[inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)] order-1  focus:outline-4 ${open_err && 'outline-red-400 border-red'} focus:outline-blue-400 border-red`}
            ></input>
            {open_err && !open_suc && 
            <input
            type="text"
            name="status"
            placeholder="Status"
            disabled
            className="lg:w-[659px] w-[300px] text-red-500 text-center h-[48px] mt-[22px] pl-2 outline-none rounded-[8px] bg-[#ECF1F4] shadow-[inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)] order-1 outline-none focus:outline-4 ${open_err ? 'focus:outline-red-400 border-blue' : 'focus:outline-red-400 border-red'}"
            value="Something Went Wrong"
          />}
           {open_suc && 
            <input
            type="text"
            name="status"
            placeholder="Status"
            disabled
            className="lg:w-[659px] w-[300px] text-green-500 text-center h-[48px] mt-[22px] pl-2 outline-none rounded-[8px] bg-[#ECF1F4] shadow-[inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)] order-1 outline-none focus:outline-4 ${open_err ? 'focus:outline-red-400 border-blue' : 'focus:outline-red-400 border-red'}"
            value="Login Successful"
          />}
          </div>
          <div onClick={() => navigate("/forget")} className="mt-3">
            <span className="text-green-500 cursor-pointer">Forgot Password</span>
          </div>
          <div onClick={() => navigate("/signup")} className="mt-2">
            New User ?{" "}
            <span className="text-green-500 cursor-pointer">Sign up</span>
          </div>
          <div className="flex w-[659px] flex-col h-[78px] items-center justify-center text-center">
            <button
              className="h-[48px] rounded-[8px] w-[109px] hover:bg-[#EFEFFD] text-[16px] border-2 font-[700] leading-[19px] text-[#428CFB] outline-none focus:outline-4 border-blue-500 focus:outline-[#31D0AA]"
              type="submit"
              onClick={handleSubmit}
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
      <div className="mt-20 lg:mt-0 scale-[300%] !h-[20%] md:scale-[100%] lg:scale-[100%] object-left-bottom">
        <ReactLogo />
      </div>
    </div>
  );
}

export default Login_3;
