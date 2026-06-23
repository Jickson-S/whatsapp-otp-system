const {
client
}=require("../services/whatsapp");



exports.status = async(req,res)=>{


try{


if(client.info){


return res.json({

status:"CONNECTED",

number:
client.info.wid.user


});


}



res.json({

status:"DISCONNECTED"

});


}catch(error){


res.status(500).json({

message:error.message

});


}


};





exports.logout = async(req,res)=>{


try{


await client.logout();



res.json({

message:"WhatsApp logged out"

});



}catch(error){


res.status(500).json({

message:error.message

});

}


};





exports.restart = async(req,res)=>{


try{


await client.destroy();


client.initialize();



res.json({

message:"Bot restarted"

});



}catch(error){


res.status(500).json({

message:error.message

});


}


};