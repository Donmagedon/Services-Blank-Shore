const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwtLib = require("jsonwebtoken")
const users = require("./models/users-model")
const connectToDB = require("./mongoDB")
router.post("/",foundUser,sendJWT)

async function sendJWT(req,res){
    if(!await userAuthenticated(req.body.username,req.body.password)){
        res.sendStatus(401)
    }else{
        const user = req.body.username
        const JWT = jwtLib.sign({},process.env.ACCESS_TOKEN,{
            expiresIn:"1d",
            subject:user,
        })
        res.status(200).json({
            authToken:JWT,
            expiresIn:""
        })
    }
}
async function userAuthenticated(username,password){
    connectToDB()
    const user =  await users.findOne({username:username})
    const encryptedPassword = user.password
    const isAuthenticated = await bcrypt.compare(password,encryptedPassword)
    return isAuthenticated
}
async function foundUser(req,res,next){
    connectToDB()
    const user =  await users.findOne({username:req.body.username})
    if(!user){
        res.sendStatus(401)
    }else{
        next()
    }
}
module.exports = router