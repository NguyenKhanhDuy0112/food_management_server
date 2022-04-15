const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    cateId:{
        type: String,
        required: true,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    name: {
        type: String, 
        require: true,
        default: ""
    }
})

CategorySchema.plugin(mongoosePaginate)

module.exports =  mongoose.model('categories', CategorySchema)