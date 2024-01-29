const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const users = require("./models/users-model")
const connectToDB = require("./mongoDB")

router.post("/",async (req,res)=>{
    connectToDB()
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        createUser(req.body,hashedPassword)
        res.sendStatus(200)
    }catch{
        res.sendStatus(500)
    }
   
})
async function createUser(user,encryptedPassword){
    await users.create({
        username:user.username,
        password: encryptedPassword,
        first_name:user.first_name,
        last_name:user.last_name,
        favorite_song:user.favorite_song,
        
    })
}
module.exports = router