import { Request, Response } from "express";
import pool from "../config/db";
import validator from 'validator';


const addLike = async ( req : Request , res : Response) => {

    const {type , typeId} = req.params;
    const {userId} = req.body;

    const lowerType = type.toLowerCase();
    const types : string[]= ["questions" , "answers" ,"comments"];

    if(!types.includes(lowerType))
        return res.status(400).json({ error: 'Invalid type Used' });
    if (!validator.isUUID(userId))
        return res.status(400).json({ error: 'Invalid UserId format' });
    if (!validator.isUUID(typeId))
        return res.status(400).json({ error: 'Invalid typeID format' });
    
    try {
        const likeQuery = `INSERT INTO "Likes" (type, "typeID", "userID", created_at) 
                   VALUES ($1, $2, $3, NOW()) RETURNING *`;
        const result = await pool.query(likeQuery, [lowerType , typeId , userId]);
        const addedLike = result.rows[0];
        return res.status(201).json(addedLike);
    }
    catch (error) {
        const err = error as Error; 
        console.error("Error in adding Likes.", {
            error: err.message || err,
            requestParams: req.params,
            userId: req.body
        });
    
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {addLike}