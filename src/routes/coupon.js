const express = require('express')
const route = express.Router()

const CouponController = require('../controllers/CouponController')

//Get all coupon
route.get('/', CouponController.getAllCoupons)

//Create coupon
route.post('/',CouponController.createACoupon)

//Get a coupon
route.get('/:id', CouponController.getACoupon)

//Delete a coupon
route.delete('/:id', CouponController.deleteACoupon)

//Update a coupon
route.put('/:id', CouponController.updateACoupon)



module.exports = route