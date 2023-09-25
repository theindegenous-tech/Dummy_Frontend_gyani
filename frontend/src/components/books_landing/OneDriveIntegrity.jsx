import React from "react";
import { ReactOneDriveFilePicker } from "react-onedrive-filepicker";

export default function OneDriveIntegrity() {
  return (
    <div className="App">
      <ReactOneDriveFilePicker
        clientID="c3e71009-3dd7-4fc8-9127-2de5ac14c89f"
        action="share"
        multiSelect={true}
        onSuccess={(result) => {
          alert(JSON.stringify(result));
        }}
        onCancel={(result) => {
          alert(JSON.stringify(result));
        }}
      >
        <button className="px-2 bg-blue-500 text-white">OneDrive</button>
      </ReactOneDriveFilePicker>
    </div>
  );
}
