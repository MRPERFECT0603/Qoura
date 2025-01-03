import { Request, Response  } from "express";
import  pool  from "../config/db";


interface User {
    id: number;
    username?: string;
    email?: string;
    bio?: string;  
}

const addUser = async (req : Request, res : Response)=>{
   const { username  , email  } = req.body;
   try{
        const userQuery = "INSERT INTO \"Users\" (username , email) VALUES ($1,$2) RETURNING *";
        const result = await pool.query<User>(userQuery , [username, email]);
        const createdUser = result.rows[0];
        return res.status(201).json(createdUser);
   }
   catch(error){
        console.error("Error in creating user:", error);
        return res.status(500).send("Error in creating the user.");
   }
}

const getUser = async (req : Request, res : Response)=>{
    const {userId}  = req.params;
    try{
         const userQuery = "SELECT * FROM \"Users\" WHERE id = $1;";
         const result = await pool.query<User>(userQuery , [userId]);
         const createdUser = result.rows[0];
         return res.status(200).json(createdUser);
    }
    catch(error){
         console.error("Error in getting user:", error);
         return res.status(500).send("Error in getting the user.");
    }
}

const updateUser = async (req : Request, res : Response)=>{
    const {userId}  = req.params;
    const { username, email, bio } = req.body;

    let setClause = []; 
    let queryParams = [];  

    if (username) {
        setClause.push(`username = $${setClause.length + 1}`);
        queryParams.push(username);  
    }
    if (email) {
        setClause.push(`email = $${setClause.length + 1}`);
        queryParams.push(email); 
    }
    if (bio) {
        setClause.push(`bio = $${setClause.length + 1}`);
        queryParams.push(bio);  
    }
    if (setClause.length === 0) {
        return res.status(400).json({ message: "No data to update." });
    }
    queryParams.push(userId); 
    const userQuery = `
        UPDATE "Users" 
        SET ${setClause.join(', ')} 
        WHERE id = $${queryParams.length} 
        RETURNING *;
    `;

    try{
         const result = await pool.query<User>(userQuery , queryParams);
         const createdUser = result.rows[0];
         return res.status(200).json(createdUser);
    }
    catch(error){
         console.error("Error in updating user:", error);
         return res.status(500).send("Error in updating the user.");
    }
}

module.exports = {
    addUser,
    getUser,
    updateUser
};