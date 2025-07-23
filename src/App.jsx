import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import PrivateRoute from "./utils/PrivateRoute";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<SignUp />} />
      <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
      {/* <PrivateRoute path="/admin/dashboard" component={AdminDashboard} /> */}
      {/* <PrivateRoute path="/employee/dashboard" component={EmployeeDashboard} /> */}
      </Routes>
  
  );
}

export default App;
