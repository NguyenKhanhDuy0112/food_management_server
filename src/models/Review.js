const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    stars: {
        type: Number,
        default: 0,
    },
    content: {
        type:String,
        default: "",
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "products"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }

},{
    timestamps: true
})

ReviewSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('reviews', ReviewSchema)