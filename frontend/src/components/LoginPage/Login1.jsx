import React, { useEffect, useContext } from "react";
import { ReactComponent as ReactLogo } from "./login.svg";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";

function Login_1() {
  // React States
  let navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        let res = JSON.parse(localStorage.getItem("user"));
        if (res) {
          setUser(res);
          navigate("/dashboard/home");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  });

  const handleSubmit = async (e) => {
    //Prevent page reload
    e.preventDefault();
    let path = `/signin`;
    var { email } = document.forms[0];
    navigate(path, { state: { email: email.value } });
  };
  const handleClick = () => {
    let path = `/signup`;
    navigate(path);
  };

  return (
    <div className="ml-[20px] mr-[20px] ">
      <div className="flex lg:flex-row flex-col items-center justify-between">
        <h1 className="flex items-center text-center !font-[1000] h-[75px] font-sans text-[64px] leading-[75px] mt-[24px] tracking[-0.02em] text-[#0E0E2C] ">
          <a href="/">Gyani</a>
        </h1>
      </div>

      <div className="mb-[100px] lg:mb-[100px] items-center justify-center text-center mt-[54px] h-[71px]">
        <h2 className="font-sans text-[40px] font-[700] leading-[47px] tracking-[-0.02em]">
          Unlimited books and knowledge.
        </h2>
        <h2 className="font-sans text-[24px] mb-5 lg:mb-0 font-[500] leading-[28px] text-[#0E0E2C]">
          Read anywhere. Cancel anytime.
        </h2>
      </div>

      <h3 className="flex !pt-[50px] lg:pt-0 h-[32px] items-center justify-center text-center font-sans text-[24px] font-[600] leading-[28px] text-black">
        Ready to start? Enter your email to create or restart your membership.
      </h3>
      <div className="flex items-center flex-col justify-center">
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row justify-between items-center"
        >
          <div className="flex flex-col items-center h-[99px] mt-[20px] lg:mt-0 justify-center text-center">
            <input
              type="email"
              name="email"
              placeholder="EMAIL ADDRESS"
              className="lg:w-[659px] w-[300px] h-[48px] mt-[8px] rounded-[8px] bg-[#ECF1F4] order-1 flex-grow-0 pl-[10px]
              outline-none focus:outline-4 focus:outline-blue-400 border-blue"
              style={{
                boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
                alignSelf: "stretch",
              }}
            />
          </div>
          <div className="lg:m-2" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flexstart",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <input
              type="submit"
              value="GET STARTED!"
              style={{
                marginTop: "8px",
                height: "50px",
                width: "170px",
                borderRadius: "8px",
                backgroundColor: "#428CFB",
                border: "none",
                fontFamily: "Work Sans",
                fontSize: "16px",
                fontWeight: "700",
                color: "#FFFFFF",
                letterSpacing: "0.04em",
              }}
            />
          </div>
        </form>
        <div onClick={handleClick} className="mt-5">Don't have an account? <span className="text-orange-500 cursor-pointer">Sign Up</span></div>  

      </div>
      <br/>

      <div onClick={handleClick} className="mt-20 lg:mt-0 scale-[300%] !h-[20%] md:scale-[100%] lg:scale-[100%] object-left-bottom">
      <ReactLogo />
      </div>
    </div>
  );
}

export default Login_1;
