import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import "./Signup.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ReactComponent as ReactLogo } from "./login.svg";
import Carousel from "react-multi-carousel";
import image1 from "../../SVGAvatars/Avatar-01.svg";
import image2 from "../../SVGAvatars/Avatar-02.svg";
import image3 from "../../SVGAvatars/Avatar-03.svg";
import image4 from "../../SVGAvatars/Avatar-04.svg";
import image5 from "../../SVGAvatars/Avatar-05.svg";
import image6 from "../../SVGAvatars/Avatar-06.svg";
import image7 from "../../SVGAvatars/Avatar-07.svg";
import image8 from "../../SVGAvatars/Avatar-08.svg";
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

function Signup() {
  // React States
  const [signup, setSignup] = useState(false);
  const [open, setOpen] = useState(false);
  const [open_suc, setopen_suc] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [verified, setVerified] = useState(false); //
  const [sentOtp, setSentOtp] = useState(false);
  const [otpSnack, setOtpSnack] = useState(false);

  let { user, setUser } = useContext(UserContext);
  const handleSubmit = async (e) => {
    //Prevent page reload
    e.preventDefault();

    var { username, firstname, lastname, email, password } = document.forms[0];
    try {
      // const checkUsername = () => {
      //   //If Username is valid then create 
      // }
      if(true === true){
        var signedupUserDetails = await axios.post(
          "https://api.gyanibooks.com/signup/",
          {
            "username": username.value,
            "first_name": firstname.value,
            "last_name": lastname.value,
            "email": email.value,
            "password": password.value,
            "avatar": selectedImage,
          } );
        if (signedupUserDetails.statusText === "Created") {
          localStorage.setItem("user", JSON.stringify(signedupUserDetails.data));
          localStorage.setItem("userAvatar", selectedImage);
          alert("User Created");
          setSignup({
            email: signedupUserDetails.data.email,
            password: password.value,
          });
          setUser(signedupUserDetails.data);
        } else {
          console.log(signedupUserDetails.status, signedupUserDetails.statusText);
        }
      }
      else{
        alert('Username is already present!')
      }
      
    } catch (error) {
      alert("User Already Exists !");
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

  useEffect(() => {
    const loginuser = async () => {
      try {
        let userDetails = await axios({
          method: "post",
          url: "https://api.gyanibooks.com/login/",
          data: {
            email: signup.email,
            password: signup.password,
          },
          withCredentials: true,
        });
        setUser(userDetails.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (signup) {
      loginuser();
    }
  }, [signup]);

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
      url: "https://api.gyanibooks.com/send_email_otp/",
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

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];

  return user ? (
    <Navigate to="/dashboard/home" />
  ) : (
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
            Can't wait to onboard you!
          </h2>
          <h3 className="font-[Work Sans] text-[24px] font-[500] leading-[28px] text-[#0E0E2C]">
            Just a few more steps and you're finished!
          </h3>
          <h3 className="font-[Work Sans] text-[24px] font-[500] leading-[28px] text-[#0E0E2C]">
            We hate paperwork, too.
          </h3>
        </div>
        <div className="flex mx-2 lg:w-full items-center flex-col justify-center text-center gap-[8px] mt-[28px]">
          <form className="flex flex-col items-center w-full">
          <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full lg:w-[659px] h-[48px] pl-[10px] mt-[50px] lg:mt-[22px] rounded-[8px] bg-[#ECF1F4] outline-none focus:outline-4 focus:outline-blue-400 border-blue"
              style={{
                boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
              }}
            ></input>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="w-full lg:w-[659px] h-[48px] pl-[10px] mt-[50px] lg:mt-[22px] rounded-[8px] bg-[#ECF1F4] outline-none focus:outline-4 focus:outline-blue-400 border-blue"
              style={{
                boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
              }}
            ></input>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="w-full lg:w-[659px] h-[48px] pl-[10px] mt-[10px] lg:mt-[22px] rounded-[8px] bg-[#ECF1F4] outline-none focus:outline-4 focus:outline-blue-400 border-blue"
              style={{
                boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
              }}
            ></input>
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
              placeholder="PASSWORD"
              className="w-full lg:w-[659px] h-[48px] pl-[10px] mt-[10px] lg:mt-[22px] rounded-[8px] bg-[#ECF1F4] outline-none focus:outline-4 focus:outline-blue-400 border-blue"
              style={{
                boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
              }}
            ></input>
            {verified && (
              <div className="w-full h-[30%] my-5 lg:h-full lg:w-[670px] flex gap-1 flex-row justify-center flex-wrap items-center overflow-x-scroll scrollbar-hide">
                {images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={image}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-full h-20 lg:h-20 w-full border-[4px] ${
                        index === selectedImage
                          ? "border-blue-400"
                          : "border-none"
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </form>
          {verified && (
            <button
              style={{
                marginTop: "8px",
                height: "48px",
                width: "170px",
                borderRadius: "8px",
                backgroundColor: "#428CFB",
                color: "#FFFFFF",
                border: "none",
                fontFamily: "Work Sans",
                fontSize: "16px",
                fontWeight: "700",
                lineHeight: "19px",
                color: "#FFFFFF",
                letterSpacing: "0.04em",
                cursor: "pointer",
              }}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
          <div onClick={() => navigate("/signin")} className="mt-5">
            Already have an account?{" "}
            <span className="text-green-500 cursor-pointer">Login</span>
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
              Login Success
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

export default Signup;
