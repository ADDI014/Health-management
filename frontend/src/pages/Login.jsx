import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){

    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", {email, password});
            login(res.data.user, res.data.token);
            toast.success("Login successfull");
            navigate("/");
        }
        catch(error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    }
    
    
    return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <form onSubmit={submit} className="card w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input className="input mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="input mb-4" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="btn-primary w-full">Login</button>
        <p className="text-sm text-center my-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-medium">
            Signup
          </Link>
        </p>
      </form>
    </motion.div>
  );
}