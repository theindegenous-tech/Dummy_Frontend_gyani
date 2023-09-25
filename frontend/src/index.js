import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./components/pg_before_landing/HomePage";
import Signup from "./components/LoginPage/Signup";
import UserProvider from "./components/context/AuthContext";
import Login1 from "./components/LoginPage/Login1";
import Login2 from "./components/LoginPage/Login2";
import Login3 from "./components/LoginPage/Login3";
import { FullScreenbook } from "./components/futurepress/FullScreenbook";
import { DisplayPDF } from "./components/futurepress/DisplayPDF";
import Login4 from "./components/LoginPage/Login4";
import Forget from "./components/LoginPage/Forgetpass";
import Payable from "./components/Subsriptions/Payable";
import NotFound from "./components/NotFound";
import Paymentreciept from "./components/Subsriptions/Paymentreciept";
import './i18next';
// import DotRingCursor from "./components/DotRingCursor/DotRingCursor";
import './index.css';
import Invoice from "./components/Subsriptions/Invoice"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
  <UserProvider>
    {/* <div className="md:block lg:block"><DotRingCursor/></div> */}
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<HomePage />}></Route>
        <Route exact path="/login" element={<Login1 />} />
        <Route exact path="/payable" element={<Payable />} />
        <Route exact path="/reciept" element={<Paymentreciept />} />
        <Route exact path="/invoice" element={<Invoice />} />
        <Route exact path="/login/password" element={<Login2 />} />
        <Route exact path="/signin" element={<Login3 />} />
        <Route exact path="/login/email" element={<Login4 />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/forget" element={<Forget />} />
        <Route exact path="/displaypdf" element={<DisplayPDF />} />
        {
          JSON.parse(localStorage.getItem('user')) ?
          <>
          <Route exact path="/readbook" element={<FullScreenbook />} />
          <Route exact path="/dashboard/*" element={<App />} />
          </>
          :
          <>
          <Route path="/summarygen" element={<Navigate to="/login/email" />}/>
          <Route exact path="/readbook" element={<Navigate to="/login/email" />} />
          <Route exact path="/dashboard/*" element={<Navigate to="/login/email" />} />
          </>
        }
        <Route exact path="/notfound" element={<NotFound />}></Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </UserProvider>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
