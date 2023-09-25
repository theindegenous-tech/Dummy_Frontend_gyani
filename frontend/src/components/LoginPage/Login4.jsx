import React from "react";
// import { UserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ReactLogo } from "./login.svg";
function Login4() {
  let navigate = useNavigate();
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
    <div className="ml-[20px] mr-[20px] ">
      <div className="flex lg:flex-row flex-col items-center justify-between">
        <h1 className="flex items-center text-center !font-[1000] h-[75px] font-sans text-[64px] leading-[75px] mt-[24px] tracking[-0.02em] text-[#0E0E2C] ">
          <a href="/">Gyani</a>
        </h1>

        <div>
          <button
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
          </button>
        </div>
      </div>

      <div className="sm:!mb-[100px] !mb-[100px] items-center justify-center text-center mt-[54px] h-[71px]">
        <h2 className="font-sans text-[40px] font-[700] leading-[47px] tracking-[-0.02em]">
          Continue setting up your account
        </h2>
        <h2 className="font-sans text-[24px] font-[500] leading-[28px] text-[#0E0E2C]">
          We promise it only takes a second.
        </h2>
      </div>
      <div className="lg:w-full !md:mt-![50px] h-[32px] sm:!mt-[50px] lg:mt-[50px] items-center justify-center text-center font-sans text-[15px] font-[600] leading-[28px] text-black">
        <div className="w-full flex flex-col h-[78px] items-center justify-center text-center">
          <form method="POST" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="EMAIL ADDRESS"
              className="w-1/2 lg:w-[659px] pl-[10px] h-[48px] mt-[8px] rounded-[8px] bg-[#ECF1F4] "
              style={{
                boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
                order: 1,
                alignSelf: "stretch",
                flexGrow: 0,
              }}
            ></input>
            <div className="flex w-[659px] flex-col h-[78px] items-center justify-center text-center">
              <button className=" w-[170px] h-[48px] mt-[37px] bg-[#428CFB] rounded-[8px] text-[#FFFFFF] sm:pt-[100px]!">
                NEXT
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-40 lg:mt-20 scale-[300%] bottom-0  md:scale-[100%] lg:scale-[100%] object-left-bottom">
        <ReactLogo />
      </div>
    </div>
  );
}

export default Login4;
