import express from "express";

const followRouter = express.Router();

const {addFollow} = require("../Controllers/followController");


followRouter.post("/users/:userId/follow/:targetUserId" , addFollow);


 
export default followRouter;