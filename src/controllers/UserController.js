const Review = require('../models/Review')
const User = require('../models/User')

class UserController{
    
     //[GET] /users (get all user)
     async getAllUsers(req, res){
        try{
            const users = await User.find({})
            res.status(200).json({data: users})
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

    //[DELETE] /users/:id (delete a user)
    async deleteAnUser(req, res) {
        try{
            const user = await User.findById(req.params.id)
            if(!user){
                return res.status(400).json({errorMessage: 'ID does not exist'})
            }
            else{
                user.isActive = false
                await User.findByIdAndUpdate(req.params.id, {...user})
                res.status(200).json({message: 'Delete successfully'})
            }
        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

}

module.exports = new UserController()