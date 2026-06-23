const User = require("../models/User");

const OtpLog =require("../models/OtpLog");

// GET ALL USERS

exports.getUsers = async(req,res)=>{


try{


const users =
await User.find()
.select("-password -otp");


res.json(users);



}catch(error){

res.status(500).json({

message:error.message

});

}


};




// GET SINGLE USER

exports.getUser = async(req,res)=>{


const user =
await User.findById(
req.params.id
)
.select("-password -otp");



res.json(user);


};




// DELETE USER

exports.deleteUser = async(req,res)=>{


await User.findByIdAndDelete(

req.params.id

);



res.json({

message:"User deleted"

});


};




// BLOCK USER

exports.blockUser = async(req,res)=>{


const user =
await User.findById(

req.params.id

);



user.blocked =
!user.blocked;



await user.save();



res.json({

message:"User status updated",

blocked:user.blocked

});


};