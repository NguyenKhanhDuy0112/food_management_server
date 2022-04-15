const Review = require('../models/Review')

class ReviewController {

    //[GET] /reviews (get all reviews)
    async getAllReviews(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) * page || 12 * page

            const options = {
                page,
                limit,
            }
            const reviews = await Review.paginate({}, options)
            const { docs, ...others } = reviews
            
            res.status(200).json({data: reviews})
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }
    //[GET] /reviews/:id (get a reviews)
    async getAReview(req, res) {
        try{
            const review = await Review.findById(req.params.id)
            if(!review){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                res.status(200).json({data: review})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[POST] /reviews (create a reviews)
    async createAReview(req, res) {
        try{
            const review = new Review(req.body)
            const savedReview = await review.save()
            res.status(200).json({data: savedReview})
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[PUT] /reviews/:id (update a reviews)
    async updateAReview(req, res) {
        try{
            const review = new Review(req.body)
            const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body)
            if (!updatedReview) {
                res.status(400).json({ errorMessage: 'ID does not exist' })
            }
            else {
                res.status(200).json({ data: review })
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[DELETE] /reviews/:id (delete a reviews)
    async deleteAReview(req, res) {
        try{
            const deletedReview = await Review.findByIdAndDelete(req.params.id)
            if(!deletedReview){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                res.status(200).json({message: 'Delete successfully'})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

}

module.exports = new ReviewController()