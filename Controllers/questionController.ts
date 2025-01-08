import { Request, Response } from "express";
import pool from "../config/db";
import validator from 'validator';


const addQuestion = async ( req : Request , res: Response) => {
    var { userId , title , body , topicTags} = req.body;

    if (!validator.isUUID(userId))
        return res.status(400).json({ error: 'Invalid UserId format' });
    if (topicTags.length > 0) {
        topicTags = topicTags.map((tag: string) => tag.toLowerCase());
    }

    try{
        const query = `
        INSERT INTO "Questions" (title, body, topics, created_at, user_id)
        VALUES ($1, $2, $3, NOW(), $4)
        RETURNING *;
    `;
    const result = await pool.query(query, [title, body, topicTags, userId]);

    const createdQuestion = result.rows[0];
    return res.status(201).json(createdQuestion);
    }
    catch(error){
        const err = error as Error; 
        console.error("Error in adding Question:", {
            error: err.message || err,
            requestBody: req.body,
            requestHeaders: req.headers,
            requestParams: req.params
        });
    
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}


const searchQuestion = async ( req: Request , res: Response) => {
    var {topicTags , title} = req.query;
    
    let query = 'SELECT * FROM "Questions"'; 
    const queryParams: any[] = [];
    let conditions: string[] = [];

    if (title) {
        conditions.push(`title ILIKE $${queryParams.length + 1}`);
        queryParams.push(`%${title}%`); 
    }

    if (topicTags) {
        const tags = Array.isArray(topicTags) ? topicTags : [topicTags]; 
        conditions.push(`topics && $${queryParams.length + 1}`);
        queryParams.push(tags);
    }

    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(' AND ');
    }
    try{
        const result = await pool.query(query, queryParams);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No questions found matching the criteria.' });
        }

        const Question = result.rows[0];
        return res.status(200).json(Question);
    }
    catch(error){
        const err = error as Error; 
        console.error("Error in searching Question:", {
            error: err.message || err,
            requestBody: req.body,
            requestHeaders: req.headers,
            requestParams: req.params
        });
    
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { addQuestion , searchQuestion}