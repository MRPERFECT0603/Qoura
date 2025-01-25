import swaggerJsDoc from "swagger-jsdoc";
import path from "path";
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - email
 *         - bio
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         bio:
 *           type: string
 *           description: A short biography of the user.
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         username: "vivekShuarya"
 *         email: "vivekshaurya69@gmail.com"
 *         bio: "Software engineer and open-source enthusiast."
 *     Question:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - body
 *         - topics
 *         - created_at
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the question.
 *         title:
 *           type: string
 *           description: The title of the question.
 *         body:
 *           type: string
 *           description: The body content of the question.
 *         topics:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of topics related to the question.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the question was created.
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the user who created the question.
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         title: "How to optimize React app performance?"
 *         body: "I want to know the best practices for optimizing performance in a React application. Any suggestions?"
 *         topics: 
 *           - "React"
 *           - "Performance"
 *           - "JavaScript"
 *         created_at: "2025-01-22T12:00:00Z"
 *         user_id: "456e7890-e89b-12d3-a456-426614174111"
 *     Answer:
 *       type: object
 *       required:
 *         - id
 *         - question_id
 *         - text
 *         - created_at
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the Answer.
 *         question_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the Question.
 *         text:
 *           type: string
 *           description: The body content of the answer.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the question was created.
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the user who created the question.
  *       example:
 *         id: "987e6543-e21b-45d3-b456-426614174001"
 *         question_id: "123e4567-e89b-12d3-a456-426614174000"
 *         text: "The best way to optimize React app performance is by using React.memo and proper state management libraries like Redux or Recoil."
 *         created_at: "2025-01-23T15:30:00Z"
 *         user_id: "456e7890-e89b-12d3-a456-426614174111"
 *     Comment:
 *       type: object
 *       required:
 *         - id
 *         - parent_id
 *         - text
 *         - created_at
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the Comment.
 *         parent_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the parent entity (Question or Answer) the comment is related to.
 *         text:
 *           type: string
 *           description: The body content of the comment.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the comment was created.
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the user who created the comment.
 *       example:
 *         id: "987e6543-e21b-45d3-b456-426614174002"
 *         parent_id: "456e7890-e89b-12d3-a456-426614174111"
 *         text: "Using React.memo is a good start, but combining it with lazy loading for large components can further improve performance."
 *         created_at: "2025-01-23T16:45:00Z"
 *         user_id: "123e4567-e89b-12d3-a456-426614174000"
 *     Topic:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the Topic.
 *         name:
 *           type: string
 *           description: The name of the Topic.
 *       example:
 *         id: "abc12345-e89b-12d3-a456-426614174567"
 *         name: "React"
 *     Follow:
 *       type: object
 *       required:
 *         - id
 *         - user_id
 *         - target_user_id
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the relationship.
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the user who initiated the relationship.
 *         target_user_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the target user in the relationship.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the relationship was created.
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174001"
 *         user_id: "456e7890-e89b-12d3-a456-426614174111"
 *         target_user_id: "789e1234-e89b-12d3-a456-426614174222"
 *         created_at: "2025-01-23T12:00:00Z"
 *     Likes:
 *       type: object
 *       required:
 *         - id
 *         - type
 *         - type_id
 *         - user_id
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the NNS entity.
 *         type:
 *           type: string
 *           description: The type or category of the NNS entity.
 *         type_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier associated with the type.
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the user.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the NNS entity was created.
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         type: "Example Type"
 *         type_id: "456e7890-e89b-12d3-a456-426614174111"
 *         user_id: "789e1234-e89b-12d3-a456-426614174222"
 *         created_at: "2025-01-23T15:45:00Z"
 */
const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Quora API - OpenAPI 3.0",
      version: "1.0.0",
      description: `
  This is a Quora-like API specification based on OpenAPI 3.0.
  It includes endpoints for managing users, questions, answers, comments, topics, follows, and likes.

  You can now help us improve this API by making changes to the definition itself
  or to the code! Over time, we can enhance the API and expose new features while
  maintaining a user-friendly experience.

  **Useful Links:**
  - [GitHub Repository](https://github.com/MRPERFECT0603/Qoura)
  - [Contribute to the API](https://github.com/MRPERFECT0603/Qoura/pulls)`,
      contact: {
        name: "The Developer",
        email: "vivekshaurya62@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "The LocalHost server",
      },
      {
        url: "http://api.example.com/v1",
        description: "Main production server",
      },
      {
        url: "https://qoura.onrender.com",
        description: "Internal staging server for Development",
      },
    ],
  },
  apis: [
    path.join(__dirname, "Routes/*.js"),
    path.join(__dirname, "Routes/*.ts"),
    path.join(__dirname, "swagger*.ts"),
    path.join(__dirname, "swagger*.js"),
  ],
});
export default swaggerSpec;