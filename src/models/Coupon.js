const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema

const CouponSchema = new Schema({
    startDate:{
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date, 
        default: Date.now()
    },
    discount: {
        type: Number,
        default: 0,
    },
    miximumAmount: {
        type: Number,
        default: 0
    }
})

CouponSchema.plugin(mongoosePaginate)

module.exports =  mongoose.model('coupons', CouponSchema)