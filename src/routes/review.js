const express = require('express')
const route = express.Router()

const ReviewController = require('../controllers/ReviewController')

//Get all review
route.get('/', ReviewController.getAllReviews)

//Create review
route.post('/',ReviewController.createAReview)

//Get a review
route.get('/:id', ReviewController.getAReview)

//Delete a review
route.delete('/:id', ReviewController.deleteAReview)

//Update a review
route.put('/:id', ReviewController.updateAReview)



module.exports = route