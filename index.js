const express = require("express");
const  mongoose  = require("mongoose");
const app = express();
  const cors = require("cors");
const userRouter = require("./routes/UserRouter");
const BlogRouter = require("./routes/BlogRouter");
require('dotenv').config()
  app.use(express.json())
  app.use(cors())
  app.use("/api",userRouter)
  app.use("/api",BlogRouter)

app.get("/",(req,res)=>{
       res.send("welcome HomePage!")
  })



 const connections = async()=>{
      try {
           await mongoose.connect(process.env.MONGO_URL)
              console.log("connected")
      } catch (error) {
         console.log(error)
      }
 }

app.listen(8080,()=>{
       connections()
       console.log("server is running...")
})