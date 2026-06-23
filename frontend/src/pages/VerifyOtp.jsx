import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";


function VerifyOtp(){


const navigate = useNavigate();


const [data,setData] = useState({

mobile:"",
otp:""

});



const verify = async()=>{


try{


const res = await api.post(

"/auth/verify-register-otp",

data

);



alert(res.data.message);



navigate("/login");



}catch(error){


alert(
error.response.data.message
);


}



};



return (

<div>


<h2>
Verify WhatsApp OTP
</h2>



<input

placeholder="Mobile Number"

onChange={
e=>setData({

...data,

mobile:e.target.value

})
}

/>



<input

placeholder="Enter OTP"

onChange={
e=>setData({

...data,

otp:e.target.value

})
}

/>



<button onClick={verify}>

Verify OTP

</button>
<button>

Resend OTP

</button>

</div>


)


}


export default VerifyOtp;