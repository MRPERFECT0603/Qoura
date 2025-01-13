import { Request, Response } from "express";
import pool from "../config/db";
import validator from 'validator';


const addFollow = async ( req : Request , res : Response) => {

    const {userId , targetUserId} = req.params;

    if(!validator.isUUID(userId))
        res.status(400).json({ error: 'Invalid UserId format' });
    if(!validator.isUUID(targetUserId))
        res.status(400).json({ error: 'Invalid targetUserId format' });

    
    try {
        const userQuery = `INSERT INTO "Follow" ("userId" , "targetUserId" , created_at) 
        VALUES ($1 , $2 , NOW()) RETURNING *`;
        const result = await pool.query(userQuery, [userId , targetUserId]);
        const folowerAdded = result.rows[0];
        return res.status(201).json(folowerAdded);
    }
    catch (error) {
        const err = error as Error; 
        console.error("Error in creating Follow:", {
            error: err.message || err,
            requestParams: req.params,
        });
    
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {addFollow}