import { useState } from "react";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./Sample.css";

import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js`;  
 function Cover_pdf (props){
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const goToPrevPage = () => 
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <div className="h-[500px]"> 
      <Document
        file={props.url}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
        className="pdf-document"
      >
        <Page size="A4" pageNumber={props.pgno ? props.pgno : 1} />
      </Document>
    </div>
  );
};

export default Cover_pdf;
