import Card from "../components/Card";
import { useEffect, useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [interns, setInterns] = useState([]);

  const [title, setTitle] = useState("");
  const [internId, setInternId] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch tasks and interns when page loads
  useEffect(() => {
    fetchTasks();
    fetchInterns();
  }, []);

  // Fetch all tasks
  const fetchTasks = () => {
    fetch("/api/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to connect to Tracker API.");
      });
  };

  // Fetch all interns
  const fetchInterns = () => {
    fetch("/api/interns")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch interns");
        }

        return response.json();
      })
      .then((data) => {
        setInterns(data);

        if (data.length > 0) {
          setInternId(data[0].id);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to fetch interns.");
      });
  };

  // Create new task
  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    const newTask = {
      title,
      internId: Number(internId),
      status: "Pending",
    };

    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create task");
        }

        return response.json();
      })
      .then((createdTask) => {
        setTasks((previousTasks) => [
          ...previousTasks,
          createdTask,
        ]);

        setTitle("");
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to create task.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // Mark task as Done
  const markAsDone = (task) => {
    fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Done",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update task");
        }

        return response.json();
      })
      .then((updatedTask) => {
        setTasks((previousTasks) =>
          previousTasks.map((item) =>
            item.id === updatedTask.id
              ? updatedTask
              : item
          )
        );
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to update task.");
      });
  };

  // Find intern name
  const getInternName = (id) => {
    const intern = interns.find(
      (item) => Number(item.id) === Number(id)
    );

    return intern ? intern.name : "Unknown Intern";
  };

  return (
    <div className="view-container">

      <div className="page-heading">
        <h1>Tasks</h1>
        <p>Manage intern tasks and track completion</p>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <section className="section">

        <div className="section-heading">
          <h2>Task List</h2>

          <span className="count-badge">
            {tasks.length} Task{tasks.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="card-grid">

          {tasks.map((task) => (
            <Card
              key={task.id}
              title={task.title}
            >

              <div className="task-info">

                <div className="info-row">
                  <span className="info-label">
                    Intern
                  </span>

                  <span>
                    {getInternName(task.internId)}
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">
                    Status
                  </span>

                  {task.status === "Done" ? (
                    <span className="status-done">
                      ✓ Done
                    </span>
                  ) : (
                    <span className="status-pending">
                      ● Pending
                    </span>
                  )}
                </div>

              </div>

              {task.status !== "Done" && (
                <button
                  className="task-done-button"
                  onClick={() => markAsDone(task)}
                >
                  ✓ Mark as Done
                </button>
              )}

            </Card>
          ))}

        </div>

      </section>

      <section className="section">

        <div className="section-heading">
          <h2>Create New Task</h2>
        </div>

        <form
          className="modern-form"
          onSubmit={handleSubmit}
        >

          <div className="form-row">

            <div className="form-group">
              <label>Task Title</label>

              <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Intern</label>

              <select
                value={internId}
                onChange={(event) =>
                  setInternId(event.target.value)
                }
                required
              >
                {interns.map((intern) => (
                  <option
                    key={intern.id}
                    value={intern.id}
                  >
                    {intern.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <button
            className="primary-button"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Creating..."
              : "+ Create Task"}
          </button>

        </form>

      </section>

    </div>
  );
}

export default Tasks;