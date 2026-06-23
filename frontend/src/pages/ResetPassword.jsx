import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";


function ResetPassword(){


const navigate = useNavigate();



const [form,setForm]=useState({

mobile:"",
otp:"",
password:""

});




const reset=async()=>{


try{


await api.post(

"/auth/verify-reset-otp",

{

mobile:form.mobile,

otp:form.otp

}

);



await api.post(

"/auth/reset-password",

{

mobile:form.mobile,

password:form.password

}

);



alert(
"Password Updated"
);



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
Reset Password
</h2>



<input

placeholder="Mobile"

onChange={
e=>setForm({

...form,

mobile:e.target.value

})

}

/>



<input

placeholder="OTP"

onChange={
e=>setForm({

...form,

otp:e.target.value

})

}

/>



<input

type="password"

placeholder="New Password"

onChange={
e=>setForm({

...form,

password:e.target.value

})

}

/>



<button onClick={reset}>

Reset Password

</button>


</div>

)

}


export default ResetPassword;