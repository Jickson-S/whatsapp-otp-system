import {useEffect,useState} from "react";
import api from "../services/api";


function WhatsAppStatus(){


const [status,setStatus]=useState({});



const load=async()=>{


const res =
await api.get(
"/whatsapp/status"
);


setStatus(res.data);


};



useEffect(()=>{

load();

},[]);




const logout=async()=>{


await api.post(
"/whatsapp/logout"
);


alert(
"Logged out"
);


load();


};




const restart=async()=>{


await api.post(
"/whatsapp/restart"
);


alert(
"Restarted"
);


};



return (

<div>


<h2>
WhatsApp Status
</h2>


<p>
Status:
{status.status}
</p>


<p>
Number:
{status.number}
</p>



<button onClick={restart}>

Restart Bot

</button>



<button onClick={logout}>

Logout

</button>



</div>

)

}


export default WhatsAppStatus;