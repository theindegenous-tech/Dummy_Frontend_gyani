
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function BookDescription5() {
        let browseclick=0;
        const [nav, setnav]= useState(0);
        let navigate=useNavigate();
        let path= "/reading2";
        useEffect(()=>{
                if(nav!==0){
                        
                        navigate(path);
                }

        },[nav])

        const handleClick=()=>{
                browseclick= browseclick+1;
                setnav(browseclick);
        }


        let url="https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyaWVzfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
  return (
    <div className="flex w-full flex-col lg:flex-row border-[1px solid black] justify-center mt-5 bg-white lg:gap-[30rem] border-[1px solid black]">
        <div className="w-full flex flex-col items-start">
                <div className="w-full h-[28px] mt-[48px] ml-[50px] lg:ml-[24px]" >
                    <h3 style={{fontFamily: 'Work Sans',fontSize:'24px',fontWeight:'600',lineHeight:'28.15px',letterSpacing:'-2%', color:'#0E0E2C',margin:0}}>
                            Book Title
                    </h3>
                </div>
                <div className='mt-[16px] ml-[50px] lg:ml-[24px]'>
                        <p style={{margin:0,fontFamily: 'Work Sans',fontSize:'16px',fontWeight:'500',lineHeight:'22.4px',letterSpacing:'-2%', color:'#4A4A68'}}>
                            Author
                            <br />
                            Year

                        </p>
                </div>
                <div className='!lg:w-[425px] w-[350px] lg:ml-[24px] ml-[50px] mt-[16px] flex flex-col items-start gap-[16px] font-[Work Sans] font-[500] leading-[22.4px] tracking-[-2%] text-[#4A4A68]'>
                        Book Description Long Version....... Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <button className='flex flex-col items-center order-3 py-[12px] px-[24px] w-[118px] h-[48px] hover:bg-[#EFEFFD] rounded-[8px] mt-[16px] lg:ml-[24px] ml-[50px] tracking-[4%] font-[Work Sans] text-[16px] font-[700] leading-[18.77px] text-[#428CFB]'
                onClick={handleClick}>
                        BROWSE
                </button>

        </div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center', alignItems:'flex-start',flex: 'none',order: 1,flexGrow: 1, padding:'12px 24px', height:'480px', gap:'10px',borderRadius:'8px'}}>
            <div style={{width:'320px', height:'480px',flex: 'none',order: 0,flexGrow: 0,backgroundImage: `url(${url})`,
                  backgroundSize: '100% 100%'}}>

            </div>

        </div>

    </div>
  )
}

export default BookDescription5