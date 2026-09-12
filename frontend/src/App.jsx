 import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import CreateBatch from "./components/CreateBatch";
import QRScanner from "./components/QRScanner";
import Tracking from "./components/Tracking";

function AppContent() {
  const location = useLocation();

  // Create Batch page par Navbar hide rahega
  const hideNavbar = location.pathname === "/create-batch";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <main className={hideNavbar ? "full-page" : "main-content"}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-batch" element={<CreateBatch />} />
          <Route path="/qr-scanner" element={<QRScanner />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
