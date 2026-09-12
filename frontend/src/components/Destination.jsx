import { useEffect, useState } from "react";

function Destination() {
  const [batches, setBatches] = useState([]);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    batchId: "",
    destination: "",
    receivedBy: "",
    receivedDate: "",
    receivedTime: "",
  });

  useEffect(() => {
    const savedBatches =
      JSON.parse(localStorage.getItem("wasteBatches")) || [];

    setBatches(savedBatches);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.batchId) {
      setMessage("Please select a waste batch.");
      return;
    }

    const updatedBatches = batches.map((batch) =>
      batch.id === formData.batchId
        ? {
            ...batch,
            destinationDetails: {
              destination: formData.destination,
              receivedBy: formData.receivedBy,
              receivedDate: formData.receivedDate,
              receivedTime: formData.receivedTime,
            },
            status: "Received",
          }
        : batch
    );

    localStorage.setItem(
      "wasteBatches",
      JSON.stringify(updatedBatches)
    );

    setBatches(updatedBatches);

    setMessage(
      "Waste successfully received at destination! 🏁"
    );
  };

  return (
    <div className="destination">
      <h1>Destination / Final Delivery</h1>

      <p>Update final waste delivery details.</p>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Waste Batch</label>

          <select
            name="batchId"
            value={formData.batchId}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Batch
            </option>

            {batches.map((batch) => (
              <option
                key={batch.id}
                value={batch.id}
              >
                {batch.id}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Destination</label>

          <input
            type="text"
            name="destination"
            placeholder="Example: Recycling Center"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Received By ID</label>

          <input
            type="text"
            name="receivedBy"
            placeholder="Example: R001"
            value={formData.receivedBy}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Received Date</label>

          <input
            type="date"
            name="receivedDate"
            value={formData.receivedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Received Time</label>

          <input
            type="time"
            name="receivedTime"
            value={formData.receivedTime}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          Mark as Received
        </button>
      </form>
    </div>
  );
}

export default Destination;