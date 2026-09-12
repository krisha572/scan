import { useEffect, useState } from "react";

function VehicleChange() {
  const [batches, setBatches] = useState([]);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    batchId: "",
    previousVehicle: "",
    newVehicle: "",
    transferLocation: "",
    transferDate: "",
    transferTime: "",
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
            vehicleChange: {
              previousVehicle: formData.previousVehicle,
              newVehicle: formData.newVehicle,
              transferLocation: formData.transferLocation,
              transferDate: formData.transferDate,
              transferTime: formData.transferTime,
            },
          }
        : batch
    );

    localStorage.setItem(
      "wasteBatches",
      JSON.stringify(updatedBatches)
    );

    setBatches(updatedBatches);

    setMessage("Vehicle change details saved successfully! 🚛");
  };

  return (
    <div className="vehicle-change">
      <h1>Vehicle Change</h1>

      <p>Update vehicle transfer details for a waste batch.</p>

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
          >
            <option value="">Select Batch</option>

            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.id}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Previous Vehicle Number</label>

          <input
            type="text"
            name="previousVehicle"
            placeholder="Example: MH-12-AB-1234"
            value={formData.previousVehicle}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>New Vehicle Number</label>

          <input
            type="text"
            name="newVehicle"
            placeholder="Example: MH-14-CD-5678"
            value={formData.newVehicle}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Transfer Location</label>

          <input
            type="text"
            name="transferLocation"
            placeholder="Enter transfer location"
            value={formData.transferLocation}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Transfer Date</label>

          <input
            type="date"
            name="transferDate"
            value={formData.transferDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Transfer Time</label>

          <input
            type="time"
            name="transferTime"
            value={formData.transferTime}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Save Vehicle Change
        </button>
      </form>
    </div>
  );
}

export default VehicleChange;