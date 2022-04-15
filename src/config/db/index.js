const mongoose = require('mongoose')

async function connect() {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connect success to DB")
    }catch(err){
        console.log("Connect error")
    }
}

module.exports = {connect}