import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BatchList from "./BatchList";
import "./Dashboard.css";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const savedBatches =
      JSON.parse(localStorage.getItem("wasteBatches")) || [];

    setBatches(savedBatches);
  }, []);

  const totalBatches = batches.length;

  const plasticWaste = batches.filter(
    (batch) => batch.type === "Plastic"
  ).length;

  const nonPlasticWaste = batches.filter(
    (batch) =>
      batch.type === "Non-Plastic" ||
      batch.type === "Non-plastic"
  ).length;

  const totalQuantity = batches.reduce(
    (total, batch) => {
      return total + (parseFloat(batch.quantity) || 0);
    },
    0
  );

  const inTransit = batches.filter(
    (batch) => batch.status === "In Transit"
  ).length;

  const received = batches.filter(
    (batch) => batch.status === "Received"
  ).length;

  const collected = batches.filter(
    (batch) => batch.status === "Collected"
  ).length;

  return (
    <div className="dashboard">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <h1>🌿 Hello, Welcome Back!</h1>

          <p>
            Track • Manage • Build a Cleaner Future
          </p>
        </div>

        <div className="profile-section">
          🔔
          <div className="profile-circle">
            K
          </div>
          <strong>Krisha</strong>
        </div>

      </div>


      {/* Hero Section */}

      <div className="hero-section">

        <div className="hero-content">

          <span className="hero-tag">
            Waste Journey Tracking
          </span>

          <h2>
            Small Steps <br />
            Make a Big Impact
          </h2>

          <p>
            Track every waste batch from collection
            to destination. Together for a cleaner planet.
          </p>

        </div>

        <div className="hero-illustration">
          ♻️ 🌳 🚛 🌱
        </div>

      </div>


      {/* Cards */}

      <div className="cards">

        <div className="card green-card">
          <div className="card-icon">📦</div>

          <h3>Total Waste Batches</h3>

          <h2>{totalBatches}</h2>

          <p>↗️ Track all batches</p>
        </div>


        <div className="card blue-card">
          <div className="card-icon">♻️</div>

          <h3>Plastic Waste</h3>

          <h2>{plasticWaste}</h2>

          <p>Plastic batches</p>
        </div>


        <div className="card purple-card">
          <div className="card-icon">🍃</div>

          <h3>Non-Plastic Waste</h3>

          <h2>{nonPlasticWaste}</h2>

          <p>Eco-friendly tracking</p>
        </div>


        <div className="card orange-card">
          <div className="card-icon">⚖️</div>

          <h3>Total Quantity</h3>

          <h2>{totalQuantity} kg</h2>

          <p>Total collected waste</p>
        </div>

      </div>


      {/* Search */}

      <div className="dashboard-actions">

        <div className="search-box">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search by QR Code / Waste Batch ID"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button>
            Search
          </button>

        </div>


        <Link
          to="/create-batch"
          className="create-batch-btn"
        >
          + Create Waste Batch
        </Link>

      </div>


      {/* Status Cards */}

      <div className="status-cards">

        <div className="small-status-card">
          <span>🚛</span>

          <div>
            <p>In Transit</p>
            <h3>{inTransit}</h3>
          </div>
        </div>


        <div className="small-status-card">
          <span>📦</span>

          <div>
            <p>Collected</p>
            <h3>{collected}</h3>
          </div>
        </div>


        <div className="small-status-card">
          <span>🏁</span>

          <div>
            <p>Received</p>
            <h3>{received}</h3>
          </div>
        </div>

      </div>


      {/* Batch Records */}

      <BatchList search={search} />

    </div>
  );
}

export default Dashboard;