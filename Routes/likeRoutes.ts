import express from "express";

const likeRouter = express.Router();

const {addLike} = require("../Controllers/likeController");

/**
 * @swagger
 * /{type}/{typeId}/likes:
 *   post:
 *     summary: Add a like to a question, answer, or comment
 *     description: Adds a like to the specified entity (question, answer, or comment) by the user.
 *     operationId: addLike
 *     tags:
 *       - Like
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: The type of entity to like (e.g., "questions", "answers", or "comments").
 *         schema:
 *           type: string
 *           example: "questions"
 *       - in: path
 *         name: typeId
 *         required: true
 *         description: The unique identifier of the entity being liked (e.g., the question, answer, or comment ID).
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *     requestBody:
 *       description: The user who is liking the entity.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The unique identifier of the user adding the like.
 *                 example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *     responses:
 *       201:
 *         description: Like successfully added to the entity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "a5c3b194-f8b5-4636-94bb-abea4fc41173"
 *                 type:
 *                   type: string
 *                   example: "questions"
 *                 typeID:
 *                   type: string
 *                   format: uuid
 *                   example: "d5c3b194-f8b5-4636-94bb-abea4fc41171"
 *                 userID:
 *                   type: string
 *                   format: uuid
 *                   example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-25T14:45:19.858Z"
 *       400:
 *         description: Bad request due to invalid input (e.g., invalid `type`, `typeId`, or `userId` format).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid type used"
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
likeRouter.post("/:type/:typeId/likes" , addLike);



 
export default likeRouter;