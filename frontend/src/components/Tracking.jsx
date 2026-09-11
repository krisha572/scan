import "./Tracking.css";

function Tracking() {
  const batchId = "WB-2026-00001";

  return (
    <div className="tracking">
      <h1>Waste Journey Tracking</h1>

      <div className="batch-id">
        <strong>Waste Batch ID:</strong> {batchId}
      </div>

      <p>Track the movement of the waste batch.</p>

      <div className="tracking-stage">
        <h3>1. Collection</h3>

        <p>
          <strong>Location:</strong> Main Market
        </p>

        <p>
          <strong>Ward:</strong> 5
        </p>

        <p>
          <strong>Date:</strong> 14 August 2026
        </p>

        <p>
          <strong>Time:</strong> 10:30 AM
        </p>

        <p>
          <strong>Collector ID:</strong> C001
        </p>
      </div>

      <div className="tracking-stage">
        <h3>2. Transport</h3>

        <p>
          <strong>Vehicle Number:</strong> MH-12-AB-1234
        </p>

        <p>
          <strong>Driver ID:</strong> D001
        </p>

        <p>
          <strong>Transport Status:</strong> In Transit
        </p>

        <p>
          <strong>Start Location:</strong> Main Market
        </p>

        <p>
          <strong>Destination:</strong> Recycling Center
        </p>
      </div>

        <div className="tracking-stage">
  <h3>3. Vehicle Change</h3>

  <p>
    <strong>Previous Vehicle:</strong> MH-12-AB-1234
  </p>

  <p>
    <strong>New Vehicle:</strong> MH-14-CD-5678
  </p>

  <p>
    <strong>Transfer Location:</strong> Transfer Point 1
  </p>

  <p>
    <strong>Transfer Date:</strong> 14 August 2026
  </p>

  <p>
    <strong>Transfer Time:</strong> 12:30 PM
  </p>
</div>

    <div className="tracking-stage">
  <h3>4. Destination</h3>

  <p>
    <strong>Destination:</strong> Recycling Center
  </p>

  <p>
    <strong>Received By:</strong> R001
  </p>

  <p>
    <strong>Received Date:</strong> 14 August 2026
  </p>

  <p>
    <strong>Received Time:</strong> 02:00 PM
  </p>

  <p>
    <strong>Final Status:</strong> Received
  </p>
</div>
    </div>
  );
}

export default Tracking;