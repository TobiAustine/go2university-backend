const mongoose = require('mongoose')


const topicSchema = mongoose.Schema({
    name:{
        type: String,
        required:[ true],
        unique: true
    },

    subject:{
        type: String,
        required: [ true, ],
       
    },
    department:{
        type: String,
        required: [ true],
       
    },
   tutor:{
    type:String,
    required:true
   },
   createdAt:{
    type: Date,
   },
   url:{
    type:String,
    required:[ true],
    unique: true,
    default: 'go2uni.vercel.app'
   },
   thumbnail:{
    type:String
   }
    
}, {timestamps:true})





const topicModel = mongoose.model('topics', topicSchema)

module.exports = topicModel