import express from "express";

const userRouter = express.Router();

const {addUser , getUser , updateUser} = require("../Controllers/userController");


userRouter.post("/users" , addUser);
userRouter.get("/users/:userId" , getUser);
userRouter.put("/users/:userId" , updateUser);


 
export default userRouter;