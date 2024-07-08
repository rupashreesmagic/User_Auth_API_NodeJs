# User Authentication API

This is a Node.js API for user authentication with endpoints for user signup, login, and profile management. It uses Express.js for the server and MongoDB for data storage. Additionally, it sends a confirmation email upon successful user registration.

## Features

- User signup with email confirmation
- User login with JWT authentication
- User profile management
- Secure password hashing
- Comprehensive inline code documentation

## Table of Contents

1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [Running the Application](#running-the-application)
4. [API Documentation](#api-documentation)
   - [Signup](#signup)
   - [Login](#login)
   - [Profile](#profile)
   - [Confirm Email](#confirm-email)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rupashreesmagic/User_Auth_API_NodeJs.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
SENDGRID_API_KEY = your_sendgrid_account_api_key
```

Replace the placeholders with your actual credentials.

## Running the Application

To start the application, use the following command:

```bash
npm run dev
```

The server will start on the port specified in the `.env` file (default: 5000).

## API Documentation

### Signup

- **Endpoint:** `POST /api/signup`
- **Description:** Register a new user.
- **Headers:**
  - `Content-Type: application/json`
- **Body:**

  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "Password123"
  }
  ```

- **Response:**

  ```json
  {
    "_id": "user_id",
    "username": "testuser",
    "email": "testuser@example.com",
    "token": "jwt_token"
  }
  ```

### Login

- **Endpoint:** `POST /api/login`
- **Description:** Log in an existing user.
- **Headers:**
  - `Content-Type: application/json`
- **Body:**

  ```json
  {
    "email": "testuser@example.com",
    "password": "Password123"
  }
  ```

- **Response:**

  ```json
  {
    "_id": "user_id",
    "username": "testuser",
    "email": "testuser@example.com",
    "token": "jwt_token"
  }
  ```

### Profile

- **Endpoint:** `GET /api/profile`
- **Description:** Retrieve the authenticated user's profile.
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer jwt_token`
- **Response:**

  ```json
  {
    "_id": "user_id",
    "username": "testuser",
    "email": "testuser@example.com",
    "isConfirmed": true
  }
  ```

### Confirm Email

- **Endpoint:** `GET /api/confirm-email`
- **Description:** Confirm the user's email address.
- **Query Parameters:**
  - `token`: Email confirmation token
- **Response:**

  ```json
  {
    "message": "Email confirmed successfully"
  }
  ```

## Code Documentation

### Inline Comments

- Inline comments are added throughout the code to explain the logic and functionality.
- Descriptive variable and function names are used for better readability.

### Example:

```javascript
// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rupashreesmagic/User_Auth_API_NodeJs.git

   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@example.com
   SENDGRID_API_KEY = your_sengrid_account_api_key
   ```

4. **Run the application:**

   ```bash
   npm run dev
   ```

This will start the server on the specified port (default: 5000).

## Conclusion

This project provides a robust and secure user authentication system with email confirmation functionality. It follows best practices for Node.js development and includes detailed documentation for setup and API usage.

```

```
