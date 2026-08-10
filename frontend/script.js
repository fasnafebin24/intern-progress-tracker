const API_URL = "https://zany-carnival-5gjqgqx5wwp4h4gp4-3000.app.github.dev";

// ================================
// Load Summary
// ================================

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
            document.getElementById("averageScore").innerText =
                data.averageScore;
        })
        .catch(error => {
            console.error("Summary error:", error);
        });
}


// ================================
// Load Tasks
// ================================

function loadTasks() {
    fetch(`${API_URL}/tasks`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load tasks");
            }
            return response.json();
        })
        .then(tasks => {
            const taskList = document.getElementById("taskList");

            taskList.innerHTML = "";

            if (tasks.length === 0) {
                taskList.innerHTML = `
                    <p class="subtitle">No tasks found.</p>
                `;
                return;
            }

            tasks.forEach(task => {

                const taskItem = document.createElement("div");
                taskItem.className = "task-item";

                // ----------------------------
                // Task Information
                // ----------------------------

                const taskInfo = document.createElement("div");
                taskInfo.className = "task-info";

                const title = document.createElement("strong");
                title.innerText = task.title;

                const status = document.createElement("span");
                status.className =
                    task.status === "Done"
                        ? "task-status status-done"
                        : "task-status status-pending";

                status.innerText = task.status;

                taskInfo.appendChild(title);
                taskInfo.appendChild(status);


                // ----------------------------
                // Actions
                // ----------------------------

                const actions = document.createElement("div");
                actions.className = "task-actions";


                // Status Switch
                const switchLabel = document.createElement("label");
                switchLabel.className = "switch";

                const switchInput = document.createElement("input");
                switchInput.type = "checkbox";

                switchInput.checked = task.status === "Done";

                const slider = document.createElement("span");
                slider.className = "slider";


                switchInput.onchange = function () {

                    const newStatus =
                        switchInput.checked ? "Done" : "Pending";

                    updateTaskStatus(task.id, newStatus);
                };


                switchLabel.appendChild(switchInput);
                switchLabel.appendChild(slider);


                // ----------------------------
                // Update Button
                // ----------------------------

                const updateButton = document.createElement("button");

                updateButton.className = "secondary-btn";
                updateButton.innerText = "Update";

                updateButton.onclick = function () {

                    showUpdateForm(
                        task.id,
                        task.title,
                        task.status,
                        taskItem
                    );

                };


                // ----------------------------
                // Delete Button
                // ----------------------------

                const deleteButton = document.createElement("button");

                deleteButton.className = "danger-btn";
                deleteButton.innerText = "Delete";

                deleteButton.onclick = function () {
                    deleteTask(task.id);
                };


                // ----------------------------
                // Add Actions
                // ----------------------------

                actions.appendChild(switchLabel);
                actions.appendChild(updateButton);
                actions.appendChild(deleteButton);

                taskItem.appendChild(taskInfo);
                taskItem.appendChild(actions);

                taskList.appendChild(taskItem);
            });
        })
        .catch(error => {

            console.error("Tasks error:", error);

            document.getElementById("taskList").innerHTML = `
                <p class="task-message error">
                    Unable to load tasks.
                </p>
            `;
        });
}


// ================================
// Update Only Task Status
// ================================

function updateTaskStatus(id, status) {

    fetch(`${API_URL}/tasks/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            status: status
        })

    })
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to update task status");
            }

            return response.json();
        })

        .then(data => {

            loadTasks();
            loadSummary();

        })

        .catch(error => {

            console.error("Status update error:", error);

            loadTasks();
        });
}


// ================================
// Create Task
// ================================

function createTask() {

    const titleInput = document.getElementById("taskTitle");
    const statusInput = document.getElementById("taskStatus");
    const message = document.getElementById("taskMessage");

    const title = titleInput.value.trim();
    const status = statusInput.value;


    if (title === "") {

        message.innerText = "Please enter a task title.";
        message.className = "task-message error";

        titleInput.focus();

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

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            return response.json();
        })

        .then(data => {

            message.innerText = "Task created successfully.";
            message.className = "task-message success";

            titleInput.value = "";
            statusInput.value = "Pending";

            loadTasks();
            loadSummary();
        })

        .catch(error => {

            console.error("Create task error:", error);

            message.innerText = "Unable to create task.";
            message.className = "task-message error";
        });
}


// ================================
// Show Update Form
// ================================

function showUpdateForm(id, oldTitle, oldStatus, taskItem) {

    const taskInfo = taskItem.querySelector(".task-info");
    const taskActions = taskItem.querySelector(".task-actions");


    taskInfo.innerHTML = `
        <div class="update-form">

            <input
                type="text"
                id="updateTitle-${id}"
                value="${oldTitle}"
            >

            <select id="updateStatus-${id}">

                <option value="Pending">Pending</option>

                <option value="Done">Done</option>

            </select>

            <button
                class="primary-btn"
                onclick="saveTaskUpdate(${id})">
                Save
            </button>

            <button
                class="secondary-btn"
                onclick="loadTasks()">
                Cancel
            </button>

        </div>
    `;


    document.getElementById(`updateStatus-${id}`).value = oldStatus;

    taskActions.style.display = "none";
}


// ================================
// Save Updated Task
// ================================

function saveTaskUpdate(id) {

    const titleInput =
        document.getElementById(`updateTitle-${id}`);

    const statusInput =
        document.getElementById(`updateStatus-${id}`);


    const title = titleInput.value.trim();
    const status = statusInput.value;


    if (title === "") {

        titleInput.focus();

        return;
    }


    fetch(`${API_URL}/tasks/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            status: status
        })

    })

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            return response.json();
        })

        .then(data => {

            loadTasks();
            loadSummary();

        })

        .catch(error => {

            console.error("Update task error:", error);
        });
}


// ================================
// Delete Task
// ================================

function deleteTask(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this task?");


    if (!confirmDelete) {
        return;
    }


    fetch(`${API_URL}/tasks/${id}`, {

        method: "DELETE"

    })

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            return response.json();
        })

        .then(data => {

            loadTasks();
            loadSummary();

        })

        .catch(error => {

            console.error("Delete task error:", error);
        });
}


// ================================
// Load Data
// ================================

loadSummary();
loadTasks();