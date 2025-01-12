import express from "express";

const likeRouter = express.Router();

const {addLike} = require("../Controllers/likeController");


likeRouter.post("/:type/:typeId/likes" , addLike);



 
export default likeRouter;