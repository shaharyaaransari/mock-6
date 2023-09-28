const express = require("express");
const BlogRouter = express.Router();
const auth = require("../middleware/auth");
const BlogModel = require("../model/Blog");
BlogRouter.get("/blog", auth, async (req, res) => {


    try {
        let blog = await BlogModel.find()
        res.status(200).send(blog)

    } catch (error) {
        res.status(400).send({ "err": error.measaage })
    }
})

BlogRouter.post("/blogs", auth, async (req, res) => {
    const { title, content, category, date, likes, comments } = req.body

    try {
        let blog = new BlogModel({
            title, content, category, date, likes, comments, userId: req.userId, username: req.username
        })
        await blog.save()
        res.status(200).send(blog)

    } catch (error) {
        res.status(400).send({ "err": error.measaage })
    }
})


BlogRouter.delete("/blogs/:id", auth, async (req, res) => {
    const { id} = req.params

    try {
         const deleteBlog = await BlogModel.findByIdAndDelete(id) 
         if(!deleteBlog){
              return res.status(400).send({error:"Blog Not Found"})
         }else{
            req.status(200).send({"msg":"Blog is been Deleted!"})
         }
    } catch (error) {
        res.status(400).send({ "err": error.measaage })
    }
})

BlogRouter.patch("/blogs/:id", auth, async (req, res) => {
    const { id} = req.params

    try {
         const updateBlog = await BlogModel.findByIdAndUpdate(id,req.body) 
              res.status(200).send({updateBlog})
    } catch (error) {
        res.status(400).send({ "err": error.measaage })
    }
})


module.exports = BlogRouter;