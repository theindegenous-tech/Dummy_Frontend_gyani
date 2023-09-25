import React, { useState } from 'react';
import { useLocation, useSubmit } from 'react-router-dom';
import { useRef } from 'react';
import './invoice.css'
import logo from "../../SVGAvatars/fullLogo.svg";
import { useReactToPrint } from 'react-to-print';
const Invoice = () => {
    const refrence = useRef();
    const location = useLocation();
    const [data, setData] = useState({});
    const [perticulars, setPerticulars] = useState([{item : "",
                                                      price : 0,
                                                     quantity : 1}])
    var total = 0;
    var no = 0;

   

    const handlePrint = useReactToPrint({
        content : () => refrence.current,
        pageStyle : `{
            background color: red;
        }`
    })

  return (
    <div className='m-5'>
        <button style={{
                            backgroundColor:"#428CFB",
                            color: "white"
                          }} className="border border-transparent rounded-lg  flex flex-row justify-center items-center space-x-2 py-2  " onClick={handlePrint} ><p className="text-[16px] font-[700]  px-3 ">print</p></button>
    <div style={{margin:0, size: "auto"}} ref={refrence}>
    
    <br/>
    <div >
    <div  >
        <div className='flex justify-between'>
    <div className='flex flex-col'>
        <div className='flex flex-col'>
            <div className='flex flex-col mt-4'>
            <h5 style={{fontWeight : 600}}>To</h5>
            <span ></span> <span>Yash Kumar Mishra</span>
            <div>village & post gainee</div>
            <span >pincode : 243302</span>
            <div><span >Phone:</span> <span>+91-6397124401</span></div>
            <span >Email: mishrayash3778@gmail.com</span>
        </div>
        </div>
        <h5 className='mt-1' style={{fontWeight : 600}}>Company</h5>
    <div className='flex flex-col'>
        <span>The Indegenous</span>
         <span>Based in India</span>
         <span>xxx & xxx road </span>
         <span>Assam india</span>
     </div>
    </div>

     <br/>
{/* <-------------------------------------------------------------------------------------> */}
     <div className='flex flex-col'>
     <div className='flex flex-col  m-3'>
            
            <img  src={logo} style={{Width : 100,height:100 }}></img>
        </div>
        <div className='flex flex-col mt-5'>
        <div className='flex flex-row'>
        <div className='flex flex-col'>
            <table>
                <tbody>
                    <tr>
                        <td style={{fontWeight : 600}}>Invoice No:</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td style={{fontWeight : 600}}>Invoice Date:</td>
                        <td>xx/xx/xxxx</td>
                    </tr>
                    <tr>
                        <td style={{fontWeight : 600}}>Due Date:</td>
                        <td>xx/xx/xxxx</td>
                    </tr>
                </tbody>
            </table>
     </div>
</div>
    </div>
     </div>
     </div>
     <br/>

     <div className='flex flex-row' >
            <table className="min-w-full text-left text-sm font-light" >
                <thead className="border-1 font-medium bg-blue-700 rounded-lg">
                    <th scope="col" className="px-6 py-4 text-white">ID</th>
                    <th scope="col" className="px-6 py-4 text-white">Description</th>
                    <th scope="col" className="px-6 py-4 text-white">Plan</th>
                    <th scope="col" className="px-6 py-4 text-white">Price</th>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="whitespace-nowrap px-6 py-4">1.</td>
                        <td className="whitespace-nowrap px-6 py-4">Maha gyani</td>
                        <td className="whitespace-nowrap px-6 py-4">A nice item</td>
                        <td className="whitespace-nowrap px-6 py-4">40</td> 
                    </tr>
                </tbody>
            </table>
     </div>
     <br/>

     <div className='flex justify-between'>
        <div className='flex flex-col border-2 border-black rounded-lg w-1/4 ml-12'>
               <p className='text-center'>Comments</p>
        </div>
        <div className='flex flex-col'>

        <div className='flex flex-row'>
            <table >
                <tbody>
                    <tr>
                        <td className='px-16'  style={{fontWeight : 600}}>Subtotal:</td>
                        <td className='px-16'  style={{fontWeight : 600}}>40</td>
                    </tr>
                    <tr>
                        <td  className='px-16' style={{fontWeight : 600}}>Tax:</td>
                        <td  className='px-16' style={{fontWeight : 600}}>6%</td>
                    </tr>
                    <tr>
                        <td className='px-16'  style={{fontWeight : 600}}>Discount:</td>
                        <td className='px-16'  style={{fontWeight : 600}}>10%</td>
                    </tr> 
                    <tr>
                        <td className='px-16'  style={{fontWeight : 700, color : "red", fontSize: 18}}>Total:</td> 
                        <td className='px-16'  style={{fontWeight : 700, color : "red", fontSize: 18}}>50</td>
                    </tr>
                </tbody>
            </table>
     </div>
        </div>
     </div>
     {/* <div>Dies ist eine computergenerierte Rechnung. Wenn Sie Fragen haben, schreiben Sie uns bitte an info@diewelt-erleben.de</div>
     <div >Vielen Dank www.diewelt-erleben.de</div> */}

    </div>
    </div>
    </div>
    </div>
  )
}

export default Invoice;