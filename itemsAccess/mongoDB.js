const express = require("express")
const app = express()
const router = express.Router()
const mongoose = require("mongoose")
const items = require("./schemas")
const itemsModel = mongoose.model("Items",items)
const fs = require("fs")
const path = require("path")
const { MongoDBCollectionNamespace } = require("mongodb")

function addToDB(){
  current.forEach(entry => {
    const img_path = entry.img_path
    const img_data = fs.readFileSync(img_path)
    const toBinary = Buffer.from(img_data).toString("base64")
    itemsModel.create({
        name:entry.name,
        price:entry.price,
        season_compatibility:entry.season_compatibility,
        category:entry.category,
        manufacturer:entry.manufacturer,
        img_path:toBinary,
        sub_category:entry.sub_category,
        type_details:entry.type_details,
    }).then(()=> console.log("added successfully")).catch((err)=> {throw new Error(err)})
})
}
async function connectDB(){
try{
    await mongoose.connect(`mongodb+srv://donmagedon7:${process.env.MONGODB_PASSWORD}@cluster0.lnwbnuf.mongodb.net/?retryWrites=true&w=majority`,{dbName:"EcommerceShop"})
}catch(error){
    throw new Error(error)
}}

async function getAllItems(sub_cat){
    let result = {}
    await connectDB()
    .then(async (data)=>{
        result = itemsModel.find({sub_category:sub_cat}).exec()

    })
    return result
}

async function getFilteredItems(current_route,queryParams){
    let baseQuery = [{sub_category:current_route}]
    let result = {}
    let filterPrice = function(raw){
    let operatorName = raw.split(",")
    let splitNumbers = operatorName[1].split("/")
    let lonePrice = splitNumbers[0]
    let secondPrice = splitNumbers[1]
    let query 
    if(operatorName[0] === "lt"){
          query = {price:{$lt:lonePrice}}
    }
    if(operatorName[0] === "bt"){
        query = {price:{$lt:secondPrice,$gt:lonePrice}}
    }
    if(operatorName[0] === "gt"){
        query = {price:{$gt:lonePrice}}
    }
    baseQuery.push(query)
    }
    let filterSpecificType = function(raw){
      let typeName = raw.split(",")[0]
      let typeValue = raw.split(",")[1]
      let query 
      if(typeName === "fit"){
       query = {"type_details.fit":typeValue}
      } 
      if(typeName === "fashion"){
        query = {"type_details.fashion":typeValue}

      }
      baseQuery.push(query)
    }
    
    let filterSeason = function(raw){
      let season = raw
      let query = {season_compatibility:`${season}`}
      baseQuery.push(query)
    }
    if(queryParams.price){
      filterPrice(queryParams.price)
    }
    if(queryParams.type){
      filterSpecificType(queryParams.type)
    }
    if(queryParams.season){
      filterSeason(queryParams.season)
    }
    let finalQuery = baseQuery.reduce((curr,acc)=>{
      return {...curr,...acc}
    },{})
    await connectDB().
    then(async(data)=>{
      console.log(finalQuery)
      result = await itemsModel.find(finalQuery)
      
    })
    return result
}
async function getSingleItem(current_route,identifier){
  let result = {}
  await connectDB()
  .then((data)=>{
    result = itemsModel.findOne({sub_category:current_route,name:identifier})
    
  })
  return result
}
async function getCollection(){
  connectDB()
      return await itemsModel.aggregate([
        { $sample: { size:6} }
    ])
}



module.exports = {getAllItems,getFilteredItems, addToDB,getSingleItem,itemsModel,connectDB,getCollection}