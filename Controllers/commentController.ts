import { Request, Response } from "express";
import pool from "../config/db";
import validator from 'validator';


const addCommentOnAnswer = async (req: Request, res: Response) => {
    const { answerId } = req.params;
    const { userId, text } = req.body;
    if (!validator.isUUID(userId))
        return res.status(400).json({ error: 'Invalid UserId format' });
    if (!validator.isUUID(answerId))
        return res.status(400).json({ error: 'Invalid answerId format' });

    try {
        const commentQuery = `
        INSERT INTO "Comments" (parent_id, user_id, text, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *;
    `;
        const result = await pool.query(commentQuery, [answerId, userId, text]);
        const createdComment = result.rows[0];
        return res.status(201).json(createdComment);
    }
    catch (error) {
        const err = error as Error;
        console.error("Error in adding Comment on the Answer.", {
            error: err.message || err,
            answerId: req.params,
            requestBody: req.body,
        });

        return res.status(500).json({ error: 'Internal Server Error' });
    }



}

const addCommentOnComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { userId, text } = req.body;


    if (!validator.isUUID(userId))
        return res.status(400).json({ error: 'Invalid UserId format' });
    if (!validator.isUUID(commentId))
        return res.status(400).json({ error: 'Invalid answerId format' });

    try {
        const commentQuery = `
        INSERT INTO "Comments" (parent_id, user_id, text, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *;
    `;
        const result = await pool.query(commentQuery, [commentId, userId, text]);
        const createdComment = result.rows[0];
        return res.status(201).json(createdComment);
    }
    catch (error) {
        const err = error as Error;
        console.error("Error in adding Comment on the Answer.", {
            error: err.message || err,
            commentId: req.params,
            requestBody: req.body,
        });

        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { addCommentOnAnswer, addCommentOnComment }