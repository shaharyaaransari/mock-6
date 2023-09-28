const mongoose  = require("mongoose");
   const commentScehma = mongoose.Schema({
    username:{type:String,require:true},
    content:{type:String,require:true},
   })
 const BlogScehma = mongoose.Schema({
    username:{type:String,require:true},
    title:{type:String,require:true},
    content:{type:String,require:true},
    category:{type:String,require:true},
    date:{type:String,require:true},
    likes:{type:Number,require:true},
     comments:{type:[commentScehma]}
 }) 


   const BlogModel = mongoose.model("Blog",BlogScehma)


   module.exports = BlogModel;


