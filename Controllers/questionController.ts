import { Request, Response } from "express";
import pool from "../config/db";
import validator from 'validator';

const getTopicId = async (topicTags: string[]): Promise<number[]> => {
    let topicTagIDs: number[] = [];
    if (topicTags.length > 0) {
        topicTags = topicTags.map((tag: string) => tag.toLowerCase());
    }
    try {
        const query = `SELECT id FROM "Topic" WHERE name = ANY($1::text[])`;
        const result = await pool.query(query, [topicTags]);
        topicTagIDs = result.rows.map((row: { id: number }) => row.id);
        // console.log(topicTagIDs); 
        return topicTagIDs;
    }
    catch (error) {
        const err = error as Error;
        console.error("Error in getting TopicIds:", {
            error: err.message || err,
        });
        throw new Error("Failed to get topic IDs.");
    }
}

const addQuestion = async (req: Request, res: Response) => {
    const { userId, title, body, topicTags } = req.body;

    if (!validator.isUUID(userId))
        return res.status(400).json({ error: 'Invalid UserId format' });

    try {
        let topicTagIDs = await getTopicId(topicTags);

        const query = `
        INSERT INTO "Questions" (title, body, topics, created_at, user_id)
        VALUES ($1, $2, $3, NOW(), $4)
        RETURNING *;
    `;
        const result = await pool.query(query, [title, body, topicTagIDs, userId]);
        const createdQuestion = result.rows[0];
        return res.status(201).json(createdQuestion);
    }
    catch (error) {
        const err = error as Error;
        console.error("Error in adding Question:", {
            error: err.message || err,
            requestBody: req.body,
        });

        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getTopicIdSearch = async (topicTag: string): Promise<number> => {
    let topicTagID: number;
    try {
        const query = `SELECT id FROM "Topic" WHERE name = $1`;
        const result = await pool.query(query, [topicTag]);
        if (result.rows.length > 0) {
            topicTagID = result.rows[0].id;
            console.log(topicTagID);
            return topicTagID;
        } else {
            throw new Error("Topic not found.");
        }
    }
    catch (error) {
        const err = error as Error;
        console.error("Error in getting Topic ID:", {
            error: err.message || err,
        });
        throw new Error("Failed to get topic ID.");
    }
}
const generateSearchConditions = (fields: Record<string, any>): { conditions: string[]; queryParams: any[] } => {
    const conditions: string[] = [];
    const queryParams: any[] = [];

    Object.entries(fields).forEach(([key, value]) => {
        if (value !== undefined) {
            if (key === 'topics') {
                conditions.push(`"${key}" @> $${queryParams.length + 1}::uuid[]`); 
                queryParams.push([value]);
            } else if (key === 'title') {
                conditions.push(`"${key}" ILIKE $${queryParams.length + 1}`);  
                queryParams.push(`%${value}%`); 
            } else {
                conditions.push(`"${key}" = $${queryParams.length + 1}`);
                queryParams.push(value); 
            }
        }
    });

    return { conditions, queryParams };
};
const searchQuestion = async (req: Request, res: Response) => {
    const { topicTags, title } = req.query;
    if (typeof topicTags === 'string') {
        let topics = await getTopicIdSearch(topicTags); 

        let query = 'SELECT * FROM "Questions"';
        const { conditions, queryParams } = generateSearchConditions({
            topics, 
            title
        });

        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(' AND ');
        }

        try {
            const result = await pool.query(query, queryParams);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'No questions found matching the criteria.' });
            }

            return res.status(200).json(result.rows);
        } catch (error) {
            const err = error as Error;
            console.error("Error in searching Question:", {
                error: err.message || err,
                requestQuery: req.query,
            });

            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(400).json({ error: 'Invalid topicTags format' });
    }
}

module.exports = { addQuestion, searchQuestion }