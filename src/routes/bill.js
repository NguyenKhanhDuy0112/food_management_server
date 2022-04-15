const express = require('express')
const route = express.Router()

const BillController = require('../controllers/BillController')

//Get all bills
route.get('/', BillController.getAllBills)

//Create bill
route.post('/',BillController.createABill)

//Get bills detail by bill id
route.get('/:id/bill-details', BillController.getBillDetailsByBillId)

//Get a bill
route.get('/:id', BillController.getABill)

//Delete a bill
route.delete('/:id', BillController.deleteABill)

//Update a bill
route.put('/:id', BillController.updateABill)



module.exports = route