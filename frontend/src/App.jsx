import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import HealthForm from "./pages/HealthForm"
import Dashboard from "./pages/DashBoard"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>

      <Route path="/" element={<ProtectedRoute><HealthForm/></ProtectedRoute> }/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
       <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
