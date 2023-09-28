const mongoose  = require("mongoose");

 const UserScehma = mongoose.Schema({
    username:{type:String,require:true},
    avatar:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},

 }) 


   const UserModel = mongoose.model("userDetail",UserScehma)


   module.exports = UserModel;


