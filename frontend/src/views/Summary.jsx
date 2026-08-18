import { useEffect, useState } from "react";
import Card from "../components/Card";

function Summary() {
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState("");

  const [summary, setSummary] = useState(null);
  const [digest, setDigest] = useState(null);

  const [error, setError] = useState("");

  // Fetch interns and digest when page loads
  useEffect(() => {
    fetchInterns();
    fetchDigest();
  }, []);

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
          setSelectedIntern(data[0].id);
          fetchSummary(data[0].id);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to connect to Tracker API.");
      });
  };

  // Fetch selected intern summary
  const fetchSummary = (internId) => {
    fetch(`/api/interns/${internId}/summary`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch summary");
        }

        return response.json();
      })
      .then((data) => {
        setSummary(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to fetch intern summary.");
      });
  };

  // Fetch digest
  const fetchDigest = () => {
    fetch("/digest/notify/digest")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch digest");
        }

        return response.json();
      })
      .then((data) => {
        setDigest(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to connect to Digest Service.");
      });
  };

  // Change selected intern
  const handleInternChange = (event) => {
    const id = event.target.value;

    setSelectedIntern(id);
    fetchSummary(id);
  };

  return (
    <div>
      <h1>Summary / Digest</h1>

      {error && <p>{error}</p>}

      <h2>Intern Summary</h2>

      <div>
        <label>Select Intern: </label>

        <select
          value={selectedIntern}
          onChange={handleInternChange}
        >
          {interns.map((intern) => (
            <option key={intern.id} value={intern.id}>
              {intern.name}
            </option>
          ))}
        </select>
      </div>

      <br />

      {summary && (
        <Card title="Intern Summary">
          <p>
            <strong>Total Tasks:</strong>{" "}
            {summary.totalTasks}
          </p>

          <p>
            <strong>Completed Tasks:</strong>{" "}
            {summary.completedTasks}
          </p>

          <p>
            <strong>Average Score:</strong>{" "}
            {summary.averageScore}
          </p>
        </Card>
      )}

      {digest && (
        <Card title="Digest">
          <p>
            <strong>Total Interns:</strong>{" "}
            {digest.totalInterns}
          </p>

          <p>
            <strong>Total Tasks:</strong>{" "}
            {digest.totalTasks}
          </p>

          <p>
            <strong>Completed Tasks:</strong>{" "}
            {digest.completedTasks}
          </p>

          <p>
            <strong>Average Evaluation Score:</strong>{" "}
            {digest.averageEvaluationScore}
          </p>
        </Card>
      )}
    </div>
  );
}

export default Summary;