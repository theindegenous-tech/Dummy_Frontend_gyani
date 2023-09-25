import { ArrowRight,HistoryRounded,Notes, Payment, PriceChange } from "@mui/icons-material"; 
import { Breadcrumbs, } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import History from "./History";
import Pricing from "./Pricing";
import Steps from "./Steps";

function Subscriptions() {
  // const [tab, setTab] = useState(0);
  // const sections = [['Pricing',<PriceChange/>],['Steps',<Notes/>],['Payment',<Payment/>],['History',<HistoryRounded/>]];
  const {t} = useTranslation();
  return (
     <div >
      <Pricing />
     {/* <div className="flex flex-col lg:flex-row justify-between items-center px-10 scrollbar-hide">
     <Breadcrumbs aria-label="breadcrumb" className="flex flex-col lg:!text-2xl justify-start items-start">
      {sections.map((link,i)=>(
        <Link
        key={i} onClick={()=>setTab(i)} 
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center' }}
        color="inherit"
      >
        {link[0]} {link[1]}
      </Link>
      ))}
     </Breadcrumbs>
     <button className="bg-[#428CFB] text-white px-4 py-2 ">Subscribe <ArrowRight/> </button>
     <button
       className="flex flex-row justify-center items-center h-[48px] rounded-[8px] w-[110px] px-2 hover:bg-[#EFEFFD] text-[16px] border-2 font-[700] leading-[19px] text-[#428CFB] outline-none
       focus:outline-4 focus:outline-[#31D0AA] cursor-none shadow-lg"  
      style={{
        fontFamily: "Work Sans",
        boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
      }}
     onClick={()=>setTab(2)}><span>{t('Subscribe')}</span> <ArrowRight/></button>
     </div>
     <div className="!w-full !my-10 scrollbar-hide">
         {sections[tab][0] === 'Pricing' && <Pricing setTab={setTab}/>}  
         {sections[tab][0] === 'Steps' && <Steps setTab={setTab}/>}
         {sections[tab][0] === 'History' && <History setTab={setTab}/>}
       </div> */}
   </div>
  );
}

export default Subscriptions;
