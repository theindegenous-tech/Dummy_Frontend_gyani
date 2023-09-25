import React, { useState ,useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import img1 from './phonelogo.png'
const axios = require('axios');




function Payable() {
    const location = useLocation();
    const countries = ["China", "Russia", "UK"];
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const [showbilling, setshowbilling] = useState(false);
    const [sfname, setsfname] = useState("");
    const [slname, setslname] = useState("");
    const [scity, setscity] = useState("");
    const [saddress, setsaddress] = useState("");
    const [scountry, setscountry] = useState("");
    const [sphone, setsphone] = useState("");
    const [sstate, setsstate] = useState("");
    const [szip, setszip] = useState("");
    const [bfname, setbfname] = useState("");
    const [blname, setblname] = useState("");
    const [bcity, setbcity] = useState("");
    const [baddress, setbaddress] = useState("");
    const [bcountry, setbcountry] = useState("");
    const [bphone, setbphone] = useState("");
    const [bstate, setbstate] = useState("");
    const [bzip, setbzip] = useState("");
    

   

    const saveadd = async() => {
        let user = JSON.parse(localStorage.getItem("user"));
        let sdata = JSON.stringify({
            "first_name": sfname,
            "last_name": slname,
            "address": saddress,
            "city": scity,
            "country": scountry,
            "state": sstate,
            "zipcode": szip,
            "phone": sphone,
          });
          let bdata = JSON.stringify({
            "first_name": bfname,
            "last_name": blname,
            "address": baddress,
            "city": bcity,
            "country": bcountry,
            "state": bstate,
            "zipcode": bzip,
            "phone": bphone,
            "same as shipping address": showbilling,
          });
          try {
            let res = await axios.post("https://api.gyanibooks.com/save_shipping_details/", {
                email:user.email,
                shipping_address:sdata,
                billing_address:bdata
            });
            alert("data saved")
            payment();
            
          } catch (error) {
            console.log(error);
          }
          
    };

    const payment = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let data = JSON.stringify({
            "amt": location.state.amount,
            "userid": user.id,
            "credits": location.state.credits
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.gyanibooks.com/payment_accept_req/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            localStorage.setItem("tx_id", response.data.tx_id);
            window.location.replace(`${response.data.pay_page_url}`);
          })
          .catch((error) => {
            console.log(error);
          });
    };

  return (
    <section className="text-gray-600 body-font overflow-hidden scrollbar-hide" style={{fontFamily:"Work Sans"}}>
        <div className=" flex flex-row  max-[690px]:flex-col">
      <div className="flex justify-center items-center ">
            <div className="mb-5 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                <div className="flex flex-col justify-start items-start w-full ">
                    <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                    <div className="p-4  bg-white flex flex-col lg:w-full xl:w-full">
                    <button className="border border-transparent hover:border-blue-700 bg-blue-500 hover:bg-blue-700 text-white m-5  flex flex-row justify-center items-center space-x-2 py-2 rounded w-24"
                onClick={() => {
                    navigate("/dashboard/subscriptions");
                  }}
                >
                                <div>
                                    <p className="text-base leading-4 font-bold">Return</p>
                                </div>
                            </button>
                    <div className="flex justify-start flex-col items-start space-y-2">
                        <p className=" ml-8 text-3xl lg:text-4xl font-bold leading-7 lg:leading-9 text-gray-800 mb-5">Checkout</p>
                    </div>
                            {/* <button className="border border-transparent hover:border-blue-700 bg-blue-500 hover:bg-blue-700 text-white  flex flex-row justify-center items-center space-x-2  rounded w-full"
                            onClick={() => {
                                payment()
                              }}
                            >
                               
                                <div>
                                <img className="my-1" src={img1} style={{Width : 35,height:35 }}></img>
                                </div>
                            </button> */}
                            <label className="mt-5 text-base leading-4 text-gray-800 font-bold">Shipping address</label>
                            <div className="mt-2 flex-col">
                            <div className="flex-row flex">
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="First name" onChange={(e) => setsfname(e.target.value)}/>
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="Last name" onChange={(e) => setslname(e.target.value)} />
                                </div>
                               
                                <div>
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="Address" onChange={(e) => setsaddress(e.target.value)}/>
                                </div>
                                
                                <div className="flex-row flex">
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="city" onChange={(e) => setscity(e.target.value)}/>
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="phone" onChange={(e) => setsphone(e.target.value)}/>
                                </div>
                                <div className="flex-row flex">
                                <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="country" onChange={(e) => setscountry(e.target.value)} />
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="state" onChange={(e) => setsstate(e.target.value)}/>
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="zipcode" onChange={(e) => setszip(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex-row flex mt-1">
                            <input class="form-check-input " type="checkbox" value="" id="invalidCheck" required  onChange={
                                                                           (e) => {
                                                                               if (e.target.checked) {
                                                                                  setshowbilling(true);
                                                                               }
                                                                               else{
                                                                                setshowbilling(false);
                                                                               }
                                                                           }
                                                                       }/>
                     <label class="form-check-label font-bold" for="invalidCheck">
                     Same as shipping address
                     </label>
                                </div>
                                {
                                    !showbilling && (
                                        <>
                                        <label className="mt-8 font-bold text-base leading-4 text-gray-800">Billing address</label>
                            <div className="mt-2 flex-col">
                            <div className="flex-row flex">
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="First name" onChange={(e) => setbfname(e.target.value)}/>
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="Last name" onChange={(e) => setblname(e.target.value)} />
                                </div>
                               
                                <div>
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="Address" onChange={(e) => setbaddress(e.target.value)}/>
                                </div>
                                
                                <div className="flex-row flex">
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="city" onChange={(e) => setbcity(e.target.value)}/>
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="phone" onChange={(e) => setbphone(e.target.value)}/>
                                </div>
                                <div className="flex-row flex">
                                <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="country" onChange={(e) => setbcountry(e.target.value)} />
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="state" onChange={(e) => setbstate(e.target.value)}/>
                                    <input className=" appearance-none border-2 bg-gray-100 m-1 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="zipcode" onChange={(e) => setbzip(e.target.value)} />
                                </div>
                               
                            </div>
                                        </>
                                    )
                                }

                            <button className="mt-8 border border-transparent hover:border-blue-700 bg-blue-500 hover:bg-blue-700 text-white  flex flex-row justify-center items-center space-x-2 rounded w-full"
                            onClick={() => {
                                saveadd()
                              }}
                            >
                                <div className="flex flex-row">
                                    <img className="my-1" src={img1} style={{Width : 35,height:35 }}></img>
                                </div>
                            </button>
                            <div className="flex justify-start flex-col items-start space-y-2 mt-2 ml-10 font-bold">
                        <p className="text-base leading-normal sm:leading-4 text-gray-600">
                            Refund Policy &nbsp;  &nbsp;  Privacy Policy &nbsp;  &nbsp;  &nbsp;  Terms of Service 
                        </p>
                    </div> 
                        </div>
      </div>
      </div>    
                </div>     
            </div>
            <div className="p-8  bg-gray-200 flex flex-col lg:w-full xl:w-3/5">
                        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className=" flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Gift Card</h3>
                            <div className="flex justify-between items-start w-full">
                                    <input className="bg-gray-100 appearance-none border-2  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="email" placeholder="Code..." />
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <button className="hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-3 w-96 md:w-full bg-blue-500 text-base font-medium leading-4 text-white">Apply</button>
                            </div>
                        </div>
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl  leading-5 font-bold text-gray-800">Order Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between  w-full">
                                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                    <p className="text-base leading-4 text-gray-600">${location.state.amount}</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">
                                        Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">Code</span>
                                    </p>
                                    <p className="text-base leading-4 text-gray-600">-$28.00 (50%)</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">GST</p>
                                    <p className="text-base leading-4 text-gray-600">3%</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">Transaction fee</p>
                                    <p className="text-base leading-4 text-gray-600">2%</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">$36.00</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    </section>
  );
}

export default Payable;
