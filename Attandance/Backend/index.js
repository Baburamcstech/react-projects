const express = require('express');
const connection = require('./Database');
const attandance = require('./route/Attandance.js');
const User = require('./route/User.js');
require('dotenv').config();
const app= express();
const port = process.env.PORT;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: [
        'http://localhost:3000', 'http://localhost:3005'
    ],
    credentials: true,
}))
app.use('/user', User );
app.use('/attandance', attandance);
app.listen(port, (req,res)=>{
    console.log(`Running on ${port}!!`)
    connection.connect(function(err) {
        if (err) console.log(err);
        else {
            console.log("Connected to MySQL");
        }
    });
})