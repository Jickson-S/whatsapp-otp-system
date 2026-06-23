import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";


function ForgotPassword(){


const navigate = useNavigate();


const [mobile,setMobile]=useState("");



const sendOTP=async()=>{


try{


const res =
await api.post(

"/auth/forgot-password",

{
mobile
}

);


alert(res.data.message);


navigate("/reset-password");



}catch(error){


alert(
error.response.data.message
);


}


};



return (

<div>


<h2>
Forgot Password
</h2>


<input

placeholder="Mobile Number"

onChange={
e=>setMobile(e.target.value)
}

/>


<button onClick={sendOTP}>

Send OTP

</button>


</div>

)


}


export default ForgotPassword;