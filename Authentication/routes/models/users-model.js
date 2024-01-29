const mongoose = require("mongoose")
const addressSchema = new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    address2:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    postal_code:String

})

const Users = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
},
items:Array,
first_name:String,
last_name:String,
favorite_song:String,
shopping_cart:Array,
addresses:[addressSchema]

})

module.exports = mongoose.model("users",Users)