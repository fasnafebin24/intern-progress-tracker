# intern-progress-tracker
# Intern Progress Tracker

A simple microservices-based application for tracking intern progress, tasks, evaluations, and notifications.

## Features

*  Intern management
*  Task management
*  Notes and evaluations
*  Intern progress summary
*  Notification and digest service
*  HTML, CSS, and JavaScript frontend
* REST APIs using Node.js and Express

## Project Structure

```text
intern-progress-tracker/
├── frontend/
├── tracker-api/
└── digest-service/
```

### Tracker API

Runs on port `3000` and handles:

* Interns
* Tasks
* Notes
* Evaluations
* Progress summaries

### Digest Service

Runs on port `4000` and handles:

* Notifications
* Progress digest
* Summary reports

## Technologies

* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* Axios
* Git & GitHub
* Docker / Kubernetes

## Running the Project

Start the Tracker API:

```bash
cd tracker-api
npm start
```

Start the Digest Service:

```bash
cd digest-service
npm start
```

## API Examples

```text
GET /interns
GET /tasks
GET /evaluations
GET /interns/:id/summary
GET /notify/digest
```

## Project Status

Currently under development.
