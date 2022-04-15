const express = require('express')
const route = express.Router()

const BillDetailController = require('../controllers/BillDetailController')

//Get all bill detail
route.get('/', BillDetailController.getAllBillDetails)

//Create bill detail
route.post('/',BillDetailController.createABillDetail)

//Get a bill detail
route.get('/:id', BillDetailController.getABillDetail)

//Delete a bill detail
route.delete('/:id', BillDetailController.deleteABillDetail)

//Update a bill detail
route.put('/:id', BillDetailController.updateABillDetail)



module.exports = route