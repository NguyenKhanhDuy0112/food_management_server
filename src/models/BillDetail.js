const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BillDetailSchema = new Schema({
    price:{
        type: String,
        required: true,
        default: "",
    },
    quantity: {
        type: String, 
        require: true,
        default: ""
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    bill: {
        type: Schema.Types.ObjectId,
        ref: "bills"
    }
    
})

module.exports =  mongoose.model('billDetails', BillDetailSchema)