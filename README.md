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

The Tracker API requires the following environment variable:

```env
MONGODB_URI=your_mongodb_connection_string
```

For Docker Compose, the variable is provided through the `tracker-api/.env` file and loaded using `env_file`.

For Kubernetes, the variable is provided through a Kubernetes Secret using `secretKeyRef`.

The actual MongoDB connection string should never be committed to source code or documentation.

## API Services

### Tracker API

**Port:** `3000`

The Tracker API manages:

* Interns
* Tasks
* Notes
* Evaluations
* Individual intern progress summaries

### Digest Service

**Port:** `4000`

The Digest Service handles:

* Notifications
* Progress digest reports

## Testing

The Tracker API includes automated API tests using Jest and Supertest.

### Automated Tests

The test suite covers all four API resources:

* Interns
* Tasks
* Evaluations
* Notes

The tests cover:

* GET all endpoints
* GET by ID endpoints
* POST endpoints
* PUT endpoints
* DELETE endpoints
* Validation and error cases
* Parent resource 404 cases for Tasks, Evaluations, and Notes

Tests use `mongodb-memory-server` to provide an isolated in-memory MongoDB database. No real MongoDB database is required for running the automated tests.

To run the tests:

```bash
cd tracker-api
npm test