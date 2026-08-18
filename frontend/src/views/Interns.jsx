import Card from "../components/Card";
import { useEffect, useState } from "react";

function Interns() {
  const [interns, setInterns] = useState([]);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [track, setTrack] = useState("");

  const [submitting, setSubmitting] = useState(false);

  // Fetch all interns when the page loads
  useEffect(() => {
    fetchInterns();
  }, []);

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
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to connect to Tracker API.");
      });
  };

  // Add a new intern
  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    const newIntern = {
      name,
      email,
      startDate,
      track,
    };

    fetch("/api/interns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIntern),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create intern");
        }

        return response.json();
      })
      .then((createdIntern) => {
        setInterns((previousInterns) => [
          ...previousInterns,
          createdIntern,
        ]);

        setName("");
        setEmail("");
        setStartDate("");
        setTrack("");
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to add intern.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="view-container">

      <div className="page-heading">
        <h1>Interns</h1>
        <p>Manage your interns and track their progress</p>
      </div>

      {error && <div className="error">{error}</div>}

      <section className="section">
        <div className="section-heading">
          <h2>Intern List</h2>
          <span className="count-badge">
            {interns.length} Intern{interns.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="card-grid">
          {interns.map((intern) => (
            <Card key={intern.id} title={intern.name}>
              <div className="intern-info">
                <div className="info-row">
                  <span className="info-label">Email</span>
                  <span>{intern.email}</span>
                </div>

                <div className="info-row">
                  <span className="info-label">Start Date</span>
                  <span>{intern.startDate}</span>
                </div>

                <div className="info-row">
                  <span className="info-label">Track</span>
                  <span className="track-badge">
                    {intern.track}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Add New Intern</h2>
        </div>

        <form className="modern-form" onSubmit={handleSubmit}>

          <div className="form-row">

            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                placeholder="Enter intern name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Start Date</label>

              <input
                type="date"
                value={startDate}
                onChange={(event) =>
                  setStartDate(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Track</label>

              <input
                type="text"
                placeholder="e.g. Backend, Frontend"
                value={track}
                onChange={(event) =>
                  setTrack(event.target.value)
                }
                required
              />
            </div>

          </div>

          <button
            className="primary-button"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Adding..." : "+ Add Intern"}
          </button>

        </form>
      </section>

    </div>
  );
}

export default Interns;