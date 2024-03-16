var mysql = require('mysql');
require('dotenv').config;
const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "Babus@2005",
    database: "attandance"

})
module.exports=connection;