# Quora-like Application (Backend)

This project is a **Quora-like application** built using **TypeScript**, **Express.js**, and **Postgres**. It provides essential functionalities for a Q&A platform, including user registration, question posting, answer management, and more.

## **Table of Contents**

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
  - [User API](#user-api)
  - [Question API](#question-api)
  - [Answer API](#answer-api)
- [Setup Instructions](#setup-instructions)
- [Contributing](#contributing)
- [Contact](#contact-developer)

## **Overview**

This backend system serves as the core of a **Quora-like application**, providing a platform where users can post questions, write answers, and engage with others' content. The application also supports user authentication, profile management, and dynamic question searches.

### **Key Features:**
- **User Authentication**: Register, login, and update user profiles.
- **Questions**: Post, edit, and search questions.
- **Answers**: Write, edit, and like answers.
- **Comments**: Add comments to answers.
- **Likes & Follows**: Like answers and follow other users.

## **Technologies Used**

- **Node.js** & **Express.js** for building the REST API.
- **Postgres** for data storage.
- **Swagger** for API documentation.

## **Database Configuration**

**Local Database**:  
You can use a local Postgres database by setting up the following in your `.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=postgres
```

**Droplet Database** (For deployment on a remote server):
```
DB_HOST=your_host
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_name
```

## **API Endpoints**

### **1. User API**

#### 1.1 **User Registration**
- **POST** `/api/users/register`
- **Request Body**:
  ```json
  {
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "securePassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### 1.2 **User Login**
- **POST** `/api/users/login`
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securePassword"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

---

### **2. Question API**

#### 2.1 **Post a Question**
- **POST** `/api/questions`
- **Authorization**: Bearer Token
- **Request Body**:
  ```json
  {
    "title": "How to learn React?",
    "body": "Can anyone share the best resources for learning React?"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Question posted successfully",
    "questionId": "12345"
  }
  ```

#### 2.2 **Search Questions**
- **GET** `/api/questions/search`
- **Query Parameter**: `query`
- **Example**: `/api/questions/search?query=React`
- **Response**:
  ```json
  [
    {
      "questionId": "12345",
      "title": "How to learn React?",
      "body": "Can anyone share the best resources for learning React?"
    }
  ]
  ```

---

### **3. Answer API**

#### 3.1 **Post an Answer**
- **POST** `/api/answers`
- **Authorization**: Bearer Token
- **Request Body**:
  ```json
  {
    "questionId": "12345",
    "answer": "Start with the official React docs."
  }
  ```
- **Response**:
  ```json
  {
    "message": "Answer posted successfully",
    "answerId": "54321"
  }
  ```

---

### **4. Comment API**

#### 4.1 **Add a Comment to an Answer**
- **POST** `/api/comments`
- **Authorization**: Bearer Token
- **Request Body**:
  ```json
  {
    "answerId": "54321",
    "comment": "This is a great answer, thanks!"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Comment added successfully"
  }
  ```

---

### **5. Like & Follow API**

#### 5.1 **Like an Answer**
- **POST** `/api/likes`
- **Authorization**: Bearer Token
- **Request Body**:
  ```json
  {
    "answerId": "54321"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Answer liked successfully"
  }
  ```

#### 5.2 **Follow a User**
- **POST** `/api/follows`
- **Authorization**: Bearer Token
- **Request Body**:
  ```json
  {
    "userId": "67890"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User followed successfully"
  }
  ```

## **Setup Instructions**

1. Clone the repository:
   ```bash
   git clone https://github.com/MRPERFECT0603/Qoura.git
   ```

2. Navigate to the project directory:
   ```bash
   cd quora-backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables in a `.env` file:
   - For local development, use the following:
   ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_NAME=postgres
   ```

   - For deployment on a droplet or remote server, use:
   ```
    DB_HOST=your_host
    DB_PORT=5432
    DB_USER=your_user
    DB_PASSWORD=your_password
    DB_NAME=your_name
    ```

5. Run the server:
   ```bash
   npm run dev
   ```

6. The backend should now be running at `http://localhost:8000`.



## **Contributing**

Feel free to fork this repository and submit pull requests. All contributions are welcome!

1. Fork the repository.
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/quora-clone-backend.git
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
4. Make your changes and commit them:
   ```bash
   git commit -am "Description of the changes"
   ```
5. Push to your branch:
   ```bash
   git push origin feature-name
   ```
6. Open a pull request from your branch.

## **Contact Developer**

If you have any questions or feedback regarding the project, feel free to reach out to the developer using the following details:

- **Name**: Vivek
- **Email**: [vivekshaurya62@gmail.com](mailto:vivekshaurya62@gmail.com)
- **GitHub**: [https://github.com/MRPERFECT0603](https://github.com/MRPERFECT0603)
- **LinkedIn**: [https://www.linkedin.com/in/vivek-shaurya](https://www.linkedin.com/in/vivek-shaurya)

