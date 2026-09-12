import { useEffect, useState } from "react";
import "./Tracking.css";

function Tracking() {
  const [batches, setBatches] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(null);

  useEffect(() => {
    const savedBatches =
      JSON.parse(localStorage.getItem("wasteBatches")) || [];

    setBatches(savedBatches);

    if (savedBatches.length > 0) {
      setSelectedId(savedBatches[0].id);
      setSelectedBatch(savedBatches[0]);
    }
  }, []);

  const handleBatchChange = (e) => {
    const batchId = e.target.value;

    setSelectedId(batchId);

    const batch = batches.find(
      (item) => item.id === batchId
    );

    setSelectedBatch(batch);
  };

  if (batches.length === 0) {
    return (
      <div className="tracking">
        <h1>Waste Journey Tracking</h1>
        <p>No waste batch available.</p>
      </div>
    );
  }

  return (
    <div className="tracking">
      <h1>Waste Journey Tracking</h1>

      <p>Track the complete movement of the waste batch.</p>

      {/* Batch Select */}
      <div className="batch-select">
        <label>Select Waste Batch:</label>

        <select
          value={selectedId}
          onChange={handleBatchChange}
        >
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.id}
            </option>
          ))}
        </select>
      </div>

      {selectedBatch && (
        <>
          <div className="batch-id">
            <strong>Waste Batch ID:</strong>{" "}
            {selectedBatch.id}
          </div>

          {/* 1. Collection */}
          <div className="tracking-stage">
            <h3>1. Collection ✅</h3>

            <p>
              <strong>Location:</strong>{" "}
              {selectedBatch.location}
            </p>

            <p>
              <strong>Ward:</strong>{" "}
              {selectedBatch.ward}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {selectedBatch.date}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {selectedBatch.time}
            </p>

            <p>
              <strong>Collector ID:</strong>{" "}
              {selectedBatch.collectorId}
            </p>
          </div>

          {/* 2. Transport */}
          <div className="tracking-stage">
            <h3>
              2. Transport{" "}
              {selectedBatch.status === "In Transit" ||
              selectedBatch.status === "Received"
                ? "🚛"
                : "⏳"}
            </h3>

            <p>
              <strong>Transport Status:</strong>{" "}
              {selectedBatch.status === "Collected"
                ? "Waiting for transport"
                : selectedBatch.status === "In Transit"
                ? "In Transit"
                : "Completed"}
            </p>

            <p>
              <strong>Start Location:</strong>{" "}
              {selectedBatch.location}
            </p>
          </div>

          {/* 3. Vehicle Change */}
          <div className="tracking-stage">
            <h3>
              3. Vehicle Change{" "}
              {selectedBatch.vehicleChange
                ? "🔄"
                : "⏳"}
            </h3>

            {selectedBatch.vehicleChange ? (
              <>
                <p>
                  <strong>Previous Vehicle:</strong>{" "}
                  {
                    selectedBatch.vehicleChange
                      .previousVehicle
                  }
                </p>

                <p>
                  <strong>New Vehicle:</strong>{" "}
                  {
                    selectedBatch.vehicleChange
                      .newVehicle
                  }
                </p>

                <p>
                  <strong>Transfer Location:</strong>{" "}
                  {
                    selectedBatch.vehicleChange
                      .transferLocation
                  }
                </p>

                <p>
                  <strong>Transfer Date:</strong>{" "}
                  {
                    selectedBatch.vehicleChange
                      .transferDate
                  }
                </p>

                <p>
                  <strong>Transfer Time:</strong>{" "}
                  {
                    selectedBatch.vehicleChange
                      .transferTime
                  }
                </p>
              </>
            ) : (
              <p>Vehicle change details not added yet.</p>
            )}
          </div>

          {/* 4. Destination */}
          <div className="tracking-stage">
            <h3>
              4. Destination{" "}
              {selectedBatch.destinationDetails
                ? "🏁"
                : "⏳"}
            </h3>

            {selectedBatch.destinationDetails ? (
              <>
                <p>
                  <strong>Destination:</strong>{" "}
                  {
                    selectedBatch.destinationDetails
                      .destination
                  }
                </p>

                <p>
                  <strong>Received By:</strong>{" "}
                  {
                    selectedBatch.destinationDetails
                      .receivedBy
                  }
                </p>

                <p>
                  <strong>Received Date:</strong>{" "}
                  {
                    selectedBatch.destinationDetails
                      .receivedDate
                  }
                </p>

                <p>
                  <strong>Received Time:</strong>{" "}
                  {
                    selectedBatch.destinationDetails
                      .receivedTime
                  }
                </p>

                <p>
                  <strong>Final Status:</strong>{" "}
                  Received ✅
                </p>
              </>
            ) : (
              <p>Destination details not added yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Tracking;