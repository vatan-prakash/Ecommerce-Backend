//starting of project
const express= require("express")
const mongoose=require("mongoose")
const app=express()
const server_config= require("./configs/server.config")
const db_config= require("./configs/db.config")
// const { init } = require("./models/user.model")
const user_model= require("./models/user.model")
const bcrypt= require("bcryptjs")
//admin user if not present

//connect with mongodb
mongoose.connect(db_config.DB_URL)  
const db=mongoose.connection
db.on("error",()=>{
    console.log('Error while connecting to mongoDB')
})
db.once("open",()=>{
    console.log("Connected to db ")
    init()
})

async function init(){
    let user = await user_model.findOne({userId:"admin"})

    if(user){
        console.log("Admin already present")
        return
    }

    try{
        user = await user_model.create({
            name:"Vishwa",
            userId:"admin",
            email:"vatanpra867@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("Welcome1",8)
        })
        console.log("admin created ",user)
    }
    catch(err){
        console.log("Erroe while create admin",err)
    }
}
app.listen(server_config.PORT,()=>{
    console.log("Server started at num:", server_config.PORT)
})  