import { useState, useEffect } from "react";

export default function RequestPanel({ requests, setRequests, selectedRequest, deviceId }) {

  const [headers, setHeaders] = useState([]);
  const [activeTab, setActiveTab] = useState("headers");
  const [response, setResponse] = useState(null);

  useEffect(() => {

    if (selectedRequest) {

      setRequest({
        method: selectedRequest.method || "GET",
        url: selectedRequest.url || "",
        headers: selectedRequest.headers || [],
        body: selectedRequest.body || ""
      });

      setHeaders(selectedRequest.headers || []);

    }

  }, [selectedRequest]);

  const [request, setRequest] = useState({
    method: "GET",
    url: "",
    headers: [],
    body: ""
  });

  const addHeader = () => {
    setHeaders((prev) => [...prev, { key: "", value: "" }]);
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const convertHeaders = () => {
    const obj = {};
    headers.forEach((h) => {
      if (h.key) obj[h.key] = h.value;
    });
    return obj;
  };

  const sendRequest = async () => {
    try {

      const options = {
        method: request.method,
        headers: convertHeaders()
      };

      if (request.method !== "GET" && request.body) {
        options.body = request.body;
      }

      const res = await fetch(request.url, options);
      const data = await res.json();

      setResponse(data);

    } catch (err) {
      setResponse({ error: err.message });
    }
  };

  const addRequest = () => {

    if (!deviceId) return;

    fetch(`${import.meta.env.VITE_API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...request, headers, deviceId })
    })
      .then((res) => res.json())
      .then((data) => {
        setRequests((prev) => [data, ...prev]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex-1 p-4 md:p-8 bg-[#0f0f11] text-gray-200 overflow-y-auto">

      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl font-semibold tracking-wide">New Request</h2>

        <button
          onClick={addRequest}
          className="bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-md text-sm font-medium"
        >
          Save
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-6 md:mb-8">

        <div className="flex flex-1 gap-2">
          <select
            value={request.method}
            className="bg-[#1a1a1d] border border-gray-700 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 md:w-auto w-24 shrink-0"
            onChange={(e) =>
              setRequest((prev) => ({ ...prev, method: e.target.value }))
            }
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
          </select>

          <input
            value={request.url}
            className="flex-1 w-full bg-[#1a1a1d] border border-gray-700 px-4 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500 min-w-0"
            placeholder="https://api.example.com/users"
            onChange={(e) =>
              setRequest((prev) => ({ ...prev, url: e.target.value }))
            }
          />
        </div>

        <button
          onClick={sendRequest}
          className="bg-purple-600 hover:bg-purple-700 transition px-6 py-2 rounded-md font-medium shrink-0"
        >
          Send
        </button>

      </div>

      <div className="flex gap-8 border-b border-gray-800 mb-6 text-sm font-medium">

        <button
          onClick={() => setActiveTab("headers")}
          className={`pb-3 transition ${activeTab === "headers"
              ? "border-b-2 border-purple-500 text-white"
              : "text-gray-400 hover:text-gray-200"
            }`}
        >
          Headers
        </button>

        <button
          onClick={() => setActiveTab("body")}
          className={`pb-3 transition ${activeTab === "body"
              ? "border-b-2 border-purple-500 text-white"
              : "text-gray-400 hover:text-gray-200"
            }`}
        >
          Body
        </button>

      </div>

      {activeTab === "headers" && (
        <div className="space-y-3">

          <div className="grid grid-cols-2 text-gray-500 text-xs uppercase tracking-wide">
            <span>Key</span>
            <span>Value</span>
          </div>

          {headers.map((h, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">

              <input
                value={h.key}
                onChange={(e) => updateHeader(i, "key", e.target.value)}
                className="bg-[#1a1a1d] border border-gray-700 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Authorization"
              />

              <input
                value={h.value}
                onChange={(e) => updateHeader(i, "value", e.target.value)}
                className="bg-[#1a1a1d] border border-gray-700 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Bearer token"
              />

            </div>
          ))}

          <button
            onClick={addHeader}
            className="text-purple-400 text-sm hover:text-purple-300"
          >
            + Add Header
          </button>

        </div>
      )}

      {activeTab === "body" && (
        <textarea
          value={request.body}
          className="w-full h-44 bg-[#1a1a1d] border border-gray-700 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 font-mono"
          placeholder={`{
          "name": "John",
          "email": "john@email.com"
        }`}
          onChange={(e) =>
            setRequest((prev) => ({ ...prev, body: e.target.value }))
          }
        />
      )}

      <div className="mt-10 border-t border-gray-800 pt-6">

        <h3 className="text-gray-300 mb-4 font-medium">Response</h3>

        <div className="bg-[#151518] border border-gray-800 rounded-lg p-4 h-60 overflow-auto text-sm font-mono max-w-full">

          {response ? (
            <pre className="whitespace-pre-wrap wrap-break-words">
              {JSON.stringify(response, null, 2)}
            </pre>
          ) : (
            <span className="text-gray-500">
              Enter a URL and click Send to get a response
            </span>
          )}

        </div>

      </div>

    </div>
  );
}