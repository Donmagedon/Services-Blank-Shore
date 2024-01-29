const mongoose = require("mongoose")
const {Schema} = mongoose
const items = new Schema({
    name:{
        required:true,
        type:String,
    },
    price:{
        required:true,
        type:Number,
    },
    season_compatibility:{
        required:true,
        type:[String],
    },
    category:{
        required:true,
        type:[String],
    },
    manufacturer:{
        required:true,
        type:String
    },
    sub_category:{
        required:true,
        type:[String],
    },
    img_path:{
        required:true,
        type:String,

    },
    type_details:Object

})

module.exports = items