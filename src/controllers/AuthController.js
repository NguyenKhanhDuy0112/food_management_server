const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController{

    //[POST] /auth/register (register)
    async registerUser(req, res){
        try{
            const salt = await bcrypt.genSalt(10)
            const hased = await bcrypt.hash(req.body.password, salt)

            const user = new User({
                userName: req.body.userName,
                password: hased
            })

            await user.save()

            res.status(200).json({data: user})

        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }


    //[GET] /auth/login (login)
    async loginUser(req, res){
        try{
            const user = await User.findOne({userName: req.body.userName})
           
            if(!user){
                return res.status(404).json({errorMessage: 'Wrong username'})
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password)
            
            if(!validPassword){
                return res.status(404).json({errorMessage: 'Wrong password'})
            }

            if(user && validPassword){
                const accessToken = jwt.sign({
                    id: user.id,
                    isAdmin: user.isAdmin
                },
                    process.env.JWT_ACCESS_KEY,
                {
                    expiresIn: "180s"
                })

                const refreshToken = jwt.sign({
                    id: user.id,
                    isAdmin: user.isAdmin
                },
                    process.env.JWT_REFRESH_TOKEN_KEY,
                {
                    expiresIn: "365d"
                })

                const {password, ...others} = user._doc

                res.status(200).json({data: {...others, accessToken, refreshToken}})
            }

        }catch(err){
            res.status(500).json({errorMessage: 'Error server'})
        }
    }

}

module.exports = new AuthController()