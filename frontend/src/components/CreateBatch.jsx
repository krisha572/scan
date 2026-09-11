import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./CreateBatch.css";

function CreateBatch() {
  const [formData, setFormData] = useState({
    batchId: "",
    wasteType: "",
    quantity: "",
    location: "",
    ward: "",
    date: "",
    time: "",
    collectorId: "",
    remarks: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pehle se saved batches lena
    const oldBatches =
      JSON.parse(localStorage.getItem("wasteBatches")) || [];

    // New batch banana
    const newBatch = {
      id: formData.batchId,
      type: formData.wasteType,
      quantity: formData.quantity + " kg",
      location: formData.location,
      ward: formData.ward,
      date: formData.date,
      time: formData.time,
      collectorId: formData.collectorId,
      remarks: formData.remarks,
      status: "Collected",
    };

    // New batch ko list me add karna
    const updatedBatches = [...oldBatches, newBatch];

    // LocalStorage me save karna
    localStorage.setItem(
      "wasteBatches",
      JSON.stringify(updatedBatches)
    );

    console.log("Saved Batch:", newBatch);

    setMessage("Waste Batch created successfully! ✅");
  };

  return (
    <div className="create-batch">
      <h1>Create New Waste Batch</h1>

      <p>Enter waste collection details</p>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Waste Batch ID</label>

          <input
            type="text"
            name="batchId"
            placeholder="Example: WB-2026-00006"
            value={formData.batchId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Waste Type</label>

          <select
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Waste Type
            </option>

            <option value="Plastic">
              Plastic
            </option>

            <option value="Non-Plastic">
              Non-Plastic
            </option>

            <option value="Mixed">
              Mixed
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity (kg)</label>

          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Collection Location</label>

          <input
            type="text"
            name="location"
            placeholder="Enter collection location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ward</label>

          <input
            type="text"
            name="ward"
            placeholder="Enter ward"
            value={formData.ward}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Collection Date</label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Collection Time</label>

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Collector ID</label>

          <input
            type="text"
            name="collectorId"
            placeholder="Enter collector ID"
            value={formData.collectorId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Remarks</label>

          <textarea
            name="remarks"
            placeholder="Enter remarks"
            value={formData.remarks}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit">
          Create Waste Batch
        </button>

        {formData.batchId && (
          <div className="qr-code">
            <h3>Waste Batch QR Code</h3>

            <QRCodeCanvas
              value={formData.batchId}
              size={200}
            />

            <p>
              Batch ID: {formData.batchId}
            </p>
          </div>
        )}

      </form>
    </div>
  );
}

export default CreateBatch;