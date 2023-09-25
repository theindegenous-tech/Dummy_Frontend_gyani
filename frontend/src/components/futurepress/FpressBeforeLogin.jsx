// import axios from 'axios';
import {useState } from 'react';
import './index.css';
import Cover_pdf from '../LoginPage/Cover_pdf';
function FpressBeforeLogin() {
    const [readingbook, setReadingbook]= useState(JSON.parse(localStorage.getItem('READING_BOOK_LOCALSTORAGE')))
   
        

    return (
        <div>
            <Cover_pdf file={readingbook.url}/>        
        </div>
    );
}

export { FpressBeforeLogin };