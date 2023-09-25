import React from "react";
import BookDescription5 from "../Reusable/BookDescription5";
import { BookReusable3} from "../Reusable/BookReusable3";
import { BookReusable7 } from "../Reusable/BookReusable7";
function Homepage2() {
  return (
    <div className="flex flex-col flex-wrap items-start gap-5 justify-start bg-[#ffffff] h-auto overflow-hidden">
      <BookReusable7/>
      <BookDescription5 />
      <BookDescription5 />
      {/* <BookReusable3/> */}
    </div>
  );
}

export default Homepage2;
