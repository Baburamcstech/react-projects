const express=require('express');
const mongoose=require('mongoose');
const cookie=require('cookie-parser');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
//const authRoute = require('./routes/auth.js')
const authRoute =require('./routes/auth');
const roomsRoute =require('./routes/rooms');
const hostelsRoute =require('./routes/hotels');
const usersRoute =require('./routes/users');
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/lama', {useNewUrlParser:true})
.then(()=>{
    console.log("MONGO CONNECTION OPEN!!!")
})
//middleware
app.use(cookie());
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=>{
    next();
})
app.use(express.json())
app.use("/auth",authRoute);
app.use("/hotels",hostelsRoute);
app.use("/rooms",roomsRoute);
app.use("/users",usersRoute);
app.get('/',(rq,res)=>{
    res.send("connected");
})
app.use((err,req,res,next)=>{
    const errorStatus=err.status || "500"
    const errorMessage=err.message || "Something went wrong!!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    });
    
});
const port=3082
app.listen(port|| process.env.PORT, () => {
    console.log(`Listening ${process.env.NODE_MODE} on port ${port}`);
});