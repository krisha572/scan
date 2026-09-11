import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tracking from "./components/Tracking";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import CreateBatch from "./components/CreateBatch";
import QRScanner from "./components/QRScanner";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-batch" element={<CreateBatch />} />
        <Route path="/qr-scanner" element={<QRScanner />} />
        <Route path="/tracking" element={<Tracking />}/>      
      </Routes>
    </BrowserRouter>
  );
}

export default App;