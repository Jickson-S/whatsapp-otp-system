import {useState} from "react";
import api from "../services/api";


function Register(){


const [form,setForm]=useState({

name:"",
mobile:"",
password:""

});


const submit=async()=>{


const res =
await api.post(
"/auth/register",
form
);


alert(res.data.message);


};



return (

<div>


<h2>Register</h2>


<input
placeholder="Name"
onChange={
e=>setForm({
...form,
name:e.target.value
})
}
/>


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
placeholder="Password"
type="password"
onChange={
e=>setForm({
...form,
password:e.target.value
})
}
/>


<button onClick={submit}>
Register
</button>


</div>

)

}


export default Register;