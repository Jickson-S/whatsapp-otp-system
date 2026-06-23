import {useEffect,useState} from "react";
import api from "../services/api";


function Profile(){


const [user,setUser]=useState({});


const [name,setName]=useState("");



useEffect(()=>{


loadProfile();


},[]);



const loadProfile=async()=>{


const token =
localStorage.getItem("token");



const res =
await api.get(

"/user/profile",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);


setUser(res.data);

setName(res.data.name);


};




const update=async()=>{


const token =
localStorage.getItem("token");



await api.put(

"/user/profile",

{

name

},

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



alert(
"Profile Updated"
);


loadProfile();


};



return (

<div>


<h2>
My Profile
</h2>



<p>
Mobile:
{user.mobile}
</p>



<input

value={name}

onChange={
e=>setName(e.target.value)
}

/>



<button onClick={update}>

Update

</button>



</div>

);


}


export default Profile;