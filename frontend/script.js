const API_URL = "https://zany-carnival-5gjqgqx5wwp4h4gp4-3000.app.github.dev";

function loadSummary() {
    fetch(`${API_URL}/interns/1/summary`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load summary");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("totalTasks").innerText = data.totalTasks;
            document.getElementById("completedTasks").innerText = data.completedTasks;
            document.getElementById("averageScore").innerText = data.averageEvaluationScore;
        })
        .catch(error => {
            console.error("Summary error:", error);
        });
}

function loadTasks() {
    fetch(`${API_URL}/tasks`)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");

            taskList.innerHTML = "";

            if (tasks.length === 0) {
                taskList.innerHTML = "<p>No tasks found.</p>";
                return;
            }

            tasks.forEach(task => {
                const taskItem = document.createElement("div");

                taskItem.innerHTML = `
                    <p>
                        <strong>${task.title}</strong>
                        - ${task.status}

                        <button onclick="updateTask(${task.id}, '${task.title}', '${task.status}')">
                            Update
                        </button>

                        <button onclick="deleteTask(${task.id})">
                            Delete
                        </button>
                    </p>
                `;

                taskList.appendChild(taskItem);
            });
        })
        .catch(error => {
            console.error("Tasks error:", error);
        });
}

function createTask() {
    const title = document.getElementById("taskTitle").value;
    const status = document.getElementById("taskStatus").value;

    if (title.trim() === "") {
        alert("Please enter a task title");
        return;
    }

    fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            internId: 1,
            title: title,
            status: status
        })
    })
        .then(response => response.json())
        .then(data => {
            alert("Task created successfully");

            document.getElementById("taskTitle").value = "";

            loadTasks();
            loadSummary();
        })
        .catch(error => {
            console.error("Create task error:", error);
        });
}

function updateTask(id, oldTitle, oldStatus) {
    const newTitle = prompt("Enter task title:", oldTitle);

    if (newTitle === null || newTitle.trim() === "") {
        return;
    }

    const newStatus = prompt(
        "Enter status (Pending or Done):",
        oldStatus
    );

    if (newStatus === null) {
        return;
    }

    fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: newTitle,
            status: newStatus
        })
    })
        .then(response => response.json())
        .then(data => {
            alert("Task updated successfully");

            loadTasks();
            loadSummary();
        })
        .catch(error => {
            console.error("Update task error:", error);
        });
}

function deleteTask(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) {
        return;
    }

    fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {
            alert("Task deleted successfully");

            loadTasks();
            loadSummary();
        })
        .catch(error => {
            console.error("Delete task error:", error);
        });
}

// Load data when page opens
loadSummary();
loadTasks();