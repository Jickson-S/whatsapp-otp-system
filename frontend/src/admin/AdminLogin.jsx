import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";


function AdminLogin(){


const nav=useNavigate();


const [form,setForm]=useState({

email:"",

password:""

});



const login=async()=>{


const res =
await api.post(

"/admin-auth/login",

form

);



localStorage.setItem(

"adminToken",

res.data.token

);



nav("/admin/dashboard");


};



return (

<div>


<h2>
Admin Login
</h2>


<input

placeholder="Email"

onChange={
e=>setForm({

...form,

email:e.target.value

})

}

/>


<input

type="password"

placeholder="Password"

onChange={
e=>setForm({

...form,

password:e.target.value

})

}

/>


<button onClick={login}>

Login

</button>


</div>

)

}


export default AdminLogin;