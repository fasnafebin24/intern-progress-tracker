import logo from "../assets/ipt-logo.png";
import "../views/header.css";
function Header() {
  return (
    <header className="header">

      <div className="header-brand">
        <img
          src={logo}
          alt="Intern Progress Tracker"
          className="header-logo"
        />

        <div>
          <h1>
            Intern <span>Progress Tracker</span>
          </h1>

          <p>
            Manage interns, tasks, evaluations and progress
          </p>
        </div>
      </div>

    </header>
  );
}

export default Header;