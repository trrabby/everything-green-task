Next.js API and Webhook Implementation
This project implements two tasks:

Task 1: API Development & Authentication - A RESTful API with JWT authentication.

Task 2: Webhook Implementation - A webhook endpoint that validates requests and stores data in a JSON file.

Features
Task 1: API Development & Authentication

GET /api/users: Fetch all users.
POST /api/users: Add a new user (name, email, password fields).
GET /api/users/:id: Fetch a single user by ID.
JWT Authentication: Secure API routes using JWT authentication.

Task 2: Webhook Implementation
POST /api/webhook: Process incoming webhook requests.
Validate the request's signature.
Store request data (eventType, data) in a JSON file (db.json).
Return a response: { "success": true, "message": "Received" }.

Technologies Used
Next.js: Framework for building the API and webhook.

TypeScript: For type-safe development.

MongoDB: Database for storing user data (using Mongoose).

JWT (JSON Web Tokens): For authentication.

Crypto: For HMAC signature validation in the webhook.

Node.js: Runtime environment.

Postman: For testing API endpoints.

Setup and Installation
Prerequisites
Node.js (v18 or higher)

MongoDB (or a MongoDB Atlas connection string)

Postman (for testing)

Steps

Clone the repository:
git clone https://github.com/trrabby/everything-green-task.git
cd everything-green-task

Install dependencies:
npm install

Set up environment variables:
Create a .env.local file in the root directory.

Add the following variables:
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET and WEBHOOK_SECRET have been added manually.

Run the development server:
npm run dev
Access the API at http://localhost:3000

API Documentation
Task 1: API Development & Authentication

1. Fetch All Users
   Endpoint: GET http://localhost:3000/api/users

Authentication: Required (JWT token in Authorization header), You can have accessToken upon registration.

Response:
[
{
"_id": "67adfd83c624417cec6cc6d5",
"name": "Towfique",
"email": "trrabby551@gmail.com",
"password": "$2a$10$s8RPBVGba1pIm2fHQSeEierPbXFd6friRpceBgsZWlJyHllXtci4S",
"createdAt": "2025-02-13T14:11:15.079Z",
"updatedAt": "2025-02-13T14:11:15.079Z",
"__v": 0
}
]

2. Add a New User
   Endpoint: POST http://localhost:3000/api/users

Request Body:
{
"name":"Towfique",
"email":"trrabby222@gmail.com",
"password":"12345"
}

Response:

{
"message": "User created successfully",
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2FlMjAxMGM2MjQ0MTdjZWM2Y2M2ZTUiLCJpYXQiOjE3Mzk0NjQ3MjAsImV4cCI6MTczOTQ2ODMyMH0.JaFtFbE7CO1akPZHdgpwZWpLMq-mvDd9TARIJVFP5Jc",
"user": {
"name": "Towfique",
"email": "trrabby222@gmail.com",
"password": "$2a$10$jG4DkfLoi52m5NRnAWksUuvkpnGjBdTQRmVyjMf84E7jO/8nuQ9u6",
"\_id": "67ae2010c624417cec6cc6e5",
"createdAt": "2025-02-13T16:38:40.719Z",
"updatedAt": "2025-02-13T16:38:40.719Z",
"\_\_v": 0
}
}

3.  Fetch a Single User by ID
    Endpoint: GET http://localhost:3000/api/users/:id

Authentication: Required (JWT token in Authorization header).

Response:

[
{
"_id": "67ae2010c624417cec6cc6e5",
"name": "Towfique",
"email": "trrabby222@gmail.com",
"password": "$2a$10$jG4DkfLoi52m5NRnAWksUuvkpnGjBdTQRmVyjMf84E7jO/8nuQ9u6",
"createdAt": "2025-02-13T16:38:40.719Z",
"updatedAt": "2025-02-13T16:38:40.719Z",
"__v": 0
}
]

Task 2: Webhook Implementation

1. Process Webhook Request
   Endpoint: POST http://localhost:3000/api/webhook

Headers:

x-signature: <generated_signature> || 7ef5be301c1dba984977aa4dd733fe5b107ca609bbe42849b3fa222b3d7ba8af
Content-Type: application/json
Request Body:
{
"eventType": "test",
"data": {
"foo": "bar"
}
}

Response:
{
"success": true,
"message": "Received"
}

Folder Structure:

my-next-app/
├── app/
│ ├── api/
│ │ ├── users/
│ │ │ ├── route.ts
│ │ │ └── [id]/
│ │ │ └── route.ts
│ │ └── webhook/
│ │ └── route.ts
├── lib/
│ ├── db.ts
│ └── auth.ts
├── models/
│ └── User.ts
├── db.json
├── .env.local
└── package.json

Testing
Task 1: API Development & Authentication
Use Postman or Thunder Client to test the API endpoints.

Generate a JWT token by registering a new user (POST http://localhost:3000/api/users).

Use the token in the Authorization header for authenticated requests.

Task 2: Webhook Implementation
Generate a signature using the WEBHOOK_SECRET and request body.

Send a POST request to http://localhost:3000/api/webhook with the signature in the x-signature header.

Check the db.json file for stored data.
