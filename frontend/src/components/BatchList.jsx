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
    status: "Collected",
  });

  const [createdBatch, setCreatedBatch] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBatch = {
      id: formData.batchId,
      type: formData.wasteType,
      quantity: formData.quantity,
      location: formData.location,
      ward: formData.ward,
      date: formData.date,
      time: formData.time,
      collectorId: formData.collectorId,
      remarks: formData.remarks,
      status: "Collected",
    };

    const savedBatches =
      JSON.parse(localStorage.getItem("wasteBatches")) || [];

    localStorage.setItem(
      "wasteBatches",
      JSON.stringify([...savedBatches, newBatch])
    );

    setCreatedBatch(newBatch);
    setMessage("Waste Batch Created Successfully! ✅");

    setFormData({
      batchId: "",
      wasteType: "",
      quantity: "",
      location: "",
      ward: "",
      date: "",
      time: "",
      collectorId: "",
      remarks: "",
      status: "Collected",
    });
  };

  return (
    <div className="create-batch-page">

      <div className="create-header">
        <span>WASTE MANAGEMENT</span>

        <h1>Create Waste Batch</h1>

        <p>
          Enter waste collection details and generate a QR code
          to track its complete journey.
        </p>
      </div>

      <div className="create-batch-container">

        {/* LEFT FORM */}

        <div className="batch-form">

          <h2>Waste Collection Details</h2>

          <p className="form-subtitle">
            Fill in the information below to create a new waste batch.
          </p>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Waste Batch ID *</label>

              <input
                type="text"
                name="batchId"
                placeholder="Example: WB-2026-00001"
                value={formData.batchId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Waste Type *</label>

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
                <label>Quantity (kg) *</label>

                <input
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Collection Location *</label>

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
              <label>Ward Number *</label>

              <input
                type="text"
                name="ward"
                placeholder="Enter ward number"
                value={formData.ward}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Collection Date *</label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Collection Time *</label>

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Collector ID *</label>

                <input
                  type="text"
                  name="collectorId"
                  placeholder="Example: C001"
                  value={formData.collectorId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Initial Status</label>

                <input
                  type="text"
                  value="Collected"
                  disabled
                />
              </div>

            </div>

            <div className="form-group">
              <label>
                Remarks <small>(Optional)</small>
              </label>

              <textarea
                name="remarks"
                placeholder="Enter additional notes..."
                value={formData.remarks}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="create-btn"
            >
              + Create Waste Batch
            </button>

          </form>

        </div>

        {/* RIGHT QR SECTION */}

        <div className="qr-section">

          <div className="qr-icon">
            📱
          </div>

          <h2>QR Tracking</h2>

          <p>
            After creating a waste batch, a QR code will
            help track its complete journey.
          </p>

          <div className="qr-preview">

            {createdBatch ? (
              <>
                <QRCodeCanvas
                  value={createdBatch.id}
                  size={160}
                />

                <h3>QR Code Ready</h3>

                <p>
                  Scan this QR code to track the batch.
                </p>
              </>
            ) : (
              <>
                <div className="qr-placeholder">
                  ▦
                </div>

                <h3>QR Code Preview</h3>

                <p>
                  Create a batch to generate its QR code.
                </p>
              </>
            )}

          </div>

          <div className="qr-info">
            ✓ Each waste batch receives a unique QR ID for easy tracking.
          </div>

        </div>

      </div>

    </div>
  );
}

export default CreateBatch;