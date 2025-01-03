import express from "express";

const router = express.Router();

const {addUser , getUser , updateUser} = require("../Controllers/userController");


router.post("/users" , addUser);
router.get("/users/:userId" , getUser);
router.put("/users/:userId" , updateUser);


 
export default router;