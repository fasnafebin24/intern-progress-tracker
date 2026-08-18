import Card from "../components/Card";
import { useEffect, useState } from "react";

function Evaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [taskId, setTaskId] = useState("");
  const [score, setScore] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch evaluations and tasks when page loads
  useEffect(() => {
    fetchEvaluations();
    fetchTasks();
  }, []);

  // Fetch evaluation history
  const fetchEvaluations = () => {
    fetch("/api/evaluations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch evaluations");
        }

        return response.json();
      })
      .then((data) => {
        setEvaluations(data);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to connect to Tracker API.");
      });
  };

  // Fetch tasks
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

        if (data.length > 0) {
          setTaskId(data[0].id);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to fetch tasks.");
      });
  };

  // Get task name
  const getTaskName = (id) => {
    const task = tasks.find(
      (item) => Number(item.id) === Number(id)
    );

    return task ? task.title : "Unknown Task";
  };

  // Submit evaluation
  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    const newEvaluation = {
      taskId: Number(taskId),
      score: Number(score),
      notes,
    };

    fetch("/api/evaluations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvaluation),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create evaluation");
        }

        return response.json();
      })
      .then((createdEvaluation) => {
        setEvaluations((previousEvaluations) => [
          ...previousEvaluations,
          createdEvaluation,
        ]);

        setScore("");
        setNotes("");
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to submit evaluation.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="view-container">

      <div className="page-heading">
        <h1>Evaluations</h1>
        <p>
          Review intern performance and submit evaluations
        </p>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <section className="section">

        <div className="section-heading">
          <h2>Evaluation History</h2>

          <span className="count-badge">
            {evaluations.length} Evaluation
            {evaluations.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="card-grid">

          {evaluations.map((evaluation) => (
            <Card
              key={evaluation.id}
              title={getTaskName(evaluation.taskId)}
            >

              <div className="evaluation-info">

                <div className="info-row">
                  <span className="info-label">
                    Score
                  </span>

                  <span className="score-badge">
                    ⭐ {evaluation.score} / 5
                  </span>
                </div>

                <div className="notes-box">
                  <span className="info-label">
                    Notes
                  </span>

                  <p>
                    {evaluation.notes}
                  </p>
                </div>

              </div>

            </Card>
          ))}

        </div>

      </section>

      <section className="section">

        <div className="section-heading">
          <h2>Submit Evaluation</h2>
        </div>

        <form
          className="modern-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Task</label>

            <select
              value={taskId}
              onChange={(event) =>
                setTaskId(event.target.value)
              }
              required
            >
              {tasks.map((task) => (
                <option
                  key={task.id}
                  value={task.id}
                >
                  {task.title}
                </option>
              ))}
            </select>
          </div>

          <br />

          <div className="form-group">
            <label>Score (1-5)</label>

            <input
              type="number"
              min="1"
              max="5"
              placeholder="Enter score from 1 to 5"
              value={score}
              onChange={(event) =>
                setScore(event.target.value)
              }
              required
            />
          </div>

          <br />

          <div className="form-group">
            <label>Notes</label>

            <textarea
              placeholder="Write evaluation notes..."
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              required
            />
          </div>

          <button
            className="primary-button"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : "✓ Submit Evaluation"}
          </button>

        </form>

      </section>

    </div>
  );
}

export default Evaluations;