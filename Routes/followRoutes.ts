import express from "express";

const followRouter = express.Router();

const {addFollow} = require("../Controllers/followController");

/**
 * @swagger
 * /users/{userId}/follow/{targetUserId}:
 *   post:
 *     summary: Follow a user
 *     description: Allows a user to follow another user identified by `targetUserId`.
 *     operationId: addFollow
 *     tags:
 *       - Follow
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user who wants to follow another user.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *       - in: path
 *         name: targetUserId
 *         required: true
 *         description: The unique identifier of the user to be followed.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "124bcfb9-9d87-48e5-910a-a674c9b5ba59"
 *     responses:
 *       201:
 *         description: Follow successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "a5d3b194-f8b5-4636-94bb-abea4fc41174"
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                   example: "4b498140-20c0-46b4-abf8-d73be95e9f65"
 *                 targetUserId:
 *                   type: string
 *                   format: uuid
 *                   example: "124bcfb9-9d87-48e5-910a-a674c9b5ba59"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-25T14:45:19.858Z"
 *       400:
 *         description: Bad request due to invalid input (e.g., invalid `userId` or `targetUserId` format).
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
followRouter.post("/users/:userId/follow/:targetUserId" , addFollow);


 
export default followRouter;