const express = require("express")
const app = express()
const items = require("./routes/items")
const port = 3330
const test = require("./mongoDB")
app.use((req,res,next)=>{

  next()
})
app.get("/",(req,res)=>{
  res.send("it be working")
  })

app.use("/items",items)
app.listen(port,"0.0.0.0",()=>{
  console.log("done!")
})