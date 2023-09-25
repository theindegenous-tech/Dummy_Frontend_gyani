
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import "../books_landing/Hover.css"
import Cover_pdf from '../LoginPage/Cover_pdf'; 

function BookDescription4() {
        let browseclick=0;
        const [nav, setnav]= useState(0);
        let navigate=useNavigate();
        const [readingbook,setreadingbook] = useState(JSON.parse(localStorage.getItem('READING_BOOK_LOCALSTORAGE')));
        let path= "/readbook";
        useEffect(()=>{
                if(nav!==0){
                        
                        navigate(path);
                }

        },[nav])

        const handleClick=()=>{
                browseclick= browseclick+1;
                setnav(browseclick);
        }
  return (
    <div className='fpress_img' style={{width:'1086px', height:'520px',display:'flex',flexDirection:'row', alignItems:'flex-start',flex: 'none',order: 1,flexGrow: 0, paddingTop:'8px',gap:'48px',position:'absolute'}}>
        <div style={{padding:0,display:'flex',flexDirection:'column', alignItems:'flex-start', width:'519px',height:'503px'}}>
                <div style={{width:'auto', height:'28px', marginTop:'48px', marginLeft:'24px'}}>
                    <h3 style={{fontFamily: 'Work Sans',fontSize:'24px',fontWeight:'600',lineHeight:'28.15px',letterSpacing:'-2%', color:'#0E0E2C',margin:0}}>
                            {readingbook.title}
                    </h3>
                </div>
                <div style={{width:'104px', height:'44px', marginTop:'16px', marginLeft:'24px'}}>
                        <p style={{margin:0,fontFamily: 'Work Sans',fontSize:'16px',fontWeight:'500',lineHeight:'22.4px',letterSpacing:'-2%', color:'#4A4A68'}}>
                            {/* {readingbook.author[0].first_name} */}
                            <br />
                            {readingbook.year}
                        </p>
                </div>
                <div style={{width:'425px', height:'auto', marginTop:'16px', marginLeft:'24px',display:'flex',flexDirection:'column', alignItems:'flex-start',flex: 'none',order: 2,flexGrow: 0, padding:0,gap:'16px',fontFamily: 'Work Sans',fontSize:'16px',fontWeight:'500',lineHeight:'22.4px',letterSpacing:'-2%', color:'#4A4A68'}}>
                        Book Description Long Version....... Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <button style={{cursor:'pointer', display:'flex',flexDirection:'column', alignItems:'center',flex: 'none',order: 3,flexGrow: 0, padding:'12px 24px',width:'auto', height:'48px', background:'#EFEFFD',borderRadius:'8px', marginTop:'16px', marginLeft:'24px',fontFamily: 'Work Sans',fontSize:'16px',fontWeight:'700',lineHeight:'18.77px',letterSpacing:'2%', color:'#428CFB',border:'none'}} 
                onClick={handleClick}
                >
                        START READING
                </button>

        </div>
        {/* <div style={{display:'flex',flexDirection:'row',justifyContent:'center', alignItems:'flex-start',flex: 'none',order: 1,flexGrow: 1, padding:'12px 24px',width:'519px', height:'480px', gap:'10px',borderRadius:'8px', marginLeft:'48px', marginTop:'20px'}}>
            <FpressBeforeLogin /> 

        </div> */}

        <Cover_pdf url={readingbook.url}/>
    </div>
  )
}

export default BookDescription4