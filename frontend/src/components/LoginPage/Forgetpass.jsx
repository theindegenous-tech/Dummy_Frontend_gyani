import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import "./Signup.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ReactComponent as ReactLogo } from "./login.svg";
import logo from "../../SVGAvatars/fullLogo.svg";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Forgetpass() {
  // React States
  const [signup, setSignup] = useState(false);
  const [open, setOpen] = useState(false);
  const [open_suc, setopen_suc] = useState(false);
  const [verified, setVerified] = useState(false); //
  const [sentOtp, setSentOtp] = useState(false);
  const [otpSnack, setOtpSnack] = useState(false);

  let { user, setUser } = useContext(UserContext);
  const handleSubmit = async (e) => {
    //Prevent page reload
    e.preventDefault();
    var { email, password } = document.forms[0];
    try {
         await axios.post(
          "https://api.gyanibooks.com/forgot_password/",
          {
            'email':email.value,
            'new_password':password.value
          } );
          alert("Password updated");
    } catch (error) {
      console.log(error)
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    // setUser(userDetails.data)
    setOpen(false);
  };
  const handleClose_success = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    open_suc(false);
  };

  const vertical = "top";
  const horizontal = "right";

  

  const resendOtp = async () => {
    setVerified(false);
    setSentOtp(false);
    var { email } = document.forms[0];
    let data = JSON.stringify({
      email: email.value,
    });

    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "https://api.gyanibooks.com/send_forgot_otp/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    await axios.request(config).then((response) => {
      if (response.data.message === "OTP sent") {
        setSentOtp(true);
        setOtpSnack(true);
      }
    });
    // console.log(res);
  };
  const verifyOtp = async () => {
    var { email, otp } = document.forms[0];
    console.log(email, otp);
    let data = JSON.stringify({
      email: email.value,
      otp: otp.value,
    });

    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "https://api.gyanibooks.com/verify_otp/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    await axios.request(config).then((response) => {
      console.log(response)
      if (response.data.message === "OTP verified") {
        setVerified(true);
        setOtpSnack(true);
      }
    });
    // console.log(res);
  };

  let navigate = useNavigate();
  const handleClick = () => {
    let path = `/login`;
    navigate(path);
  };

  

  return  (
    <>
      <div className="px-[20px] w-full scrollbar-hide">
        <div className="flex lg:flex-row flex-col items-center justify-between">
          <h1 className="flex items-center text-center h-[75px] !font-[1000] font-sans text-[64px] leading-[75px] mt-[24px] tracking[-0.02em] text-[#0E0E2C] ">
            {/* <a href="/">Gyani</a> */}
            <img src={logo} />
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center lg:mt-[54px] h-[75px] w-ful mt-20">
          <h2 className="font-[Work Sans] text-[40px] font-[700] leading-[47px] tracking-[-0.02em]">
            Update your password
          </h2>
        </div>
        <div className="flex mx-2 lg:w-full items-center flex-col justify-center text-center gap-[8px] mt-[28px]">
          <form className="flex flex-col items-center w-full">
            <div className="w-full lg:w-[659px] flex flex-row justify-between items-center h-[48px] mt-[10px] lg:mt-[22px]">
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS"
                disabled={verified}
                className="w-4/5  h-[48px] pl-[10px]  rounded-[8px] bg-[#ECF1F4] outline-none focus:outline-4 focus:outline-blue-400 border-blue"
                style={{
                  boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
                }}
              />
              <Button variant="contained" onClick={() => resendOtp()}>
                {!sentOtp ? 'Send' : 'Resend'} OTP
              </Button>
            </div>

            
            {sentOtp && (
              <div className="w-full lg:w-[659px] flex flex-row justify-between items-center h-[48px] mt-[10px] lg:mt-[22px]">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP "
                  className="w-4/5  h-[48px] pl-[10px]  rounded-[8px] bg-[#ECF1F4] outline-none focus:outline-4 focus:outline-blue-400 border-blue"
                  style={{
                    boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
                  }}
                />
                <Button variant="contained" onClick={() => verifyOtp()}>
                  Verify OTP
                </Button>
              </div>
            )}
            <input
              type="password"
              name="password"
              placeholder="ENTER NEW PASSWORD"
              className="w-full lg:w-[659px] h-[48px] pl-[10px] mt-[10px] lg:mt-[22px] rounded-[8px] bg-[#ECF1F4] outline-none focus:outline-4 focus:outline-blue-400 border-blue"
              style={{
                boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
              }}
            ></input>
          </form>
          <div className="flext flex-row">
          {verified && (
              
            <button
            className="h-[48px] rounded-[8px] w-[109px] hover:bg-[#EFEFFD] text-[16px] border-2 font-[700] leading-[19px] text-[#428CFB] outline-none focus:outline-4 border-blue-500 focus:outline-[#31D0AA]"
              type="submit"
              onClick={handleSubmit}
            >
              Update
            </button>
          
          )}
          <button
            className="text-green-500 cursor-pointer ml-3 text-[16px] font-[700"
              type="submit"
              onClick={() => navigate("/signin")}
            >
             Login 
            </button>
            </div>
          {/* <Button >Open simple snackbar</Button> */}
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
          >
            <Alert
              severity="error"
              onClose={handleClose}
              sx={{ width: "100%" }}
            >
              Something went wrong
            </Alert>
          </Snackbar>
          <Snackbar
            open={open_suc}
            autoHideDuration={6000}
            onClose={handleClose_success}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
          >
            <Alert
              severity="success"
              onClose={handleClose}
              sx={{ width: "100%" }}
            >
              Updated
            </Alert>
          </Snackbar>
        </div>
        <div className="mt-20 lg:mt-0 scale-[300%] !h-[20%] md:scale-[100%] lg:scale-[100%] object-left-bottom">
          <ReactLogo />
        </div>
        <p className="text-center text-black font-bold mb-4" style={{ fontFamily: "Work Sans",fontSize:12 }}>© Kopili Technologies Pvt Ltd</p>
      </div>

      <Snackbar
            open={otpSnack}
            autoHideDuration={6000}
            onClose={()=>setOtpSnack(false)}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
          >
            <Alert
              severity="success"
              onClose={()=>setOtpSnack(false)}
              sx={{ width: "100%" }}
            >
              {verified ? 'OTP Verified' : sentOtp ? 'OTP Sent' :  ''}
            </Alert>
          </Snackbar>

    </>
  );
}

export default Forgetpass;
