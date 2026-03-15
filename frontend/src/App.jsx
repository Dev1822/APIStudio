import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import RequestPanel from "./components/RequestPanel";

export default function App() {

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then(res => res.json())
      .then(data => setRequests(data));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">

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