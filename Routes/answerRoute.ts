import express from "express";

const answerRoute = express.Router();

const {addAnswer , updateAnswer } = require("../Controllers/answerController");


/**
 * @swagger
 * /questions/{questionId}/answers:
 *   post:
 *     summary: Add an answer to a question
 *     description: Adds a new answer to a specific question with the provided user ID and answer text.
 *     operationId: addAnswer
 *     tags:
 *       - Answer
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: The unique identifier of the question to which the answer belongs.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "d5c3b194-f8b5-4636-94bb-abea4fc41171"
 *     requestBody:
 *       description: Object containing the userId and the answer text.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The unique identifier of the user creating the answer.
 *                 example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *               ans:
 *                 type: string
 *                 description: The content of the answer.
 *                 example: "Yes, I am the answer."
 *     responses:
 *       201:
 *         description: Answer successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "c5d3b194-f8b5-4636-94bb-abea4fc41172"
 *                 question_id:
 *                   type: string
 *                   format: uuid
 *                   example: "d5c3b194-f8b5-4636-94bb-abea4fc41171"
 *                 user_id:
 *                   type: string
 *                   format: uuid
 *                   example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *                 text:
 *                   type: string
 *                   description: The content of the answer.
 *                   example: "Yes, I am the answer."
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-25T13:45:19.858Z"
 *       400:
 *         description: Bad request due to invalid input (e.g., invalid `userId` or `questionId` format).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid UserId format"
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
answerRoute.post("/questions/:questionId/answers", addAnswer);
/**
 * @swagger
 * /answers/{answerId}:
 *   put:
 *     summary: Update an existing answer
 *     description: Updates the text of an answer identified by its unique `answerId`.
 *     operationId: updateAnswer
 *     tags:
 *       - Answer
 *     parameters:
 *       - in: path
 *         name: answerId
 *         required: true
 *         description: The unique identifier of the answer to be updated.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "02a4639f-837c-4dc7-b931-eada0bed94b3"
 *     requestBody:
 *       description: Object containing the updated answer text.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newAns:
 *                 type: string
 *                 description: The new content of the answer.
 *                 example: "This is the updated answer text."
 *     responses:
 *       200:
 *         description: Answer successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "c5d3b194-f8b5-4636-94bb-abea4fc41172"
 *                 question_id:
 *                   type: string
 *                   format: uuid
 *                   example: "d5c3b194-f8b5-4636-94bb-abea4fc41171"
 *                 text:
 *                   type: string
 *                   description: The updated answer text.
 *                   example: "This is the updated answer text."
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-25T13:45:19.858Z"
 *                 user_id:
 *                   type: string
 *                   format: uuid
 *                   example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *       400:
 *         description: Bad request due to invalid input (e.g., invalid `answerId` format).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid AnswerId format."
 *       404:
 *         description: Answer not found for the given `answerId`.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Answer not found."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error."
 */
answerRoute.put("/answers/:answerId", updateAnswer);


 
export default answerRoute;