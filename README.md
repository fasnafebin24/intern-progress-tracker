cd /workspaces/intern-progress-tracker

cat > README.md <<'EOF'
# Intern Progress Tracker

A microservices-based web application for managing interns, tracking tasks, recording evaluations, monitoring progress, and generating progress digest reports.

## Features

- Intern management
- Task management
- Notes and evaluations
- Individual intern progress summary
- Notification service
- Progress digest and summary reports
- MongoDB database integration
- Mongoose ODM
- Persistent data storage
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