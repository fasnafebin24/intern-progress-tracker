import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

import Interns from "./views/Interns";
import Tasks from "./views/Tasks";
import Evaluations from "./views/Evaluations";
import Summary from "./views/Summary";

function App() {
  const [currentView, setCurrentView] = useState("interns");

  return (
    <div className="app">
      <header className="header">
  <div className="header-content">

    <div className="header-left">
      <div className="header-icon">
        📊
      </div>

      <div>
        <h1>
          Intern <span>Progress</span> Tracker
        </h1>

        <p>
          Manage interns, tasks, evaluations and progress
        </p>
      </div>
    </div>

    

  </div>
</header>

      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <main className="main-content">
        {currentView === "interns" && <Interns />}
        {currentView === "tasks" && <Tasks />}
        {currentView === "evaluations" && <Evaluations />}
        {currentView === "summary" && <Summary />}
      </main>
    </div>
  );
}

export default App;