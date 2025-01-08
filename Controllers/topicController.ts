import { Request, Response } from "express";
import pool from "../config/db";
import validator from 'validator';


const addTopic = async ( req : Request , res : Response) => {
    var { name }= req.body;

    name = name.toLowerCase();

    if(!validator.isLength(name,{min: 3, max: 20}))
        res.status(400).json("The name is Invalid.")

    
    try {
        const userQuery = "INSERT INTO \"Topic\" (name) VALUES ($1) RETURNING *";
        const result = await pool.query(userQuery, [name]);
        const createdTopic = result.rows[0];
        return res.status(201).json(createdTopic);
    }
    catch (error) {
        const err = error as Error; 
        console.error("Error in creating Topic:", {
            error: err.message || err,
            name: req.body,
        });
    
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getTopic = async ( req : Request , res : Response) => {
    try {
        const userQuery = "SELECT name FROM \"Topic\" ";
        const result = await pool.query(userQuery);
        const allTopics = result.rows;
        return res.status(201).json(allTopics);
    }
    catch (error) {
        const err = error as Error; 
        console.error("Error in getting Topic:", {
            error: err.message || err,
        });
    
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {addTopic , getTopic}