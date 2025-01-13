import express from "express";

const quesRouter = express.Router();

const {addQuestion , searchQuestion} = require("../Controllers/questionController");


quesRouter.post("/questions" , addQuestion);
quesRouter.get("/questions/search" , searchQuestion);


 
export default quesRouter;