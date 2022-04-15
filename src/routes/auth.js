const express = require('express')
const route = express.Router()

const AuthController = require('../controllers/AuthController')

//Create a new  user
route.post('/register',  AuthController.registerUser)

//Login user
route.post('/login', AuthController.loginUser)

module.exports = route