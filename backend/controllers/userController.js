const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

//token
const token = (id) => {
    return jwt.sign({id},process.env.JWT, {expiresIn:'5d'} )
}



const register = asyncHandler( async(req,res) => {
   const {name, email, password} = req.body

   //validation
   if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please complete all fields')
   }

   if (password.length < 8 || password.length > 30) {
    res.status(404)
    throw new Error('Password characters must be at least 8 and not more than 30' )
   }

   //check if email already exists
   const oldMail = await  userModel.findOne({email})
   if (oldMail) {
    res.status(404)
    throw new Error('Email already exists, Please Login')
   }


   //hashpassword
//    const salt = await bcrypt.genSalt(10)
//    const hashedpassword = await bcrypt.hash(password, salt)


   //create  a user
   const user = await userModel.create({name, email, password})

   //generate user token
   const userToken = token(user._id)

   //send http-only cookie, keeps the user loggedin 
   res.cookie('token', userToken, {
    httpOnly:true,
    path:'/',
    expires:new Date(Date.now() + 1000 * 432000), //5days
    sameSite: 'none',
    secure:true 
   });


   if (user) {
     const {_id, name, email, photo,phone, bio, password} = user
    res.status(200).json({
        // _id:user.id,
        // name:user.name,
        // email:user.email,
        // password:user.password,
        // bio:user.bio
        _id, name,email,photo, phone, bio, password,userToken 
       

    })
   }else{
    res.status(404)
    throw new Error('An error occured')
   }




});




const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        res.status(404)
        throw new Error("Please fill in all details")
    }

    //check if user exists
    const user = await userModel.findOne({email})
    if(!user){
        res.status(404)
        throw new Error("User Not Found")
    }


     //generate user token
   const userToken = token(user._id )

   //send http-only cookie
   res.cookie('token', userToken, {
    httpOnly:true,
    path:'/',
    expires:new Date(Date.now() + 1000 * 432000), //5days
    sameSite: 'none',
    secure:true 
   });

  if(user && await(bcrypt.compare(password, user.password))){
    const {_id, name, email, photo,phone, bio, password} = user
    res.status(201)
    res.json({
        _id, name,email,photo, phone, bio, password, userToken
    })
  }else{
    res.status(401)
    throw new Error('Invalid Credentials')
}


})




const logout = asyncHandler(async(req,res) => {
    res.cookie('token', '', {
        httpOnly:true,
        path:'/',
        expires:new Date(0), //immediately
        sameSite: 'none',
        secure:true 
       });

    return res.status(200).json({message:"Logout Successful"})
})





const getUser = asyncHandler( async(req,res) => {
     const user = await userModel.findById(req.user._id)

     if(user){
         const {_id, name, email, photo,phone, bio, password, userToken} = user
     res.status(200)
     res.json({
         _id, name,email,photo, phone, bio, password, userToken
     })
   }else{
     res.status(401)
     throw new Error('User not found')
 } 


   // res.send('heyy')
// res.status(200).json(req.user)


})


module.exports = {register, login, logout, getUser}