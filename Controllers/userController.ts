import { Request, Response } from "express";
import pool from "../config/db";
import { User } from "../Interfaces/User";
import validator from 'validator';


const addUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;

    if (!validator.isEmail(email))
        return res.status(400).json({ error: 'Invalid email format' });
    // Username should be length(6-20) && should be alphanumeric (Containing only alphabets and digits).
    if (!validator.isLength(username, { min: 6, max: 20 }) || !validator.isAlphanumeric(username))
        return res.status(400).json({ error: 'Invalid Username format' });


    try {
        const userQuery = "INSERT INTO \"Users\" (username , email) VALUES ($1,$2) RETURNING *";
        const result = await pool.query<User>(userQuery, [username, email]);
        const createdUser = result.rows[0];
        return res.status(201).json(createdUser);
    }
    catch (error) {
        const err = error as Error; 
        console.error("Error in creating user:", {
            error: err.message || err,
            requestBody: req.body,
            requestHeaders: req.headers,
            requestParams: req.params
        });
    
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!validator.isUUID(userId))
        return res.status(400).json({ error: 'Invalid UserId format' });

    try {
        const userQuery = "SELECT * FROM \"Users\" WHERE id = $1;";
        const result = await pool.query<User>(userQuery, [userId]);
        return res.status(200).json(result.rows[0]);
    }
    catch (error) {
        const err = error as Error; 
        console.error("Error in getting user:", {
            error: err.message || err,
            requestBody: req.body,
            requestHeaders: req.headers,
            requestParams: req.params
        });
    
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { username, email, bio } = req.body;
    
    if (!validator.isUUID(userId))
        return res.status(400).json({ error: 'Invalid UserId format' });


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

    try {
        const result = await pool.query<User>(userQuery, queryParams);
        const updtaedUser = result.rows[0];
        return res.status(200).json(updtaedUser);
    }
    catch (error) {
        const err = error as Error; 
        console.error("Error in updating user:", {
            error: err.message || err,
            requestBody: req.body,
            requestHeaders: req.headers,
            requestParams: req.params
        });
    
        return res.status(500).json({ error: 'Internal Server Error' });
    }       

}

module.exports = {
    addUser,
    getUser,
    updateUser
};