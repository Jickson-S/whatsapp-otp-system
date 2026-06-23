import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";


function Login(){


const navigate = useNavigate();


const [form,setForm] = useState({

mobile:"",
password:""

});



const login = async()=>{


try{


const res = await api.post(

"/auth/login",

form

);



localStorage.setItem(

"token",

res.data.token

);



alert(
res.data.message
);



navigate("/dashboard");



}catch(error){


alert(
error.response.data.message
);


}


};



return (

<div>


<h2>
Customer Login
</h2>



<input

placeholder="Mobile Number"

onChange={
e=>setForm({

...form,

mobile:e.target.value

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

);


}


export default Login;