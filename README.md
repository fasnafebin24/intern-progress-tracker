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

Completed capstone project.

architecture
+-------------------------------------------------------+

                     |                     USER / CLIENT                     |
                     +-------------------------------------------------------+

                                         |                       |
                       (Full CRUD & Summaries)               (Get System Digest)

                                         |                       |
                                         v                       v
+--------------------------------------------------+   +------------------------------------+

|             SERVICE A: TRACKER API               |   |     SERVICE B: DIGEST SERVICE      |
+--------------------------------------------------+   |------------------------------------|

|  Endpoints:                                      |   |  Endpoints:                        |
|  - /interns     (CRUD)                           |   |  - /digest                         |
|  - /tasks       (CRUD)                           |   +------------------------------------+
|  - /evaluations (CRUD)                           |                             |
|  - /interns/:id/summary                          |                             |
+--------------------------------------------------+                             |

         |                                                                       |
         | (1) HTTP POST /notifications (Async-like Event)                       |
         |     "Hey, a new evaluation was added!"                                |
         |----------------------------------------------------------------------->

         |                                                                       |
         | (2) HTTP GET /interns, /tasks, /evaluations                           |
         |     "Give me the latest raw data for the system digest report."       |
         |<----------------------------------------------------------------------+
         |
         v
+------------------+

| INTERNAL DB /    |
| DATA STORAGE     |
+------------------+
This capstone project is completed and includes the Tracker API, Digest Service, Docker, Docker Compose, Kubernetes, and CI/CD.