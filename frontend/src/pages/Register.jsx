
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name : "",
        email : "",
        password : ""
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value});
    };

    const submit = async (e) => {
        e.preventDefault();

        if(!form || !form.email || !form.password) {
            toast.error("All fields are required");
            return;
        }

        try {
            await api.post("/auth/register", form);
            toast.success("Registration successfull");
            navigate("/login");
        }
        catch(err) {
            toast.error(err.response?.data?.message || "Regisration failed");
        }
    };

    return (
        <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <form onSubmit={submit} className="card w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          name="name"
          placeholder="Name"
          className="input mb-3"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="input mb-3"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input mb-4"
          onChange={handleChange}
        />

        <button className="btn-primary w-full mb-3">Register</button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </form>
    </motion.div>
    )
}