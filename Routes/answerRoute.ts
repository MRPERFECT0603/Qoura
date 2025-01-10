import express from "express";

const answerRoute = express.Router();

const {addAnswer , updateAnswer } = require("../Controllers/answerController");


answerRoute.post("/questions/:questionId/answers" , addAnswer);
answerRoute.put("/answers/:answerId" , updateAnswer);


 
export default answerRoute;