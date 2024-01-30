require("dotenv").config()
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const register = require("./routes/register")
const login = require("./routes/login")
const tokenAuthenticate = require("./routes/tokenAuthentication")

app.use((req,res,next)=>{
    
    res.setHeader("Access-Control-Allow-Origin","https://blank-shore.web.app")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()    
})
    
app.use(express.json())
app.use("/api/register",register)
app.use("/api/login",login)
app.use("/api/userLoggedIn",tokenAuthenticate)
app.listen(3330,"0.0.0.0",()=>{
    console.log("app listening!")
})