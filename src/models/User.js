const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserChema = new Schema({
    userName: {
        type: String,
        required: true,
        default: "",
        unique: true,
    },
    password: {
        type: String,
        default: "",
        require: true
    },
    avatar: {
        type: String,
        default: "https://lh3.googleusercontent.com/a-/AOh14GjOEsZKXo5a7zw7LemJRWrl2F21-q3e0hGM7iRI=s400",
    },
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String, 
        default: ""
    },
    address : {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    email: {
        type: String,
        default: ""
    }
},{
    timestamps: true
})

module.exports = mongoose.model('users', UserChema)