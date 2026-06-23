import {useEffect,useState} from "react";
import api from "../services/api";


function Dashboard(){


const [data,setData]=useState({});



useEffect(()=>{


api.get(
"/admin/dashboard"
)
.then(res=>{

setData(res.data);

});


},[]);



return (

<div>


<h1>
Admin Dashboard
</h1>


<h3>
Total Users:
{data.users}
</h3>


<h3>
OTP Sent:
{data.otpSent}
</h3>


<h3>
OTP Success:
{data.otpSuccess}
</h3>


<h3>
OTP Failed:
{data.otpFailed}
</h3>



</div>

)

}


export default Dashboard;