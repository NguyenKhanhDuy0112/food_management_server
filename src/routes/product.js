const express = require('express')
const route = express.Router()


const ProductController = require('../controllers/ProductController')

//Get all product
route.get('/', ProductController.getAllProducts)

//Create product
route.post('/',ProductController.createAProduct)

//Get all reviews by product id
route.get('/:id/reviews', ProductController.getReviewsByProductId)

//Get a product
route.get('/:id', ProductController.getAProduct)

//Delete a product
route.delete('/:id', ProductController.deleteAProduct)

//Update a product
route.put('/:id', ProductController.updateAProduct)





module.exports = route