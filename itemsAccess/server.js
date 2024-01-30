const express = require("express")
const app = express()
const items = require("./routes/items")
const port = 2020
const test = require("./mongoDB")
const dotenv = require("dotenv")
dotenv.config()

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:1510")
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next()
}
)
 
app.get("/",(req,res)=>{
  res.send("it be working")
  })

app.use("/items",items)
app.listen(port,"0.0.0.0",()=>{
})