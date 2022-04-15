const express = require('express')
const route = express.Router()

const ProviderController = require('../controllers/ProviderController')

//Get all providers
route.get('/', ProviderController.getAllProviders)

//Create provider
route.post('/',ProviderController.createAProvider)

//Get a provider
route.get('/:id', ProviderController.getAProvider)

//Delete a provider
route.delete('/:id', ProviderController.deleteAProvider)

//Update a provider
route.put('/:id', ProviderController.updateAProvider)


module.exports = route