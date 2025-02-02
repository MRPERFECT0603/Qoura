import { Request, Response } from "express";
import pool from "../config/db";
import validator from 'validator';



const addAnswer = async (req: Request , res: Response) => {
    const {questionId} = req.params;
    const {userId , ans} = req.body;


    if (!validator.isUUID(userId))
        return res.status(400).json({ error: 'Invalid UserId format' });
    if (!validator.isUUID(questionId))
        return res.status(400).json({ error: 'Invalid QuesId format' });
    
    try {
        const ansQuery = `
        INSERT INTO "Answers" (question_id, user_id, text, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *;
    `;
        const result = await pool.query(ansQuery, [questionId , userId , ans]);
        const createdAns = result.rows[0];
        return res.status(201).json(createdAns);
    }
    catch (error) {
        const err = error as Error; 
        console.error("Error in creating Answer.", {
            error: err.message || err,
            requestBody: req.body,
            QuesId: req.params 
        });
    
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

const updateAnswer = async (req: Request , res: Response) => {
    const {answerId} = req.params;
    const {newAns} = req.body;

    if (!validator.isUUID(answerId))
        return res.status(400).json({ error: 'Invalid AnswerId format' });


    try {
        const ansQuery = `
            UPDATE "Answers"
            SET text = $1
            WHERE id = $2
            RETURNING *;
        `;
        const result = await pool.query(ansQuery, [newAns , answerId]);
        const updatedAns = result.rows[0];
        return res.status(200).json(updatedAns);
    }
    catch (error) {
        const err = error as Error; 
        console.error("Error in Updating Answer.", {
            error: err.message || err,
            requestBody: req.body,
            answerId: req.params 
        });
    
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}


module.exports = {
    addAnswer,
    updateAnswer
}