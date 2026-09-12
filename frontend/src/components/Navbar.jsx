import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">♻️</div>

        <div>
          <h2>Waste Journey</h2>
          <h2>Tracking</h2>
        </div>
      </div>

      <p className="sidebar-subtitle">
        QR-Based Waste Tracking Dashboard
      </p>

      <div className="nav-links">

        <Link to="/">
          <span>🏠</span>
          Dashboard
        </Link>

        <Link to="/create-batch">
          <span>➕</span>
          Create Batch
        </Link>

        <Link to="/qr-scanner">
          <span>⌁</span>
          QR Scanner
        </Link>

        <Link to="/tracking">
          <span>📍</span>
          Tracking
        </Link>

      </div>

      <div className="sidebar-bottom">
        <p>Clean Today</p>
        <p>Greener Tomorrow 🌱</p>
      </div>
    </aside>
  );
}

export default Navbar;