# Server for Final Project

This repository contains the **server-side code** for the Final Project, which works alongside the [client-side repository](https://github.com/56bar56/finalProject). The server handles API requests, data storage, and all backend logic for the application.

## 🏗 Project Overview
The server manages users, trips, and other data, providing secure endpoints for the client-side application. It includes authentication, CRUD operations, and integration with a MongoDB database, forming the backbone of the final project.

## 🛠 Technology Stack
- **Node.js** – Server runtime  
- **Express.js** – Web framework for routing and API endpoints  
- **MongoDB** – Database for storing application data  
- **Mongoose** – Object modeling for MongoDB  
- **Additional Libraries** – bcrypt, JWT, dotenv, cors  

## ⚡ Features
- RESTful API for client communication  
- User authentication and authorization  
- CRUD operations for main entities (users, trips, etc.)  
- Data validation and error handling  
- Integration with the client-side React application  

## 🚀 Getting Started
### Prerequisites
- Node.js and npm installed  
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)  

### Installation
1. Clone the repository:  
   git clone https://github.com/56bar56/serverFinalProject.git

2. Navigate to the project folder:
   cd serverFinalProject

3. Install dependencies:
   npm install

4. Create a .env file with environment variables, for example:
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key

5. Start the server:
   npm start

6. The server will run on http://localhost:5000 by default.

## 📦 API Endpoints

POST /users/register – Register a new user

POST /users/login – Authenticate a user

GET /trips – Retrieve all trips

POST /trips – Create a new trip

PUT /trips/:id – Update a trip

DELETE /trips/:id – Delete a trip


## 🔑 Security
- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Input validation is implemented for all endpoints


## 📄 License

Open-source for educational purposes.
