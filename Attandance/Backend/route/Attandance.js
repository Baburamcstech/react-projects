const connection = require('../Database');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.post('/', (req,res)=>{
    const date= req.body.date;
    const Email = req.body.Email;
    const IsPresent = req.body.IsPresent;

    const query = 'INSERT INTO AttendanceLogs (Email, date, IsPresent) values(?,?,?)';
    connection.query(query,[Email, date, IsPresent],(err,results)=>{
        if(err){
            console.log(err);
            res.json({status:400, error:err});
        }else{
            res.json({ status: 200, message: 'User inserted successfully' });
        }
    })
})
module.exports=router;
