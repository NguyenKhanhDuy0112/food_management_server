const jwt = require('jsonwebtoken')

const authMiddleware = {

    verifyToken(req, res, next){
        //Get token from headers
        const token = req.headers.token
        if(token){
            //Bearer accessToken
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if(err){
                    return res.status(403).json({errorMessage: 'Token is not valid'})
                }

                req.user = user
                next()
            })
        }else{
            return res.status(401).json({errorMessage: 'You are not authenticated'})
        }
    },

    verifyTokenAndAdminAuth(req, res, next){
        authMiddleware.verifyToken(req, res, () => {
            if(req.user.id === req.params.id || req.user.isAdmin){
                next()
            }
            else{
                return res.status(404).json({errorMessage: 'You are not allowed to delete other'})
            }
        })
    }
}


module.exports = authMiddleware
