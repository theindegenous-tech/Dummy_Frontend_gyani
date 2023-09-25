import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import image1 from '../../SVGAvatars/Avatar-01.svg';
import image2 from '../../SVGAvatars/Avatar-02.svg';
import image3 from '../../SVGAvatars/Avatar-03.svg';
import image4 from '../../SVGAvatars/Avatar-04.svg';
import image5 from '../../SVGAvatars/Avatar-05.svg';
import image6 from '../../SVGAvatars/Avatar-06.svg';
import image7 from '../../SVGAvatars/Avatar-07.svg';
import image8 from '../../SVGAvatars/Avatar-08.svg';
import { Fade } from "react-reveal";
import { useTranslation } from "react-i18next";
import { Alert, Snackbar } from "@mui/material";

function Profile() {
  let navigate = useNavigate();
  let { setUser } = useContext(UserContext);

  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(0);
  const [error, setError] = useState("");

  const {t} = useTranslation();

  const vertical = "top";
  const horizontal = "right";

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      console.log(user)
      setfirstName(user.first_name);
      setlastName(user.last_name);
      setEmail(user.email);
      setPassword(user.password);
      let avatar = localStorage.getItem('userAvatar')
      if(avatar !==null){
        setAvatar(parseInt(avatar))
      }
    }
  }, []);

  const handleClick = async () => {
    try {
      let res = await axios.post("https://api.gyanibooks.com/logout/", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("READING_BOOK_LOCALSTORAGE");
        localStorage.removeItem("token");
        navigate("/signin");
      }
    } catch (error) {
      setError(error)
    }
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
  ]

  return (
    <div className="profile flex flex-col gap-5 w-full h-[100%] justify-center lg:justify-around items-center mx-10 !scrollbar-hide">
      <h1
          style={{ fontFamily: "Work Sans" }}
          className="text-[30px] lg:text-[50px] text-black font-[700] text-left w-full px-5 lg:px-10"
        >
          {t('Profile')}
      </h1>
      <div className="flex flex-col lg:flex-row justify-around items-center w-full">
      <div className="img_div flex flex-col gap-5 justify-center items-center text-center">
        <Fade left>
        {avatar !==null && avatar !== 'null' &&
        <img
        src={images[avatar]}
        className="h-[200px] w-[200px] mt-[10px] rounded-[50%]"
      />}
        <div>
          <button
            className="h-[48px] rounded-[8px] w-[109px] hover:bg-[#EFEFFD] text-[16px] border-2 font-[700] leading-[19px] text-[#428CFB] outline-none
            focus:outline-4 focus:outline-[#31D0AA]  shadow-lg"  
            onClick={handleClick}
          >
            LOGOUT
          </button>
        </div>
        </Fade>
      </div>
      <div className="form lg:my-10 w-[85%] mx-2 lg:w-1/3">
        <Fade right>
        <div>
          <div className="input-container">
            <label>First name </label>
            <input
              type="text"
              style={{
                boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
                fontFamily: "Work Sans",
              }}
              className="bg-[#ECF1F4] focus:border-[1px solid #428CFB] focus:bg-white focus:ring-2 focus:ring-indigo-200 text-[#8C8CA1] focus:outline-[#70a4f1] focus:outline-[3px] outline-none pl-[16px]  font-[500] rounded-[8px] h-[48px] w-full lg:w-[320px]"
              name="fname"
              value={firstname}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Last name </label>
            <input
              type="text"
              style={{
                boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
                fontFamily: "Work Sans",
              }}
              className="bg-[#ECF1F4] focus:border-[#428CFB] focus:border-[1px solid] focus:bg-white focus:ring-2 focus:ring-indigo-200 text-[#8C8CA1] focus:outline-[#428CFB] focus:outline-[3px] outline-none pl-[16px]  font-[500] rounded-[8px] h-[48px] w-full lg:w-[320px]"
              name="lname"
              value={lastname}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Email </label>
            <input
              disabled
              type="email"
              name="email"
              autoComplete="off"
              style={{
                boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
                fontFamily: "Work Sans",
              }}
              className="bg-[#ECF1F4] focus:border-[#428CFB] focus:border-[1px solid] focus:bg-white focus:ring-2 focus:ring-indigo-200 text-[#8C8CA1] focus:outline-[#428CFB] focus:outline-[3px] outline-none pl-[16px]  font-[500] rounded-[8px] h-[48px] w-full lg:w-[320px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>New Password </label>
            <input
              type="password"
              name="pass"
              style={{
                boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
                fontFamily: "Work Sans",
              }}
              className="bg-[#ECF1F4] focus:border-[#428CFB] focus:border-[1px solid] focus:bg-white focus:ring-2 focus:ring-indigo-200 text-[#8C8CA1] focus:outline-[#428CFB] focus:outline-[3px] outline-none pl-[16px]  font-[500] rounded-[8px] h-[48px] w-full lg:w-[320px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center items-center input-container lg:w-[320px] my-5 ">
            <button
              className="h-[48px] rounded-[8px] w-[109px] hover:bg-[#EFEFFD] text-[16px] border-2 font-[700] leading-[19px] text-[#428CFB] outline-none
              focus:outline-4 focus:outline-[#31D0AA]  shadow-lg" 
              
            >
              UPDATE
            </button>
          </div>
        </div>
        </Fade>
      </div>
      </div>
      <Snackbar
        open={error.length >= 1}
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={() => setError("")}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      </Snackbar>
      </div>
  );
}

export default Profile;
