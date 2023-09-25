import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import i18n from "../i18next";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const [lang, setLang] = React.useState("en");

  const {t} = useTranslation();

  const handleChange = (event) => {
    setLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  const languages = [
    ['en','English'],
    ['fr','French'],
    ['hi','Hindi'],
    ['ka','Kannada'],
    ['ben','Bengali'],
  ]

  return (
    <div className="flex flex-col justify-center items-start w-full px-5">
       <h1
          style={{ fontFamily: "Work Sans" }}
          className="lg:mx-0 text-[30px] lg:text-[50px] text-black font-[700] text-left w-full"
        >
          {t('Settings')}
      </h1>
     <div className=" flex flex-col w-[30%] mt-10">
     <InputLabel id="demo-select-small" style={{fontFamily:'Work Sans',}}>Language</InputLabel>
      <Select
         fullWidth
        labelId="demo-select-small"
        id="demo-select-small"
        sx={{fontFamily:'Work Sans'}}
        value={i18n.language}
        label="Language"
        onChange={handleChange}
      >
        {
          languages.map((lan,i)=>(
            <MenuItem sx={{fontFamily:'Work Sans'}} key={i} value={lan[0]}>{lan[1]}</MenuItem>
          ))
        }
      </Select>
     </div>
    </div>
  );
}
