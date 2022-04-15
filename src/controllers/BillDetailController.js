const BillDetail = require('../models/BillDetail')

class BillDetailController {

    //[GET] /bill-details (get all bill detail)
    async getAllBillDetails(req, res){
        try{
            const billDetails = await BillDetail.find({}).populate('product').populate('bill')
            res.status(200).json({data: billDetails})
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }
    //[GET] /bill-details/:id (get a bill detail)
    async getABillDetail(req, res) {
        try{
            const billDetail = await BillDetail.findById(req.params.id).populate('product').populate('bill')
            if(!billDetail){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                res.status(200).json({data: billDetail})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[POST] /bill-details (create a bill detail)
    async createABillDetail(req, res) {
        try{
            const billDetail = new BillDetail(req.body)
            await billDetail.save()
            res.status(200).json({data: billDetail})
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[PUT] /bill-details/:id (update a bill detail)
    async updateABillDetail(req, res) {
        try{
            const updatedBillDetail = await BillDetail.findByIdAndUpdate(req.params.id, req.body)
            if(!updatedBillDetail){
                res.status(400).json({errorMessage: 'ID does not exits'})
            }
            else{
                const billDetail = await BillDetail.findById(req.params.id)
                res.status(200).json({data: billDetail})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[DELETE] /bill-details/:id (delete a bill detail)
    async deleteABillDetail(req, res) {
        try{
            const deletedBillDetail = await BillDetail.findByIdAndDelete(req.params.id)
            if(!deletedBillDetail){
                res.status(500).json({errorMessage: 'ID does not exist'})
            }
            else{
                res.status(200).json({message: 'Delete successfully'})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

}

module.exports = new BillDetailController()