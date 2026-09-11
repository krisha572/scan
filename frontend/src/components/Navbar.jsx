import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        WasteTrack
      </div>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/create-batch">Create Batch</Link>
        <Link to="/qr-scanner">QR Scanner</Link>
        <Link to="/tracking">Tracking</Link>
      </div>
    </nav>
  );
}

export default Navbar;