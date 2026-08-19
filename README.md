# Intern Progress Tracker

A microservices-based web application for managing interns, tracking tasks, recording evaluations, monitoring progress, and generating progress digest reports.

## Features

- Intern management
- Task management
- Notes and evaluations
- Individual intern progress summary
- Notification service
- Progress digest and summary reports
- Modern React frontend
- REST APIs using Node.js and Express
- Docker containerization
- Docker Compose support
- Kubernetes deployment
- CI/CD with GitHub Actions

## Project Architecture

The application consists of three main components:

```text
                    ┌──────────────────────┐
                    │    React Frontend    │
                    │      Vite + CSS      │
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
                               │ Data
                               ▼
                    ┌──────────────────────┐
                    │    Data Storage      │
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
 project structure
 intern-progress-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── tracker-api/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── digest-service/
│   ├── server.js
│   └── package.json
│
├── docker-compose.yml
└── README.md
Services
1. Tracker API

The Tracker API manages intern-related data and provides REST endpoints for:

Interns
Tasks
Notes
Evaluations
Progress summaries

Port: 3000

2. Digest Service

The Digest Service communicates with the Tracker API and provides:

Notifications
Progress digest
Summary reports

Port: 4000

3. React Frontend

The frontend provides a user-friendly interface for:

Viewing interns
Managing tasks
Viewing evaluations
Monitoring intern summaries
Navigating between application modules

Technology: React + Vite

Development Port: 5173

Technologies Used
Frontend
React
Vite
JavaScript
HTML
CSS
Backend
Node.js
Express.js
REST API
Axios
DevOps
Docker
Docker Compose
Kubernetes
Minikube
GitHub Actions
Git & GitHub
API Endpoints
Tracker API
GET    /interns
POST   /interns
GET    /interns/:id
PUT    /interns/:id
DELETE /interns/:id


GET    /tasks
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id


GET    /evaluations
POST   /evaluations


GET    /interns/:id/summary
Digest Service
POST /notify
GET  /notify/digest
Running the Project
1. Start Tracker API
cd tracker-api
npm install
npm start

Tracker API will run on:

http://localhost:3000
2. Start Digest Service

Open another terminal:

cd digest-service
npm install
npm start

Digest Service will run on:

http://localhost:4000
3. Start React Frontend

Open another terminal:

cd frontend
npm install
npm run dev

The frontend will run on:

http://localhost:5173
Running with Docker

Build and start the services using Docker Compose:

docker compose up --build

To stop the services:

docker compose down
Kubernetes Deployment

The project also supports deployment using Kubernetes and Minikube.

Start Minikube:

minikube start --driver=docker

Apply the Kubernetes configurations:

kubectl apply -f .

Check running pods:

kubectl get pods

Check services:

kubectl get svc
CI/CD

GitHub Actions is used for continuous integration and deployment workflow.

The workflow validates the project and helps automate the development and deployment process.

Project Status

Completed Capstone Project

The project includes:

React frontend
Tracker API
Digest Service
REST API integration
Docker
Docker Compose
Kubernetes
Minikube
GitHub Actions CI/CD
Progress summary functionality
Notification and digest functionality
 
           // complete project//
           

              