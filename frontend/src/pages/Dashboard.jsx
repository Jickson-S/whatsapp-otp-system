import {useEffect,useState} from "react";
import api from "../services/api";


function Dashboard(){


const [user,setUser]=useState(null);



useEffect(()=>{


const getProfile = async()=>{


const token =
localStorage.getItem("token");


const res = await api.get(

"/auth/profile",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



setUser(res.data);


};



getProfile();



},[]);




return (

<div>


<h2>
Customer Dashboard
</h2>



{
user &&

<div>


<p>
Name: {user.name}
</p>


<p>
Mobile: {user.mobile}
</p>


<p>
Verified:
{
user.isVerified
?
"Yes"
:
"No"
}

</p>


</div>

}



</div>

)


}


export default Dashboard;