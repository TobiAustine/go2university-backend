const express = require('express');
const router = express.Router()
const {register, login, logout, getUser}  = require('../controllers/userController.js')
const protect = require('../middleware/protectMiddleware')


router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/user',protect, getUser)
// router.get('/loggedin', loggedin)
// router.patch('/updateUser',protect,  updateUser)
// router.patch('/changePassword',protect,  changePassword)
// router.post('/forgotPassword',forgotPassword)










module.exports = router