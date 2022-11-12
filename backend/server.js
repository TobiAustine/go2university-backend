const express = require('express')
const  app = express();
const mongoose = require('mongoose')
const dontenv = require('dotenv')
        dontenv.config()
const cors = require('cors')
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const {errorHandler} = require("./middleware/errorMiddleware")

const PORT = process.env.PORT || 5000
const MongoDb = process.env.MONGODB
 
const userRouter = require('./routes/userRoutes');
const topicRoutes = require('./routes/topicRoutes')


//MIDDLEWARES 
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json({limit:'30mb', extended:true}))
app.use(cors(
 { origin:['http://localhost:3001', 'https://go2uni.onrender.com']
}
));



//ROUTES


app.use('/users', userRouter)
app.use('/topics', topicRoutes)


app.use(errorHandler)
 const connectDB= async() =>{
       try {
        await mongoose.connect(MongoDb)
       .then(() =>{
           app.listen(PORT, (req,res)=>{
           console.log(`Server running on ${PORT}`)
           })
       })
       } catch (error) {
         console.log(error)
       } 
     
 }



    
    connectDB()










 