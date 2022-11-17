const asyncHandler = require("express-async-handler")
const topicModel = require('../models/topicModel')


 const getTopics = asyncHandler(async(req,res) => {
    try {
         const  topics =  await topicModel.find()

         res.status(200).send(topics)
 
    } catch (error) {
       res.status(404).json({message:error.message})
    }
  })

const createTopic = asyncHandler(async (req,res) => {
    const {name,subject,department,tutor,url} = req.body

    if(!name || !subject || !department || !tutor ){
        res.status(404)
        throw new Error("Please fill in all details")
    } 
    
    const newTopic = await topicModel.create({name, subject, department,tutor, url})

    if (newTopic) {
        res.status(200).json({
            _id : newTopic.id,
            name: newTopic.name,
            subject: newTopic.subject,
            department: newTopic.department,
            tutor: newTopic.tutor,
            url: newTopic.url,
        })
    } else {
         res.status(404)
        throw new Error("An error occured, please try again")
    }
    
    


 })












module.exports = {getTopics, createTopic}