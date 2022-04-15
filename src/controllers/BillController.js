const Bill = require('../models/Bill')
const BillDetail = require('../models/BillDetail')

class BillController{

    //[GET] /bills (get all bills)
    async getAllBills(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 12

            const options = {
                page,
                limit,
                populate:['user', 'provider', 'coupon']
            }
            
            const bills = await Bill.paginate({}, options)
            const { docs, ...others } = bills
            res.status(200).json({data: docs, ...others})
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[POST] /bills (create a bill)
    async createABill(req, res){
        try{
            const bill = new Bill(req.body)
            await bill.save()
            res.status(200).json({data: bill})
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[GET] /bills/:id (get a bill)
    async getABill(req, res){
        try{    
            const bill = await Bill.findById(req.params.id).populate('coupon').populate('user')
            if(!bill){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                res.status(200).json({data: bill})
            }
        }catch(err){    
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[GET] /bills/:id/bill-details (get bill details by bill id)
    async getBillDetailsByBillId(req, res){
        try{
            const bill = await Bill.findById(req.params.id)
            if(!bill){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                const billDetails = await BillDetail.find({bill: req.params.id})
                res.status(200).json({data: {...bill, billDetails}})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[PUT] /bills (update a bill)
    async updateABill(req, res){
        try{
            const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body)
            if(!updatedBill){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                const bill = await Bill.findById(req.params.id)
                res.status(200).json({data: bill})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[DELETE] /bills (delete a bill)
    async deleteABill(req, res){
        try{
            const deletedBill = await Bill.findByIdAndDelete(req.params.id)
            if(!deletedBill){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                await BillDetail.deleteMany({bill: req.params.id})
                res.status(200).json({message: 'Delete successfully'})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }
}

module.exports = new BillController()