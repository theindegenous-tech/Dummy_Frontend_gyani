import React,{useState,useEffect} from "react";
const axios = require('axios');



function Paymentreciept() {
    const [len,setlen] = useState();
    
    useEffect(() => {
        let tex_id = localStorage.getItem("tx_id");
        let user = JSON.parse(localStorage.getItem("user"));
        let data = JSON.stringify({
            "tx_id": tex_id,
            "userid": user.id
          });
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.gyanibooks.com/payment_check_status/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            setlen(response.data.success);
          })
          .catch((error) => {
            console.log(error);
          });
          
      }, []);
    

  return (
    <div class="bg-white h-screen w-1/2 mx-auto mt-8">
        {
   len ? <div class="bg-white p-6  md:mx-auto">
   <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
       <path fill="currentColor"
           d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
       </path>
   </svg>
   <div class="text-center">
       <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
       <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
       <p> Have a great day!  </p>
       <div class="py-10 text-center">
           <a  class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3" href="/invoice">
               Reciept 
          </a>
       </div>
   </div>
</div>:<div class="bg-white p-6  md:mx-auto">
            {/* <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
                <path fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                </path>
            </svg> */}
            <div class="text-center">
                <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Unsuccessfull!</h3>
                <p class="text-gray-600 my-2">Please try again......</p>
                <p> Sorry !  </p>
                <div class="py-10 text-center">
                    <a href="/dashboard/subscriptions" class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                        BACK to payment 
                   </a>
                </div>
            </div>
        </div>
}        
      </div>
  );
}

export default Paymentreciept;
