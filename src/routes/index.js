const categoryRoute = require('./category')
const productRoute = require('./product')
const reviewRoute = require('./review')
const billDetailRoute = require('./billDetail')
const providerRoute = require('./provider')
const billRoute = require('./bill')
const userRoute = require('./user')
const couponRoute = require('./coupon')
const authRoute = require('./auth')

function router(app){
    //Config route category
    app.use("/categories", categoryRoute)

    //Config route product
    app.use('/products', productRoute)

    //Config route review
    app.use('/reviews', reviewRoute)

    //Config route bill
    app.use('/bills', billRoute)

    //Config route user
    app.use('/users', userRoute)

    //Config route bill detail
    app.use('/bill-details', billDetailRoute)

    //Config route provider
    app.use('/providers', providerRoute)

    //Config route coupon
    app.use('/coupons', couponRoute)

    //Config authentication route
    app.use('/auth', authRoute)
}

module.exports = router