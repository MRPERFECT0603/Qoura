import express from "express";

const topicRouter = express.Router();

const {addTopic , getTopic } = require("../Controllers/topicController");

/**
*   @swagger
*   /topics:
*     post:
*       summary: Register a new Topic
*       description: Creates a new Topic with the provided details.
*       operationId: addTopic
*       tags:
*         - Topic
*       requestBody:
*         description: Topic object that needs to be added
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 name:
*                   type: string
*                   example: "Backend"
*       responses:
*         201:
*           description: Topic successfully created
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                    id:
*                      type: string
*                      format: uuid
*                      example: "18a345fe-6780-4b9b-93de-967e07829cc0"
*                    name:
*                      type: string
*                      example: "Backend"
*         400:
*           description: Bad request (e.g., missing or invalid input)
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   error:
*                     type: string
*                     example: "The name is  Invalid."
*         500:
*           description: Internal Server Error
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   error:
*                     type: string
*                     example: "Internal Server Error"
*/
topicRouter.post("/topics" , addTopic);
/**
*   @swagger
*   /topics:
*     get:
*       summary: Get all the Topic.
*       description: Get all the Topic.
*       operationId: getTopic
*       tags:
*         - Topic
*       responses:
*         200:
*           description: List of all the Topics.
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                    name:
*                      type: string
*                      example: "Backend" 
*         500:
*           description: Internal Server Error
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   error:
*                     type: string
*                     example: "Internal Server Error"
*/
topicRouter.get("/topics" , getTopic);


 
export default topicRouter;