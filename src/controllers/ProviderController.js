const Provider = require("../models/Provider")


class ProviderController{

      //[GET] /providers (get all providers)
      async getAllProviders(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 12

            const options = {
                page,
                limit
            }

            const providers = await  Provider.paginate({}, options)
            const {docs, ...others} = providers
            res.status(200).json({data: docs, ...others})
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }
    //[GET] /providers/:id (get a provider)
    async getAProvider(req, res) {
        try{
            const provider = await Provider.findById(req.params.id)
            if(!provider){
                res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                res.status(200).json({data: provider})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[POST] /providers (create a provider)
    async createAProvider(req, res) {
        try{
            const provider = new Provider(req.body)
            const savedProvider = await provider.save()
            res.status(200).json({data: savedProvider})
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[PUT] /providers/:id (update a provider)
    async updateAProvider(req, res) {
        try{
            const provider = new Provider(req.body)
            const updatedProvider = await Provider.findByIdAndUpdate(req.params.id, req.body)
            if(!updatedProvider){
                res.status(400).json({errorMessage: 'ID does not exits'})
            }
            else{
                res.status(200).json({data: provider})
            }
        }catch(err){
            res.status(200).json({errorMessage: 'Error server'})
        }
    }

    //[DELETE] /providers/:id (delete a provider)
    async deleteAProvider(req, res) {

    }
}

module.exports = new ProviderController()