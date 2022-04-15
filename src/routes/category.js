const express = require('express')
const route = express.Router()


const CategoryController = require('../controllers/CategoryController')

//Get all category
route.get('/', CategoryController.getAllCategories)

//Create category
route.post('/',CategoryController.createACategory)

//Get all product by category Id
route.get('/:id/products', CategoryController.getProductsByCategoryId)

//Get a category
route.get('/:id', CategoryController.getACategory)

//Delete a category
route.delete('/:id', CategoryController.deleteACategory)

//Update a category
route.put('/:id', CategoryController.updateACategory)



module.exports = route