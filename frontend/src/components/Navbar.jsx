import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-md px-8 py-4 flex justify-between items-center"
    >
      <h1 className="text-xl font-bold text-primary">HealthM</h1>

      {user && (
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-primary">Assessment</Link>
          <Link to="/history" className="hover:text-primary">History</Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:opacity-90"
          >
            Logout
          </button>
        </div>
      )}
    </motion.nav>
  );
}
