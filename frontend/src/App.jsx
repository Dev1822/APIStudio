import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import RequestPanel from "./components/RequestPanel";

export default function App() {

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [deviceId] = useState(() => {
    let id = localStorage.getItem("api_device_id");
    if (!id) {
      id = "device_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("api_device_id", id);
    }
    return id;
  });

  useEffect(() => {
    if (!deviceId) return;
    fetch(`${import.meta.env.VITE_API_URL}/?deviceId=${deviceId}`)
      .then(res => res.json())
      .then(data => setRequests(data));
  }, [deviceId]);

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
        deviceId={deviceId}
      />

    </div>
  );
}