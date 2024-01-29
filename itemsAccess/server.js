const express = require("express")
const app = express()
const items = require("./routes/items")
const port = 3330
const test = require("./mongoDB")
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:1510');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next()
})
app.get("/",(req,res)=>{
  
  req.next()
})

app.use("/items",items)
app.listen(port,"0.0.0.0",()=>{
  console.log("alive")
})
