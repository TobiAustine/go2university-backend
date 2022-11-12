const express = require('express');
const router = express.Router()
const {getTopics,  createTopic} = require("../controllers/topicController")


//get all topics
router.get(`/`, getTopics)
router.post('/createTopic', createTopic)






module.exports = router