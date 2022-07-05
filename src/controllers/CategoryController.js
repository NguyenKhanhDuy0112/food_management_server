const Category = require('../models/Category')
const Product = require('../models/Product')

class CategoryController{

    //[GET] /categories (get all categories)
    async getAllCategories(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 12

            const options = {
                page,
                limit
            }

            const categories = await  Category.paginate({}, options)
            const {docs, ...others} = categories
            res.status(200).json({data: docs, ...others})
          
        }catch(err){
            res.status(500).json({errorMessage: "Error server"})
        }
    }
 
    //[POST] /categories (create new category)
    async createACategory(req, res){
        try{
            const category = new Category(req.body)
            await category.save() 
            res.status(200).json({data: category})
        }catch(err){
            res.status(500).json({errorMessage: "Error server"})
        }
    }

    //[GET] /categories/:id (get a category)
    async getACategory(req, res) {
        try{
            const category = await Category.findById(req.params.id)
            if(!category){
                 res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                 res.status(200).json({data: category})
            }
        }catch(err){
            res.status(500).json({errorMessage: "Error server"})
        }
    }

    //[PUT] /categories/:id (update category)
    async updateACategory(req, res){
        try{
            const category = await Category.findById(req.params.id)
            if(!category){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                await category.updateOne(req.body)
                const newCategory = await Category.findById(req.params.id)
                res.status(200).json({data: newCategory})
            }
            
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[DELETE] /categories/:id (delete a category)
    async deleteACategory(req, res){
        try{
            const category = await Category.findByIdAndDelete(req.params.id)
            if(!category){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                await Product.deleteMany({category: req.params.id})
                res.status(200).json({message: 'Delete successfully'})
            }
            
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[GET] /categories:/id/products (get products by category id)
    async getProductsByCategoryId (req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 12

            const options = {
                page,
                limit
            }

            const category = await Category.findById(req.params.id)
            if(!category){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                const products = await Product.paginate({category: req.params.id}, options)
                const {docs, ...others} = products
                res.status(200).json({data: docs, ...others})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

}

module.exports = new CategoryController()