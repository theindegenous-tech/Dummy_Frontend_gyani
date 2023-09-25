import axios from "axios";
import React from "react";
import ReactDropboxChooser from "react-dropbox-chooser";

export default function DropboxIntegrity() {
  const APP_KEY = "snmovxe3kh6pvjy";
  const user = (JSON.parse(localStorage.getItem('user')));

  const upload = async (url,name,id) => {
    let data = JSON.stringify({
      "url":url,
      "filename":name,
      "user_id":id
    });

    let config = {
      method:'POST',
      maxBodyLength:Infinity,
      url: 'https://bot.gyanibooks.com/api/send_drive_doc/',
      headers: {
        'Content-Type' : 'application/json'
      },
      data:data
    };
      let res = await axios.request(config).then((response)=>{
        console.log(response.data)
      });
    // console.log(res);
  };

  return (
    <div className="container">
      <ReactDropboxChooser
        appKey={APP_KEY}

        success={(files) => upload(files[0].link,files[0].name,user.id)}
        cancel={() => console.log("closed")}
        extensions={['.pdf']} 
        multiselect={false}
      >
        <button className="flex flex-row justify-center items-center bg-[#0061FE] px-3 py-1 text-white rounded-full">DROPBOX <img className="h-10 w-10 rounded-full" src="https://assets.materialup.com/uploads/e9e874df-7610-4a74-b12b-d0c2296510ac/preview.png"/></button>
        <div className="dropbox"></div>
      </ReactDropboxChooser>
    </div>
  );
}
