Customer Support / Ticketing System API
A RESTful API for managing customer support tickets, designed for SaaS companies and customer support teams.
It allows users to create tickets, agents to manage and resolve them, and supports authentication, authorization, and ticket conversations.

Features
-User & Agent authentication (JWT)
-Role‑based access control
-Create and manage support tickets
-Assign tickets to support agents
-Update ticket status (open, pending, resolved)
-Reply to tickets (conversation thread)
-Filter tickets by user or status

Tech Stack
-Node.js
-Express.js
-MongoDB + Mongoose
-JWT (Authentication)
-bcryptjs (Password hashing)

Project Structure
src/
 ├── app.js
 ├── server.js
 ├── config/
 │    └── db.js
 ├── controllers/
 │    ├── auth.controller.js
 │    └── ticket.controller.js
 ├── routes/
 │    ├── auth.routes.js
 │    └── ticket.routes.js
 ├── models/
 │    ├── user.model.js
 │    └── ticket.model.js
 ├── middlewares/
 │    └── auth.middleware.js
 └── utils/
      └── generateToken.js

Installation & Setup
Clone repository
git clone <https://github.com/Faithful-Andre/support-ticket-api.git>
cd support-ticket-api

Install dependencies
npm install

Run the server
npm run dev
Server will start on: http://localhost:8000

Authentication
All protected routes require a JWT token in the header: Authorization: Bearer <token>

Ticket Status Values
- Open
- Pending
- Resolved

Database Models
- User
* Name
* Email (unique)
* Password (hashed)
* Role (user or agent)

- Ticket
* Title
* Description
* Status
* CreatedBy (User)
* AssignedTo (Agent)
* Replies (message thread)
* Timestamps

Testing
All endpoints were tested using Postman with valid JWT tokens for protected routes.

Author: 
Guobadia Andre Faithful

Reg Number: 
BD/2025/TC4/153

Customer Support / Ticketing System API