const express=require("express");

const router=express.Router();


const {

getUsers,

getUser,

deleteUser,

blockUser

}=require("../controllers/adminUserController");



router.get(
"/users",
getUsers
);



router.get(
"/users/:id",
getUser
);



router.delete(
"/users/:id",
deleteUser
);



router.put(
"/users/block/:id",
blockUser
);



module.exports=router;