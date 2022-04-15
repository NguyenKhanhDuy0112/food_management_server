const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema

const BillSchema = new Schema({
    type: {
        type: String,
        required: true,
        default: "",
    },
    description: {
        type: String,
        require: true,
        default: ""
    },
    status: {
        type: String,
        default: ""
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        default: null
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: "providers",
        default: null
    },
    coupon: {
        type: Schema.Types.ObjectId,
        ref: "coupons"
    }
}, {
    timestamps: true
})

BillSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('bills', BillSchema)