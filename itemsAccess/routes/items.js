const express = require("express")
const app = express()
const router = express.Router()
const dbConnect = require("../mongoDB")
router.get("/collection",async (req,res)=>{
    res.json(await dbConnect.getCollection())
})

router.get("/:sub_category",async (req,res)=>{
    let info
    if(Object.keys(req.query).length === 0){
        info = await dbConnect.getAllItems(req.params.sub_category)
    }else{
        info = await dbConnect.getFilteredItems(req.params.sub_category,req.query)
    }
    res.send(info)
    res.end()
})

router.get("/:sub_category/:identifier",async (req,res)=>{
    let info = await dbConnect.getSingleItem(req.params.sub_category,req.params.identifier)
    res.send(info)
    res.end()
})



module.exports = router