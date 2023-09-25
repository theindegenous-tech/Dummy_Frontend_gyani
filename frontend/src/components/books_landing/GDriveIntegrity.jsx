import axios from "axios";
import { useState } from "react";
import useDrivePicker from "react-google-drive-picker";

function GDriveIntegrity() {
  const [openPicker, authResponse] = useDrivePicker();
  const [file, setFile] = useState();
  const user = useState(JSON.parse(localStorage.getItem('user')));
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
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
  const handleOpenPicker = () => {
    openPicker({
      clientId: "264738490687-5iue6maofifd6enplau40besrqlglcns.apps.googleusercontent.com",
      developerKey: "AIzaSyDi6cvM1qCa2CNICOsTa26WzQEbhzJO_iQ",
      viewId: "DOCS",
      // token: "ya29.a0AWY7CkmZlKaV6Dgg9xSXBppNY8CGf0LyFJzE3-PFW_8uFBuNoKo3ZecUluUv4TGV6cECfxeUrBLdH0ykeWy3ABxEKT8Op7p7F3ITVzU0LJI5ukTvU60ek-6h3Rl56CdtOhldeOfXJK-yUzf8Csjyr3lwuLDzaCgYKAbsSARESFQG1tDrpm2AEMdTm2WHgoDSgBVxq6w0163",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        if (data.action === "picked") {
          console.log(data.docs[0])
          upload(data.docs[0].url, data.docs[0].name, user[0].id);
        }
        console.log(data);
      },
    });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <button onClick={() => handleOpenPicker()} className="flex flex-row justify-center items-center bg-[#f1f3f4] px-3 py-1 text-gray-500 rounded-full">Drive <img className="h-10 w-14 !rounded-full" src="https://download.logo.wine/logo/Google_Drive/Google_Drive-Logo.wine.png"/></button>

      {/* <button
        className="bg-orange-400 text-white px-4 py-2 "
        onClick={() => upload()}
      >
        SEND TO BACKEND
      </button> */}
      {file && (
        <iframe
          src={file.docs[0].embedUrl}
          width="340"
          height="480"
          allow="autoplay"
        ></iframe>
      )}
    </div>
  );
}

export default GDriveIntegrity;
