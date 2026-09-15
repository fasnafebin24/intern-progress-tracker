# Intern Progress Tracker

A microservices-based web application for managing interns, tracking tasks, recording evaluations and notes, monitoring progress, and generating progress digest reports.

## Features

* Intern management
* Task management
* Notes management
* Evaluation management
* Individual intern progress summary
* Notification service
* Progress digest reports
* MongoDB database integration
* Mongoose ODM
* Persistent data storage
* React + Vite frontend
* REST APIs using Node.js and Express
* Docker containerization
* Docker Compose support
* Kubernetes deployment
* CI/CD with GitHub Actions

## Project Architecture

```text
                    ┌──────────────────────┐
                    │    React Frontend    │
                    │      Vite + CSS      │
                    │      Port: 5173      │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │     Tracker API      │
                    │   Node.js + Express  │
                    │      Port: 3000      │
                    └──────────┬───────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌──────────────────────┐
                    │       MongoDB        │
                    │   Persistent Storage │
                    └──────────────────────┘
                               ▲
                               │
                         HTTP Requests
                               │
                    ┌──────────┴───────────┐
                    │    Digest Service    │
                    │   Node.js + Express  │
                    │      Port: 4000      │
                    └──────────────────────┘
```

## Prerequisites

Make sure the following tools are installed:

* Node.js
* npm
* Docker
* Docker Compose
* Kubernetes / Minikube
* MongoDB

## MongoDB Configuration

The application uses MongoDB for persistent data storage through Mongoose.

### Docker Compose

Create a `.env` file inside the `tracker-api` directory:

-env
MONGODB_URI=your_mongodb_connection_string
```

Docker Compose loads the MongoDB connection string through the `env_file` configuration.

Do not commit the `.env` file or real MongoDB credentials to the repository.

### Kubernetes

For Kubernetes deployment, the MongoDB connection string is stored securely as a Kubernetes Secret.

Create the secret directly in the Kubernetes cluster:

```bash
kubectl create secret generic tracker-api-secret \
  --from-literal=MONGODB_URI="your_mongodb_connection_string"
```

The Tracker API reads `MONGODB_URI` from the Kubernetes Secret using `secretKeyRef`.

Do not commit Kubernetes Secret files containing real credentials to the repository.

## Running with Docker Compose

From the project root, run:

```bash
docker compose up --build
```

This starts the services configured in the Docker Compose configuration.

To stop the services:

```bash
docker compose down
```

## Running the Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Running with Kubernetes

Start Minikube:

```bash
minikube start --driver=docker
```

Create the MongoDB Kubernetes Secret before deploying the Tracker API:

```bash
kubectl create secret generic tracker-api-secret \
  --from-literal=MONGODB_URI="your_mongodb_connection_string"
```

Apply the Kubernetes configuration files:

```bash
kubectl apply -f kubernetes/
```

Check the running pods:

```bash
kubectl get pods
```

Check the Kubernetes services:

```bash
kubectl get svc
```

## Environment Variables

The Tracker API requires the following environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

`MONGODB_URI` is used to connect the Tracker API to MongoDB.

`JWT_SECRET` is used to sign and verify JSON Web Tokens (JWT).

For Docker Compose, these variables are provided through the `tracker-api/.env` file and loaded using `env_file`.

For Kubernetes, `MONGODB_URI` is provided through a Kubernetes Secret using `secretKeyRef`. The JWT secret should also be stored securely and should not be hardcoded.

The actual MongoDB connection string, JWT secret, and other sensitive credentials should never be committed to source code or documentation.

## Authentication

The Tracker API uses **JWT-based authentication** to protect write operations.

### User Registration

New users can register using:

```http
POST /auth/register
```

Request body:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

Passwords are hashed using **bcrypt** before they are stored in MongoDB. Plaintext passwords are never stored.

### User Login

Users can log in using:

```http
POST /auth/login
```

Request body:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

A successful login returns a JWT token.

The token expires after **1 hour**.

### Using the JWT Token

Protected requests must include the token in the `Authorization` header:

```http
Authorization: Bearer <your_jwt_token>
```

### Protected Routes

All write operations are protected by JWT authentication.

| Resource    | Public | Protected         |
| ----------- | ------ | ----------------- |
| Interns     | GET    | POST, PUT, DELETE |
| Tasks       | GET    | POST, PUT, DELETE |
| Evaluations | GET    | POST, PUT, DELETE |
| Notes       | GET    | POST, PUT, DELETE |

GET endpoints remain public so that application data can be viewed without authentication.

POST, PUT, and DELETE endpoints require a valid JWT because these operations modify application data.

Requests without a token, with an invalid token, or with an expired token return:

```http
401 Unauthorized
```

### Authentication Middleware

The `authMiddleware` verifies the JWT token using the `JWT_SECRET` environment variable.

If the token is valid, the request is allowed to continue to the protected endpoint.

If the token is missing, invalid, or expired, the request is rejected with a `401 Unauthorized` response.
To run the tests:

```bash
cd tracker-api
npm test