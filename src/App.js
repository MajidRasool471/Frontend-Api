import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"
        element={<Login />} />
         <Route path="/login"
        element={<Login />} />
        <Route path="/signup"
        element={<Signup/>} />
         <Route path="/dashboard"
         element={<Dashboard />} />
         <Route path="/profile"
         element={<Profile />} />
         <Route path="/forgot-password"
        element={<ForgotPassword />} />
           <Route path="/reset-password"
        element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}
 export default App;