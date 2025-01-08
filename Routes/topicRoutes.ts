import express from "express";

const topicRouter = express.Router();

const {addTopic , getTopic } = require("../Controllers/topicController");


topicRouter.post("/topics" , addTopic);
topicRouter.get("/topics" , getTopic);


 
export default topicRouter;