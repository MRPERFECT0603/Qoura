import express from "express";

const commentRouter = express.Router();

const {addCommentOnComment , addCommentOnAnswer } = require("../Controllers/commentController");


commentRouter.post("/answers/:answerId/comments" , addCommentOnAnswer);
commentRouter.post("/comments/:commentId/comments" , addCommentOnComment);


 
export default commentRouter;