const mongoose = require('mongoose')

const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema

const ProviderSchema = new Schema({
    
    name: {
        type: String,
        default: "",
    },
    address : {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: "https://lh3.googleusercontent.com/a-/AOh14GjOEsZKXo5a7zw7LemJRWrl2F21-q3e0hGM7iRI=s400",
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    }
})

ProviderSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('providers', ProviderSchema)