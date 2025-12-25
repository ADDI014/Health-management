import { useEffect, useState } from "react";
import api from "../services/api";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/health/history").then(res => setData(res.data));
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Health History</h2>
      {data.map((item) => (
        <div key={item._id} className="card mb-4">
          <p>Score: {item.result.score}</p>
          <p>Status: {item.result.status}</p>
        </div>
      ))}
    </div>
  );
}
