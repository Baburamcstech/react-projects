const express=require('express');
const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken');
const user=require('../models2/user')
const router=express.Router();
router.route('/').get((req,res)=>{
    res.send("Hello ,this is auth endpoint")
})
router.post('/', async(req,res)=>{
    try{
    const user2=await user.findOne({username:req.body.username})
    if(!user2) return res.status(404).send("404 not correct");
    const isPasswordCorrect=await bcrypt.compare(req.body.password,user2.password);
    if(!isPasswordCorrect) return res.status(400).send("400 password not correct");

    const token =JWT.sign(
        {id:user._id,isAdmin:user.isAdmin}, "ss");
        
    const {password,isAdmin,...otherDetails } =user2._doc;
    res.cookie("access_token",token,{
        httpOnly:true,
    }).status(200).json({ ...otherDetails});
   // res.status(200).send("successfully login");
    } catch(err){
        console.log(err);
    }

});
module.exports = router;