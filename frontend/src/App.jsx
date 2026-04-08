import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import RequestPanel from "./components/RequestPanel";

export default function App() {

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then(res => res.json())
      .then(data => setRequests(data));
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen w-full bg-[#0f0f11] md:overflow-hidden">

      <Sidebar
        requests={requests}
        setRequests={setRequests}
        setSelectedRequest={setSelectedRequest}
      />

      <RequestPanel
        requests={requests}
        setRequests={setRequests}
        selectedRequest={selectedRequest}
      />

    </div>
  );
}