import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as ReactLogo } from "./login.svg";

function Login_2() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state;
  let path = `/signin`;

  return (
    <div className="ml-[20px] mr-[20px] ">
      <div className="flex lg:flex-row flex-col items-center justify-between">
        <h1 className="flex items-center text-center h-[75px] !font-[1000] font-sans text-[64px] leading-[75px] mt-[24px] tracking[-0.02em] text-[#0E0E2C] ">
          <a href="/">Gyani</a>
        </h1>
      </div>
      <div className="sm:!mb-[100px] !mb-[100px] items-center justify-center text-center mt-[54px] h-[71px]">
        <h2 className="font-sans text-[40px] font-[700] leading-[47px] tracking-[-0.02em]">
          Finish setting up your account.
        </h2>
        <h2 className="font-sans text-[24px] font-[500] leading-[28px] text-[#0E0E2C]">
          Gyani is personalised for you.
        </h2>
      </div>
      <h3 className="!md:mt-![50px] h-[32px] sm:!mt-[50px] lg:mt-[50px] items-center justify-center text-center font-sans text-[24px] font-[600] leading-[28px] text-black">
        Create a password to read anytime using on any device.
      </h3>
      <div className="flex items-center justify-center text-center mt-[17px]">
        <button
          className=" w-[170px] h-[48px] mt-[37px] bg-[#428CFB] rounded-[8px] text-[#FFFFFF] sm:pt-[100px]!"
          onClick={() => navigate(path, { state: { email: email } })}
        >
          NEXT
        </button>
      </div>
      <div className="mt-20 lg:mt-0 scale-[300%] !h-[20%] md:scale-[100%] lg:scale-[100%] object-left-bottom">
      <ReactLogo />
      </div>
    </div>
  );
}

export default Login_2;
