import React, { useEffect, useState } from "react";
import image from "../LoginPage/login.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import OurTeam from "./components/OurTeam";
import Assignment from "@mui/icons-material/Assignment";
// import Carausel from "./components/Carausel"

export default function Landing() {
  // React States
  let navigate = useNavigate();
  const [open, setopen] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        // let res = await axios.get('http://api.gyanibooks.com/user/',{
        //   withCredentials:true
        // })
        // console.log(localStorage.getItem('token'))
        // console.log(res)
        let res = JSON.parse(localStorage.getItem("user"));
        
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  });

  const handleSubmit = async (e) => {
    //Prevent page reload
    e.preventDefault();
    let path = `/login/password`;
    var { email } = document.forms[0];
    navigate(path, { state: { email: email.value } });
  };
  const handleClick = () => {
    let path = `/signup`;
    navigate(path);
  };

  return (
    <div className="px-10 lg:px-20 fkex flex-col justify-between items-center w-full bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex lg:flex-row flex-col items-center justify-between w-full">
        <h1 className="flex w-full items-center lg:justify-center justify-between text-center !font-[1000] h-[75px] font-sans text-[40px] lg:text-[64px] leading-[75px] mt-[24px] tracking[-0.02em] text-white ">
          <a href="/">Gyani</a>
          <div className="lg:hidden">
            <IconButton
              size="large"
              onClick={() => setopen(true)}
              sx={{ backgroundColor: "white" }}
            >
              <MenuIcon sx={{ color: "gray" }} />
            </IconButton>
            <React.Fragment>
              <Drawer anchor="left" open={open} onClose={() => setopen(false)} onBackdropClick={()=>setopen(!open)}>
                <div className="w-full bg-white h-screen flex items-center justify-center flex-col text-black">
                  <IconButton size="large" onClick={() => setopen(false)}>
                    <CloseIcon />
                  </IconButton>
                  <List>
                    {[
                      ["Home", <HomeIcon />, ""],
                      ["Discover", <TravelExploreIcon />, "/discover"],
                      ["Sign In", <AssignmentTurnedInIcon />, "/signin"],
                      // ["Sign Up", <Assignment />, "/signup"],
                    ].map((text, index) => (
                      <ListItem key={index} disablePadding onClick={()=>document.getElementById([text[0]]).scrollIntoView()}>
                        <Link
                          to={text[2].length === 0 ? `#${text[0]}` : text[2]}
                        >
                          <ListItemButton>
                            <ListItemIcon>{text[1]}</ListItemIcon>
                            <ListItemText primary={text[0]} />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Drawer>
            </React.Fragment>
          </div>
        </h1>
        <div className="hidden flex-row justify-between items-center mt-10 lg:mt-0 lg:flex w-full">
          <ul className="flex mt-10 flex-row lg:gap-6 justify-between items-center w-1/2  text-white">
            {["Home", "Discover", "About", "Team", "Contact"].map((item, i) => (
              <li
                className="hover:text-white py-2 px-6 rounded-lg hover:bg-[#428CFB]"
                key={i}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex w-full flex-row justify-center items-center ">
          {!JSON.parse(localStorage.getItem("user")) ? (
            <>
            <button class="bg-black hover:bg-blue-400 text-bold mt-5  text-white p-1 w-75 px-8 rounded-full" onClick={(e) => {
                  e.preventDefault();
                  navigate("/signin");
                }}>
                  <p style={{ fontFamily: "Work Sans" }}> SIGN IN &rarr;</p>
 
</button>
              {/* <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login/email");
                }}
                className=" w-[113px] h-[48px] mt-[37px] border-[1px] border-[#EFEFFD] bg-[#FFFFFF] rounded-[8px] text-[#428CFB] mr-[10px]"
                style={{ padding: "12px 24px" }}
              >
                SIGN IN
              </button>
              <button
                onClick={handleClick}
                className=" w-[113px] h-[48px] mt-[37px] border-[1px] border-[#EFEFFD] bg-[#FFFFFF] rounded-[8px] text-[#428CFB]"
                style={{ padding: "12px 24px" }}
              >
                SIGNUP
              </button> */}
            </>
          ) : (
            <button
              onClick={() => navigate("/dashboard/home")}
              className=" w-[200px] h-[48px] mt-[37px] border-[1px] border-[#EFEFFD] bg-[#428CFB] rounded-[8px] text-[#fff]"
              style={{ padding: "12px 24px"  }}
            >
              <p style={{ fontFamily: "Work Sans" }}>START READING</p>
            </button>
          )}
        </div>
      </div>

      <div className="mb-[100px] lg:mb-[100px] items-center justify-center text-center mt-[54px] h-[71px]">
        <h2 className="font-sans text-[48px] font-[700] leading-[47px] tracking-[-0.02em] mb-2 text-white">
          Welcome to <span className="text-white">Gyani</span>
        </h2>
        <h2 className="font-sans text-[40px] font-[700] leading-[47px] tracking-[-0.02em] text-white">
          Unlimited <span className="text-yellow-300">books</span> and
          knowledge.
        </h2>
        <h2 className="font-sans text-[24px] mb-5 lg:mb-0 font-[500] leading-[28px] text-[#0E0E2C]">
          Read anywhere. Cancel anytime.
        </h2>
      </div>
      <br />
      <div className="mt-[40%] md:mt-20 lg:mt-20 scale-[300%] !h-[20%] md:scale-[100%] lg:scale-[100%] object-left-bottom mb-[30%] lg:mb-10">
        <img src={image} />
      </div>
      {/* <Carausel/> */}
      <section class="text-white lg:mt-[10%]">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1
              class="text-[24px] lg:text-[40px] font-[700] title-font mb-4 text-white"
              style={{ fontFamily: "Work Sans" }}
            >
              User Base & Statistics
            </h1>
            <p
              class="lg:w-2/3 mx-auto leading-relaxed text-base"
              style={{ fontFamily: "Work Sans" }}
            >
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them man bun deep jianbing selfies heirloom prism
              food truck ugh squid celiac humblebrag.
            </p>
          </div>
          <div class="flex flex-wrap -m-4 text-center items-center justify-center">
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="text-yellow-300 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 17l4 4 4-4m-4-5v9"></path>
                  <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
                </svg>
                <h2 class="title-font font-medium text-3xl text-gray-900">
                  2.7K
                </h2>
                <p class="leading-relaxed">Downloads</p>
              </div>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="text-white w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h2 class="title-font font-medium text-3xl text-gray-900">
                  1.3K
                </h2>
                <p class="leading-relaxed">Users</p>
              </div>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="text-blue-800 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                  <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
                </svg>
                <h2 class="title-font font-medium text-3xl text-gray-900">
                  74
                </h2>
                <p class="leading-relaxed">Files</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-black font-bold mb-4" style={{ fontFamily: "Work Sans",fontSize:12 }}>© Kopili Technologies Pvt Ltd</p>
      </section>
      {/* OUR TEAM  */}

      {/* <section
        class="text-gray-600 body-font py-10"
        style={{ fontFamily: "Work Sans" }}
      >
        <div class="container px-5 py-15 mx-auto" id="Team">
          <div class="flex flex-col text-center w-full mb-20">
            <h1
              class="text-[24px] lg:text-[40px] font-[700]  mb-4 text-white"
              style={{ fontFamily: "Work Sans" }}
            >
              Our Team
            </h1>
            <p
              class="lg:w-2/3 mx-auto leading-relaxed text-white"
              style={{ fontFamily: "Work Sans" }}
            >
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them.
            </p>
          </div>
          <div class="flex flex-wrap -m-4">
            <OurTeam name="Alex Hales" role="Front End Developer" />
            <OurTeam />
            <OurTeam />
            <OurTeam />
          </div>
        </div>
      </section> */}

      {JSON.parse(localStorage.getItem("user")) ? (
        <footer
          onClick={() => navigate("/dashboard/home")}
          className="bg-white
             text-[16px] rounded-[8px] text-[#428CFB] text-center
             border-red-500
             fixed
             inset-x-0
             
             bottom-0
             p-2 lg:hidden"
        >
          Start Reading
        </footer>
      ) : (
        <footer
          onClick={() => navigate("/signin")}
          className="bg-white
             text-[16px]  rounded-[8px] text-[#428CFB] text-center
             border-red-500
             fixed
             inset-x-0
             
             bottom-0
             p-2 lg:hidden"
        >
          Sign In
        </footer>
      )}
    </div>
  );
}
