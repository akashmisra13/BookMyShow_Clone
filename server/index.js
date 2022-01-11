const express= require("express");
const app= express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")



dotenv.config({path: './config.env'})
require('./DataBase/conn')

// middleare
app.use(express.json())
// app.use(cookieParser())

//linking router files
app.use(require('./routes/auth'))

app.get('/', (req,res)=>{
    res.send("hello from homepge server");
})


const Port= process.env.PORT
app.listen(Port, ()=>{
    console.log(`server running at ${Port}`);
})