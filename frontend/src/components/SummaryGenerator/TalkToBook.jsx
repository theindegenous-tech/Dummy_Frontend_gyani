import React from "react";
import DropboxIntegrity from "../books_landing/DropboxIntegrity";
import GDriveIntegrity from "../books_landing/GDriveIntegrity";
import OneDriveIntegrity from "../books_landing/OneDriveIntegrity";

function TalkToBook(){
  return(
    <div className="flex flex-row justify-between items-center">
      <GDriveIntegrity/>
      <DropboxIntegrity/>
      <OneDriveIntegrity/>
    </div>
  )
}

export default TalkToBook;