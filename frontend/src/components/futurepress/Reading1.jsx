import React from 'react'
import BookDescription from '../Reusable/BookDescription'
function Reading1() {
  // pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
  return (
    <div className="flex justify-center items-center lg:w-full w-[80%] lg:mt-[120px] lg:h-[511px]">
        <BookDescription />
    </div>
  )
}

export default Reading1