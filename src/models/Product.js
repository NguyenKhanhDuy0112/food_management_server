
const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema
mongoose.plugin(slug)

const ProductShema = new Schema({
    sku:{
        type: String,
        default: ""
    },
    imageBanner: {
        type: String,
        default: "",
    },
    imageSub: {
        type: [String],
    },
    name: {
        type: String, 
        require: true,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    quantity: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    unit: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: 0,
    },
    published: {
        type: Boolean,
        default: true,
    },
    stars: {    
        type: Number,
        default: 0
    },
    slug: {
        type: String, 
        slug: 'name', 
        unique: true
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    }
})

ProductShema.plugin(mongoosePaginate)


module.exports =  mongoose.model('products', ProductShema)