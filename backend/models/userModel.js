const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:[ true, "Please, enter a name"]
    },
    email:{
        type: String,
        trim:true,
        required: [ true, "Please, enter an email"],
        unique: true,
        match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']
    },
   password:{
        type: String,
        required:[ true, "Please, enter a password"],
        // minLength:[8, 'Password must be up to 8 characters'],
        // maxLength:[30, 'Password must not exceed 30 characters']
    },
   gender:{
        type: String,
        required: true,
        default: 'gender'

       
    },
   School:{
        type: String,
        required:[ true, "Please, enter  a school name"],
        default: 'school'
    },
    Department:{
        type: String,
        required:[ true, "Please, enter a department name"],
        default: 'school'
    }, 
    isAdmin:{
        type:Boolean,
        default:false
    }
    
}, {timestamps:true})


userSchema.pre('save', async function(next){


    if(!this.isModified('password')){
        return next()
    }


    const salt = await bcrypt.genSalt(10)
   const hashedpassword = await bcrypt.hash(this.password, salt);
   this.password = hashedpassword
  
   next()
 })


const userModel = mongoose.model('Users', userSchema)

module.exports = userModel