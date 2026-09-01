import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Header from "./components/header";

import Interns from "./views/Interns";
import Tasks from "./views/Tasks";
import Evaluations from "./views/Evaluations";
import Summary from "./views/Summary";

function App() {
  const [currentView, setCurrentView] = useState("interns");

  return (
    <div className="app">

      <Header />

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