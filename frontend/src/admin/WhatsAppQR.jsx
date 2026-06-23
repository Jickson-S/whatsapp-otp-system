import {useEffect,useState} from "react";
import {io} from "socket.io-client";


const socket =
io("https://whatsapp-otp-system.vercel.app/");



function WhatsAppQR(){


const [qr,setQr]=useState("");

const [status,setStatus]=useState("");



useEffect(()=>{


socket.on(
"whatsapp-qr",
(data)=>{

setQr(data);

setStatus(
"Scan QR Code"
);

}

);



socket.on(
"whatsapp-status",
(data)=>{

setStatus(
data.status
);

}

);



},[]);




return (

<div>


<h2>
WhatsApp Connect
</h2>



<h3>
{status}
</h3>



{
qr &&

<img

src={qr}

width="250"

/>

}



</div>

)

}


export default WhatsAppQR;