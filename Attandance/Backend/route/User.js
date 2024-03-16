const connection = require('../Database');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.post('/', (req,res)=>{
    const Name = req.body.Name;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const Department = req.body.Department;
    const query = 'INSERT INTO Users (Name, Email, password, Department) VALUES (?, ?, ?, ?)';
    connection.query(query, [Name, Email, Password, Department], (err, results) => {
        if (err) {
            console.log(err);
            res.json({ status: 400, error: err });
        } else {
            // Handle successful insertion
            res.json({ status: 200, message: 'User inserted successfully' });
        }
    });
    
})
module.exports=router;
