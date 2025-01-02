import { Request, Response  } from "express";

const addUser = (req : Request, res : Response)=>{
    res.status(201).send("User Created !!");
}

module.exports = {
    addUser
};