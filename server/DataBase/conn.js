const mongoose = require("mongoose")

const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log("connected to database");
}).catch((err)=> console.log("connection failed"))

module.exports=mongoose