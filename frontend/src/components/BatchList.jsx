import { useEffect, useState } from "react";

function BatchList({ search }) {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const savedBatches =
      JSON.parse(localStorage.getItem("wasteBatches")) || [];

    setBatches(savedBatches);
  }, []);

  const filteredBatches = batches.filter((batch) =>
    batch.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="batch-list">
      <h2>Waste Batch Records</h2>

      {filteredBatches.length > 0 ? (
        filteredBatches.map((batch) => (
          <div className="batch-card" key={batch.id}>
            <h3>{batch.id}</h3>

            <p>
              <strong>Waste Type:</strong> {batch.type}
            </p>

            <p>
              <strong>Quantity:</strong> {batch.quantity}
            </p>

            <p>
              <strong>Location:</strong> {batch.location}
            </p>

            <p>
              <strong>Ward:</strong> {batch.ward}
            </p>

            <p>
              <strong>Date:</strong> {batch.date}
            </p>

            <p>
              <strong>Collector ID:</strong> {batch.collectorId}
            </p>

            <p>
              <strong>Status:</strong> {batch.status}
            </p>
          </div>
        ))
      ) : (
        <p>No waste batch found.</p>
      )}
    </div>
  );
}

export default BatchList;