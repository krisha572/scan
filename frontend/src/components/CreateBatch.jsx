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
    status: "Collected",
    remarks: "",
  });

  const [createdBatch, setCreatedBatch] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.batchId ||
      !formData.wasteType ||
      !formData.quantity ||
      !formData.location ||
      !formData.ward ||
      !formData.date ||
      !formData.time ||
      !formData.collectorId
    ) {
      setMessage("Please fill all required fields!");
      return;
    }

    const savedBatches =
      JSON.parse(localStorage.getItem("wasteBatches")) || [];

    const batchExists = savedBatches.some(
      (batch) => batch.id === formData.batchId
    );

    if (batchExists) {
      setMessage("This Waste Batch ID already exists!");
      return;
    }

    const newBatch = {
      id: formData.batchId,
      type: formData.wasteType,
      quantity: formData.quantity,
      location: formData.location,
      ward: formData.ward,
      date: formData.date,
      time: formData.time,
      collectorId: formData.collectorId,
      status: formData.status,
      remarks: formData.remarks,
    };

    const updatedBatches = [
      ...savedBatches,
      newBatch,
    ];

    localStorage.setItem(
      "wasteBatches",
      JSON.stringify(updatedBatches)
    );

    setCreatedBatch(newBatch);

    setMessage(
      "Waste Batch created successfully! 🎉"
    );

    setFormData({
      batchId: "",
      wasteType: "",
      quantity: "",
      location: "",
      ward: "",
      date: "",
      time: "",
      collectorId: "",
      status: "Collected",
      remarks: "",
    });
  };

  return (
    <div className="create-batch-page">

      <div className="create-batch-header">
        <div>
          <p className="page-tag">
            WASTE MANAGEMENT
          </p>

          <h1>Create Waste Batch</h1>

          <p>
            Enter waste collection details and generate
            a QR code to track its complete journey.
          </p>
        </div>
      </div>

      <div className="create-batch-container">

        {/* LEFT SIDE FORM */}

        <div className="form-section">

          <div className="form-heading">
            <h2>Waste Collection Details</h2>

            <p>
              Fill in the information below to create
              a new waste batch.
            </p>
          </div>

          {message && (
            <div
              className={
                message.includes("successfully")
                  ? "success-message"
                  : "error-message"
              }
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Batch ID */}

            <div className="form-group full-width">
              <label>Waste Batch ID *</label>

              <input
                type="text"
                name="batchId"
                placeholder="Example: WB-2026-00001"
                value={formData.batchId}
                onChange={handleChange}
              />
            </div>

            {/* Waste Type + Quantity */}

            <div className="form-row">

              <div className="form-group">
                <label>Waste Type *</label>

                <select
                  name="wasteType"
                  value={formData.wasteType}
                  onChange={handleChange}
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
                />
              </div>

            </div>

            {/* Location */}

            <div className="form-group full-width">
              <label>Collection Location *</label>

              <input
                type="text"
                name="location"
                placeholder="Enter collection location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Ward */}

            <div className="form-group full-width">
              <label>Ward Number *</label>

              <input
                type="text"
                name="ward"
                placeholder="Enter ward number"
                value={formData.ward}
                onChange={handleChange}
              />
            </div>

            {/* Date + Time */}

            <div className="form-row">

              <div className="form-group">
                <label>Collection Date *</label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Collection Time *</label>

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>

            </div>

            {/* Collector + Status */}

            <div className="form-row">

              <div className="form-group">
                <label>Collector ID *</label>

                <input
                  type="text"
                  name="collectorId"
                  placeholder="Example: C001"
                  value={formData.collectorId}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Initial Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Collected">
                    Collected
                  </option>

                  <option value="In Transit">
                    In Transit
                  </option>

                  <option value="Received">
                    Received
                  </option>
                </select>
              </div>

            </div>

            {/* Remarks */}

            <div className="form-group full-width">
              <label>
                Remarks
                <span> Optional</span>
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


        {/* RIGHT SIDE QR SECTION */}

        <div className="qr-section">

          <div className="qr-icon">
            📱
          </div>

          <h2>QR Tracking</h2>

          <p className="qr-description">
            After creating a waste batch, a QR code
            will help track its complete journey.
          </p>

          <div className="qr-preview">

            {createdBatch ? (
              <>
                <div className="generated-qr">
                  <QRCodeCanvas
                    value={createdBatch.id}
                    size={190}
                  />
                </div>

                <h3>
                  {createdBatch.id}
                </h3>

                <p>
                  Scan this QR code to track the
                  waste batch.
                </p>
              </>
            ) : (
              <>
                <div className="qr-placeholder">
                  ▦
                </div>

                <h3>
                  QR Code Preview
                </h3>

                <p>
                  Create a batch to generate its
                  QR code.
                </p>
              </>
            )}

          </div>

          <div className="qr-info">
            <span>✓</span>

            <p>
              Each waste batch receives a unique
              QR identity for tracking.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default CreateBatch;