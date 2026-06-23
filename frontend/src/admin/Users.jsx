import {useEffect,useState} from "react";
import api from "../services/api";


function Users(){


const [users,setUsers]=useState([]);



const loadUsers=async()=>{


const res =
await api.get(
"/admin/users"
);


setUsers(res.data);


};



useEffect(()=>{

loadUsers();

},[]);





const remove=async(id)=>{


await api.delete(

`/admin/users/${id}`

);


loadUsers();


};




return (

<div>


<h2>
Users
</h2>



{
users.map(user=>(


<div key={user._id}>


<p>
{user.name}
</p>


<p>
{user.mobile}
</p>



<button
onClick={()=>
remove(user._id)
}
>

Delete

</button>



</div>


))

}



</div>

)


}


export default Users;