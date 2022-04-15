const express = require('express')
const route = express.Router()

const UserController = require('../controllers/UserController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

//Get all users
route.get('/', AuthMiddleware.verifyToken , UserController.getAllUsers)

//Delete a user
route.delete('/:id', AuthMiddleware.verifyTokenAndAdminAuth, UserController.deleteAnUser)




module.exports = route