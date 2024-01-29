const mongoose = require("mongoose")
async function connectToDB(){
    const URI = `mongodb+srv://donmagedon7:${process.env.DB_PASSWORD}@cluster0.lnwbnuf.mongodb.net/?retryWrites=true&w=majority`
    try{
        await mongoose.connect(URI,{dbName:"Users"})
        console.log("DB connected!")

    }catch(err){
        throw new Error(err)
    }
}
module.exports = connectToDB