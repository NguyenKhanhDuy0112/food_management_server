const Bill = require('../models/Bill')
const Coupon = require('../models/Coupon')

class CouponController{

    //[GET] /coupons (get all coupons)
    async getAllCoupons (req, res){
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 12

        const options = {
            page,
            limit
        }

        const coupons = await  Coupon.paginate({}, options)
        const {docs, ...others} = coupons
        res.status(200).json({data: docs, ...others})
    }

    //[POST] /coupons (create a coupon)
    async createACoupon(req, res){
        try{
            const coupon = new Coupon(req.body)
            await coupon.save()
            res.status(200).json({data: coupon})
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[GET] /coupons/:id (get a coupon)
    async getACoupon(req, res){
        try{
            const coupon = await Coupon.findById(req.params.id)
            if(!coupon){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                res.status(200).json({data: coupon})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[PUT] /coupons/:id (update a Coupon)
    async updateACoupon(req, res){
        try{
            const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body)
            if(!updatedCoupon){
               res.status(400).json({errorMessage: 'ID does not exist'})     
            }
            else{
                const coupon = await Coupon.findById(req.params.id)
                res.status(200).json({data: coupon})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[DELETE] /coupons/:id (delete a coupon)
    async deleteACoupon(req, res){
        try{
            const bills = await Bill.find({coupon: req.params.id})
            if(bills.length > 0){
                res.status(400).json({errorMessage: 'Delete failed'})
            }
            else{
                await Bill.deleteOne({_id: req.params.id})
                res.status(200).json({message: 'Delete successfully'})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }
}

module.exports = new CouponController()