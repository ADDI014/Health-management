import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import HealthForm from "./pages/HealthForm"
import Dashboard from "./pages/DashBoard"
import Navbar from "./components/Navbar"
import Register from "./pages/Register"
import HealthHistory from "./pages/HealthHistory"

function App() {

  return (
    <>
     <Navbar/>
    <Routes>

      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<ProtectedRoute><HealthForm/></ProtectedRoute> }/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
      <Route path="/history" element={<ProtectedRoute><HealthHistory /></ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App
