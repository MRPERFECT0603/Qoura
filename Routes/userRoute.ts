import express from "express";

const router = express.Router();
const {addUser} = require("../Controllers/userController");


router.post("/users" , addUser);

 
export default router;