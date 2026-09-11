import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BatchList from "./BatchList";

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
    (batch) => batch.type === "Non-Plastic"
  ).length;

  const totalQuantity = batches.reduce(
    (total, batch) =>
      total + Number.parseFloat(batch.quantity) || 0,
    0
  );

  const inTransit = batches.filter(
    (batch) => batch.status === "In Transit"
  ).length;

  const received = batches.filter(
    (batch) => batch.status === "Received"
  ).length;

  const pending = batches.filter(
    (batch) => batch.status === "Pending"
  ).length;

  return (
    <div className="dashboard">
      <h1>Waste Journey Tracking</h1>

      <p className="subtitle">
        QR-Based Waste Tracking Dashboard
      </p>

      <Link
        to="/create-batch"
        className="create-batch-btn"
      >
        + Create Waste Batch
      </Link>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by QR Code / Waste Batch ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>Search</button>
      </div>

      <div className="cards">

        <div className="card">
          <h3>Total Waste Batches</h3>
          <h2>{totalBatches}</h2>
        </div>

        <div className="card">
          <h3>Plastic Waste</h3>
          <h2>{plasticWaste}</h2>
        </div>

        <div className="card">
          <h3>Non-Plastic Waste</h3>
          <h2>{nonPlasticWaste}</h2>
        </div>

        <div className="card">
          <h3>Total Quantity</h3>
          <h2>{totalQuantity} kg</h2>
        </div>

        <div className="card">
          <h3>In Transit</h3>
          <h2>{inTransit}</h2>
        </div>

        <div className="card">
          <h3>Received</h3>
          <h2>{received}</h2>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <h2>{pending}</h2>
        </div>

      </div>

      <BatchList search={search} />
    </div>
  );
}

export default Dashboard;