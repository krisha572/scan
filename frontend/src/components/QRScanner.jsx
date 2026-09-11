import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

function QRScanner() {
  const scannerRef = useRef(null);

  const [result, setResult] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        setError("");

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: 250,
          },
          (decodedText) => {
            const cleanResult = decodedText.trim();

            console.log("QR Result:", cleanResult);

            setResult(cleanResult);

            // LocalStorage se fresh data lena
            const savedBatches =
              JSON.parse(
                localStorage.getItem("wasteBatches")
              ) || [];

            // Scanned Batch ID se batch find karna
            const foundBatch = savedBatches.find(
              (batch) =>
                batch.id.trim() === cleanResult
            );

            console.log("Found Batch:", foundBatch);

            setSelectedBatch(foundBatch || null);

            scanner
              .stop()
              .catch((err) =>
                console.log("Stop error:", err)
              );
          },
          () => {
            // QR not detected yet
          }
        );
      } catch (err) {
        console.error("Camera error:", err);

        setError(
          "Camera start nahi ho raha. Browser me camera permission Allow karein."
        );
      }
    };

    startScanner();

    return () => {
      if (scanner.isScanning) {
        scanner.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="qr-scanner">
      <h1>QR Scanner</h1>

      <p>
        Scan the QR code attached to the waste batch.
      </p>

      <div id="qr-reader"></div>

      {error && <p>{error}</p>}

      {result && (
        <div className="scan-result">

          <h3>
            QR Scanned Successfully ✅
          </h3>

          <p>Waste Batch ID:</p>

          <strong>{result}</strong>

          {selectedBatch ? (
            <div className="batch-details">

              <h3>Waste Batch Details</h3>

              <p>
                <strong>Waste Type:</strong>{" "}
                {selectedBatch.type}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {selectedBatch.quantity}
              </p>

              <p>
                <strong>Collection Location:</strong>{" "}
                {selectedBatch.location}
              </p>

              <p>
                <strong>Ward:</strong>{" "}
                {selectedBatch.ward}
              </p>

              <p>
                <strong>Collection Date:</strong>{" "}
                {selectedBatch.date}
              </p>

              <p>
                <strong>Collection Time:</strong>{" "}
                {selectedBatch.time}
              </p>

              <p>
                <strong>Collector ID:</strong>{" "}
                {selectedBatch.collectorId}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedBatch.status}
              </p>

              <p>
                <strong>Remarks:</strong>{" "}
                {selectedBatch.remarks ||
                  "No remarks"}
              </p>

            </div>
          ) : (
            <div>
              <p>Batch details not found.</p>

              <p>
                Please make sure this Batch ID was
                created on this browser:
              </p>

              <strong>{result}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QRScanner;