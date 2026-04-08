export default function Sidebar({ requests, setRequests, setSelectedRequest }) {

  const methodColor = (method) => {
    switch (method) {
      case "GET":
        return "text-green-400";
      case "POST":
        return "text-yellow-400";
      case "PUT":
        return "text-blue-400";
      case "DELETE":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const deleteRequest = async (id, e) => {
    e.stopPropagation(); // prevent click selecting the request

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: "DELETE"
      });

      setRequests(prev => prev.filter(req => req._id !== id));

    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="w-full md:w-72 md:h-full bg-[#0f0f11] border-b md:border-b-0 md:border-r border-gray-800 flex flex-col shrink-0">

      <div className="p-4 md:p-5 border-b border-gray-800">
        <h1 className="text-xl font-semibold tracking-wide text-white">
          API Studio
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-64 md:max-h-none">

        {requests.length === 0 ? (
          <div className="border border-dashed border-gray-700 rounded-lg p-6 text-center text-gray-500 text-sm">
            No saved requests
          </div>
        ) : (
          requests.map((req) => (
            <div
              key={req._id}
              onClick={() => setSelectedRequest(req)}
              className="flex items-center justify-between gap-2 p-3 rounded-md hover:bg-gray-800 cursor-pointer transition"
            >

              <div className="flex items-center gap-2 overflow-hidden">

                <span className={`text-xs font-semibold ${methodColor(req.method)}`}>
                  {req.method}
                </span>

                <span className="text-sm text-gray-300 truncate">
                  {req.url}
                </span>

              </div>

              <button
                onClick={(e) => deleteRequest(req._id, e)}
                className="text-gray-500 hover:text-red-400 text-sm"
              >
                ✕
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}