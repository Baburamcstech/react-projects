const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const bcrypt=require('bcrypt');
const cookie=require('cookie-parser');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');
const {v4:uuidv4}=require('uuid');
const cookieParser = require('cookie-parser');
const app=express();
app.use(cors());

app.use(cookieParser());

// middlewares 
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"company"
     
})
con.connect(function(err){
    if(err){
        console.log("Error in connection");
    } else{
        console.log("Connected!!");
    }
})
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'public/images')
//     },
//     filename: (req,file,cb)=>{
//         cb(null,file.fieldname + "_" + Date.now()+ path.extname(file.originalname));
//     }
// })
// const upload=multer({
//     storage:storage
// })
app.post('/login',async (req,res)=>{
    const Email=req.body.Email;
    const Password=req.body.Password;
    // console.log(email,password);
    // console.log(req.body);
    // testsql =select * from users where email="sonu@gmail.com" and pass="sonu123"
     const sql="select * from users";
     con.query(sql,(err,result,fields)=>{
        if(err)return res.json({Status: "Error",Error: "Error in running query"});
        //  if(result.length>0){
        //     return req.json({Status:"Success"})
        //  } else{
        //     return res.json({Status:"Error",Error: "Wrong email or paasword"});
        //  }
        // console.log(result);
        // const saltRounds=10;
        // const pass= bcrypt.hash(req.body.Password,saltRounds);
        // const login=async (pass,hashedPw)=>{
        //     const result=await bcrypt.compare(pw,hashedPw);
        //     if(result){
        // console.log("Logged in");
        //     }else{
        //         console.log("Incorrect!");
        //     }
        // }
        let flag=false;
        result.forEach(element => {
            if(element.email==Email && element.pass==Password){
                flag=true;
            }
        });
        if(flag) return res.json({Status:"Success"})
        else return res.json({Status:"Error",Error: "Wrong email or paasword"});
     })
})
app.post('/registration',async(req,res)=>{
    const id=uuidv4();
    const name=req.body.Name;
    const email=req.body.Email;
    const saltRounds = 10;
    const pass=await bcrypt.hash(req.body.Password,saltRounds);
    var sql="insert into users (Id,Name,email,Pass) values ('"+id+"', '"+name +"','" +email +"','" +pass+"')"; 

    console.log(name);
    console.log(email);
    console.log(pass);
    values=[id,name,email,pass];
    // con.query(sql,{id,name,email,pass});
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        else{
            return res.json({Status:"Success"});
        }
        console.log("Number of records inserted: " + result.affectedRows);
      });
})
app.get('/get_admin',(req,res)=>{
    const sql="select * from users";
    con.query(sql ,(err,result)=>{
        if(err){
            console.log("hi");
             return res.json({Error:"Error in get_admin"});
        }
        else{
            
            return res.json({Status:"success",Result:result})
        }
    })
})
app.listen(8081,()=>{
    console.log("Running");  
})