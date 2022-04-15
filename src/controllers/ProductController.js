const Bill = require('../models/Bill')
const BillDetail = require('../models/BillDetail')
const Product = require('../models/Product')
const Review = require('../models/Review')

class ProductController {

    //[GET] /products (get all product + pagination)
    async getAllProducts(req, res) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 12

            const options = {
                page,
                limit,
                populate:'category'
            }
            
            const products = await Product.paginate({}, options)
            const { docs, ...others } = products
            res.status(200).json({ data: docs, ...others })
        } catch (err) {
            res.status(500).json({ errorMessage: "Error server" })
        }
    }

    //[GET] /products/:id (get a product)
    async getAProduct(req, res) {
        try {
            const product = await Product.findById(req.params.id).populate('category')
            if (!product) {
                res.status(400).json({ errorMessage: 'ID does not exist' })
            }
            else {
                res.status(200).json({ data: product })
            }

        } catch (err) {
            res.status(500).json({ errorMessage: "Error server" })
        }
    }

    //[POST] /products (create a product)
    async createAProduct(req, res) {
        try {
            const product = new Product(req.body)
            await product.save()
            res.status(200).json({ data: product })
        } catch (err) {
            res.status(500).json({ errorMessage: 'Error server' })
        }
    }

    //[PUT] /products/:id (update a product)
    async updateAProduct(req, res) {
        try {
            const product = new Product(req.body)
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body)
            if (!updatedProduct) {
                res.status(400).json({ errorMessage: 'ID does not exist' })
            }
            else {
                res.status(200).json({ data: product })
            }
           
        } catch (err) {
            res.status(500).json({ errorMessage: 'Error server' })
        }
    }

    //[DELETE] /products/:id (delete a product)
    async deleteAProduct(req, res) {
        try {
            const deleteProduct = await Product.findByIdAndDelete(req.params.id)
            if (!deleteProduct) {
                res.status(400).json({ errorMessage: 'ID does not exist' })
            }
            else {
                await Review.deleteMany({ product: req.params.id })
                const billDetails = await BillDetail.find({ product: req.params.id })
                const billDetailIds = []

                billDetails.forEach(billDetail => {
                    billDetailIds.push(billDetail.bill)
                })

                await BillDetail.deleteMany({ product: req.params.id })

                if(billDetailIds.length > 0){
                    await Bill.deleteMany({
                        _id: {
                            $in: billDetailIds
                        }
                    })
                }

                res.status(200).json({ message: 'Delete successfully' })
            }

        } catch (err) {
            res.status(500).json({ errorMessage: 'Error server' })
        }
    }

    //[GET] /products/:id/reviews (get reviews by product id)
    async getReviewsByProductId (req, res){
        try{
            const product = await Product.findById(req.params.id)
            if(!product){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                const page = parseInt(req.query.page) || 1
                const limit = parseInt(req.query.limit) * page || 12 * page
    
                const options = {
                    page,
                    limit,
                    skip: 0
                }

                const reviews = await Review.paginate({product: req.params.id}, options)
                const {docs, ...others} = reviews
                res.status(200).json({data: docs, ...others})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }


}

module.exports = new ProductController()