const jwt  = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const userModel = require('../models/userModel')

  const protect = asyncHandler(async(req,res,next) =>{
        let token

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try {
                token = req.headers.authorization.split(' ')[1]


                //verify token
                const verifiedToken = jwt.verify(token, process.env.JWT)

                //get user
                req.user = await userModel.findById(verifiedToken.id).select('-password')




                next()
            } catch (error) {
                console.log(error);
                res.status(401)
                throw new Error("User not Authorized")
            }
        }

        if(!token){
            res.status(401)
            throw new Error("User not authorized")
        }
  


    })


  module.exports = protect