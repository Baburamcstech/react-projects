const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const user = require("../models2/user");
//insert into database
const createUser=async (req, res) => {
     console.log(req.body);
  try {
    const salt=bcrypt.genSaltSync(10);
    const newUser = new user({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,salt),
      address:req.body.address
    });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    console.log(err);
  }
}
//update
const updateUser=async(req,res)=>{
    const updateUser2=await user.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    res.status(200).json( updateUser2)
}
const deleteUser=async(req,res)=>{
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("deleteUser")

}
//get
const getbyId=async(req,res)=>{
    const user= await user.findById(req.params.id);
      res.status(200).json(user)
  
  }
  //get all
  const getAll=async(req,res)=>{
    const user= await user.find();
     res.status(200).json(user)
 
 }
module.exports.createUser=createUser;
module.exports.deleteUser=deleteUser;
module.exports.updateUser=updateUser;
module.exports.getbyId=getbyId;
module.exports.getAll=getAll;
                   