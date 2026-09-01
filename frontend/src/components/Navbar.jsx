import logo from "../assets/ipt-logo.png";

function Navbar({ currentView, setCurrentView }) {
  return (
    <nav className="navbar">

      <div className="nav-brand">
        <img
          src={logo}
          alt="IPT Logo"
          className="navbar-logo"
        />
        <span>IPT</span>
      </div>

      <div className="nav-links">

        <button
          className={currentView === "interns" ? "active" : ""}
          onClick={() => setCurrentView("interns")}
        >
          👥 Interns
        </button>

        <button
          className={currentView === "tasks" ? "active" : ""}
          onClick={() => setCurrentView("tasks")}
        >
          📋 Tasks
        </button>

        <button
          className={currentView === "evaluations" ? "active" : ""}
          onClick={() => setCurrentView("evaluations")}
        >
          ⭐ Evaluations
        </button>

        <button
          className={currentView === "summary" ? "active" : ""}
          onClick={() => setCurrentView("summary")}
        >
          📊 Summary / Digest
        </button>

      </div>

    </nav>
  );
}

export default Navbar;