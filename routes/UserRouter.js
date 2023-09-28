const express = require("express");
const userRouter = express.Router();
const UserModel = require("../model/userModle")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
userRouter.post("/register", async (req, res) => {
    const { username, avatar, email, password } = req.body;

    try {
        let existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({ "msg": "User is Already exists try another email." })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).send({ err })
                } else {
                    let user = new UserModel({ username, avatar, email, password: hash })
                    await user.save()
                    res.status(200).send({"msg":"user Registered Successfully!!", user })
                }
            });
        }

    } catch (error) {
        res.status(400).send({ "err": error.measaage })
    }
})

userRouter.post("/login", async (req, res) => {
    const {  email, password } = req.body;

    try {
        let existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            bcrypt.compare(password, existingUser.password, async(err, result) =>{
                   if(result){
                    var token = jwt.sign({ userId:existingUser._id,username:existingUser.username }, "gullu");
                    res.status(200).send({"msg":"login successful", token })
                   }else{
                    res.status(200).send({"msg":"login failed" })
                   }
            }); 
        }

    } catch (error) {
        res.status(400).send({ "err": error.measaage })
    }
})


module.exports = userRouter;