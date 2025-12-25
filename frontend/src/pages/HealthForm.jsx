
import {motion} from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import api from "../services/api";

export default function HealthForm() {
    const [sleep, setSleep] = useState(3);
    const [stress, setStress] = useState("Medium");
    const [activity, setActivity] = useState("Active");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        const res = await api.post("/health/submit", {sleep, stress, activity});
        navigate("/dashboard", {state : res.data});
    }

    return (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={submit} className="card w-96">
        <h2 className="text-xl font-bold mb-4">Health Assessment</h2>

        <label>Sleep Quality (1–5)</label>
        <input type="number" min="1" max="5" className="input mb-3" onChange={e => setSleep(e.target.value)} />

        <label>Stress Level</label>
        <select className="input mb-3" onChange={e => setStress(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label>Activity</label>
        <select className="input mb-4" onChange={e => setActivity(e.target.value)}>
          <option>Active</option>
          <option>Sedentary</option>
        </select>

        <button className="btn-primary w-full">Submit</button>
      </form>
    </motion.div>
    )
}