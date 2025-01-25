import express from "express";

const userRouter = express.Router();

const {addUser , getUser , updateUser} = require("../Controllers/userController");


/**
*   @swagger
*   /users:
*     post:
*       summary: Register a new user
*       description: Creates a new user with the provided details.
*       operationId: addUser
*       tags:
*         - User
*       requestBody:
*         description: User object that needs to be added
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 username:
*                   type: string
*                   example: "vivekShaurya"
*                 email:
*                   type: string
*                   example: "vivekShaurya@example.com"
*       responses:
*         201:
*           description: User successfully created
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                    id:
*                      type: string
*                      format: uuid
*                      example: "18a345fe-6780-4b9b-93de-967e07829cc0"
*                    username:
*                      type: string
*                      example: "VivekShaurya"
*                    email:
*                      type: string
*                      example: "vivekShaurya@example.com"
*                    bio:
*                      type: string
*                      example: null
*         400:
*           description: Bad request (e.g., missing or invalid input)
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   error:
*                     type: string
*                     example: "Invalid email format."
*         500:
*           description: Internal Server Error
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   error:
*                     type: string
*                     example: "Internal Server Error"
*/
userRouter.post("/users" , addUser);
/**
*   @swagger
*   /users/{userId}:
*     get:
*       summary: Retrieve user profile information
*       description: Retrieves user profile information by user ID.
*       operationId: getUser
*       tags:
*         - User
*       parameters:
*         - name: userId
*           in: path
*           description: ID of the user to retrieve
*           required: true
*           schema:
*             type: string
*             example: "18a345fe-6780-4b9b-93de-967e07829cc0"
*       responses:
*         200:
*           description: User profile retrieved successfully
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   id:
*                     type: string
*                     example: "18a345fe-6780-4b9b-93de-967e07829cc0"
*                   username:
*                     type: string
*                     example: "vivek"
*                   email:
*                     type: string
*                     example: "vivekshaurya@example.com"
*                   bio:
*                     type: string
*                     example: null
*         500:
*           description: Internal server error
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   error:
*                     type: string
*                     example: "Internal Server Error."
*/
userRouter.get("/users/:userId" , getUser);
/**
*   @swagger
*   /users/{userId}:
*     put:
*       summary: Update user profile
*       description: Updates user profile information by user ID.
*       operationId: updateUser
*       tags:
*         - User
*       parameters:
*         - name: userId
*           in: path
*           description: ID of the user to update
*           required: true
*           schema:
*             type: string
*             example: "18a345fe-6780-4b9b-93de-967e07829cc0"
*       requestBody:
*         description: User profile fields to update
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 username:
*                   type: string
*                   example: "JohnDoeUpdated"
*                 email:
*                   type: string
*                   example: "johnupdated@example.com"
*                 bio:
*                   type: string
*                   example: "Software developer with 10 years of experience."
*       responses:
*         200:
*           description: User profile updated successfully
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   id:
*                     type: string
*                     example: "18a345fe-6780-4b9b-93de-967e07829cc0"
*                   username:
*                     type: string
*                     example: "JohnDoeUpdated"
*                   email:
*                     type: string
*                     example: "johnupdated@example.com"
*                   bio:
*                     type: string
*                     example: "Software developer with 10 years of experience."
*         400:
*           description: Invalid input or missing parameters
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   error:
*                     type: string
*                     example: "Invalid UserId format."
*         500:
*           description: Internal server error
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   error:
*                     type: string
*                     example: "Internal Server Error."
*/
userRouter.put("/users/:userId" , updateUser);


 
export default userRouter;