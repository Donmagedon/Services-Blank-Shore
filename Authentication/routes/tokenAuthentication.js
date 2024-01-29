const express = require("express")
const { route } = require("./register")
const router = express.Router()
const userModel = require("./models/users-model")
const jwt = require("jsonwebtoken")
const connectToDB = require("./mongoDB")
router
.get("/",tokenAuthenticate,sendAttributes)
.post("/update-cart",tokenAuthenticate,addShoppingCart)
.post("/update",tokenAuthenticate,updateDetails)
.delete("/remove-item/:shoppingItemName",tokenAuthenticate,removeShoppingCart)
function tokenAuthenticate(req,res,next){
    const auth = req.headers["authorization"]
    const token = auth.split(" ")[1]
    if(!token){
        res.sendStatus(401,"token is not found")
    }
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
        if(err){
            return res.sendStatus(403,"there was an error") 
        }
        req.user = user
    
    })
    next()


}
async function addShoppingCart(req,res,next){
    const user = req.user.sub
    const shoppingCart = req.body.shopping

    res.json(req.body.shopping)
    connectToDB()
    await userModel.updateOne({username:user},{$push:{shopping_cart:shoppingCart}}) 
}
async function removeShoppingCart(req,res, next){
    const user = req.user.sub
    const query = req.params.shoppingItemName
    connectToDB()
    await userModel.updateOne({username:user},{$pull:{shopping_cart:{name:query}}})
}
async function updateDetails(req,res,next){
    const query = req.body.update
    const user = req.user.sub
    function sanitizedQuery(){
        return Object.entries(query)
        .filter((key)=>{
           return key[0] !== "password"
        })
        .reduce((acc,curr)=>{
            return {...acc,[curr[0]]:curr[1]}
        },{})
        
    }
        connectToDB()
        await userModel.updateOne({username:user},sanitizedQuery())
        .then(()=>{
            res.sendStatus(200)
        }).catch((err)=>{
            res.sendStatus(401)
        })
        



}


async function sendAttributes(req,res,next){
    const user = req.user.sub
    connectToDB()
    const query = await userModel.findOne({username:user})

    res.json(query)
}
module.exports = router