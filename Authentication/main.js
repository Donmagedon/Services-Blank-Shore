require("dotenv").config()
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const register = require("./routes/register")
const login = require("./routes/login")
const tokenAuthenticate = require("./routes/tokenAuthentication")
const fs = require("fs")
const path = require("path")
const https = require("https")
const port = 3330

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
app.use("/",(req,res)=>{
    res.send("received")
})

app.listen(port,"0.0.0.0",()=>{
    console.log("auth is alive!")
})