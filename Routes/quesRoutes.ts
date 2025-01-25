import express from "express";

const quesRouter = express.Router();

const {addQuestion , searchQuestion} = require("../Controllers/questionController");

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Register a new Question
 *     description: Creates a new Question with the provided details.
 *     operationId: addQuestion
 *     tags:
 *       - Question
 *     requestBody:
 *       description: Question object that needs to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *               title:
 *                 type: string
 *                 example: "Backend Development"
 *               body:
 *                 type: string
 *                 example: "What is backend development?"
 *               topicTags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["JavaScript", "Backend"]
 *     responses:
 *       201:
 *         description: Question successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "d5c3b194-f8b5-4636-94bb-abea4fc41171"
 *                 title:
 *                   type: string
 *                   example: "Backend Development"
 *                 body:
 *                   type: string
 *                   example: "What is backend development?"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-25T12:55:19.858Z"
 *                 user_id:
 *                   type: string
 *                   format: uuid
 *                   example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *                 topics:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: uuid
 *                   example: ["4cf1cab8-f80e-4ec7-9883-f1397d3aea94"]
 *       400:
 *         description: Bad request (e.g., missing or invalid input).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid UserId format."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
quesRouter.post("/questions" , addQuestion);
/**
 * @swagger
 * /questions/search:
 *   get:
 *     summary: Search for questions by topic tags or title
 *     description: Retrieves a list of questions filtered by the specified topic tags or title.
 *     operationId: searchQuestions
 *     tags:
 *       - Question
 *     parameters:
 *       - in: query
 *         name: topicTags
 *         required: false
 *         description: The topic tag to filter questions by (optional).
 *         schema:
 *           type: string
 *           example: "backend"
 *       - in: query
 *         name: title
 *         required: false
 *         description: The title to filter questions by (optional).
 *         schema:
 *           type: string
 *           example: "Backend Development"
 *     responses:
 *       200:
 *         description: A list of questions filtered by the given criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: "d5c3b194-f8b5-4636-94bb-abea4fc41171"
 *                   title:
 *                     type: string
 *                     example: "Backend Development"
 *                   body:
 *                     type: string
 *                     example: "What is backend development?"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-01-25T12:55:19.858Z"
 *                   user_id:
 *                     type: string
 *                     format: uuid
 *                     example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *                   topics:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: uuid
 *                     example: ["4cf1cab8-f80e-4ec7-9883-f1397d3aea94"]
 *       400:
 *         description: Bad request (e.g., missing or invalid input).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid topicTags format."
 *       404:
 *         description: No questions found matching the criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No questions found matching the criteria."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
quesRouter.get("/questions/search", searchQuestion);


 
export default quesRouter;