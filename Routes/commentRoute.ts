import express from "express";

const commentRouter = express.Router();

const {addCommentOnComment , addCommentOnAnswer } = require("../Controllers/commentController");

/**
 * @swagger
 * /answers/{answerId}/comments:
 *   post:
 *     summary: Add a comment to an answer
 *     description: Adds a new comment to a specific answer identified by its unique `answerId`.
 *     operationId: addCommentOnAnswer
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: answerId
 *         required: true
 *         description: The unique identifier of the answer to which the comment is being added.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *     requestBody:
 *       description: Object containing the userId and the comment text.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The unique identifier of the user creating the comment.
 *                 example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *               text:
 *                 type: string
 *                 description: The content of the comment.
 *                 example: "This is a comment on the answer."
 *     responses:
 *       201:
 *         description: Comment successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "e5d3b194-f8b5-4636-94bb-abea4fc41172"
 *                 parent_id:
 *                   type: string
 *                   format: uuid
 *                   example: "d5c3b194-f8b5-4636-94bb-abea4fc41171"
 *                 text:
 *                   type: string
 *                   description: The content of the comment.
 *                   example: "This is a comment on the answer."
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-25T14:45:19.858Z"
 *                 user_id:
 *                   type: string
 *                   format: uuid
 *                   example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *       400:
 *         description: Bad request due to invalid input (e.g., invalid `userId` or `answerId` format).
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
 *                   example: "Internal Server Error."
 */
commentRouter.post("/answers/:answerId/comments" , addCommentOnAnswer);
/**
 * @swagger
 * /comments/{commentId}/comments:
 *   post:
 *     summary: Add a comment to a comment
 *     description: Adds a new comment to a specific comment identified by its unique `commentId`.
 *     operationId: addCommentOnComment
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The unique identifier of the comment to which the new comment is being added.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *     requestBody:
 *       description: Object containing the userId and the comment text.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The unique identifier of the user creating the comment.
 *                 example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *               text:
 *                 type: string
 *                 description: The content of the comment.
 *                 example: "This is a comment on another comment."
 *     responses:
 *       201:
 *         description: Comment successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "f6e3b194-f8b5-4636-94bb-abea4fc41173"
 *                 parent_id:
 *                   type: string
 *                   format: uuid
 *                   example: "e5d3b194-f8b5-4636-94bb-abea4fc41172"
 *                 text:
 *                   type: string
 *                   description: The content of the comment.
 *                   example: "This is a comment on another comment."
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-25T14:45:19.858Z"
 *                 user_id:
 *                   type: string
 *                   format: uuid
 *                   example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *       400:
 *         description: Bad request due to invalid input (e.g., invalid `userId` or `commentId` format).
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
 *                   example: "Internal Server Error."
 */
commentRouter.post("/comments/:commentId/comments" , addCommentOnComment);


 
export default commentRouter;