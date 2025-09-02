import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserDashboard from "./pages/User/UserDashboard";
import StoreOwnerDashboard from "./pages/StoreOnwer/StoreOnwer";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/store-owner" element={<StoreOwnerDashboard />} />
        <Route
          path="*"
          element={
            <h2 className="w-full h-screen flex justify-center items-center text-3xl">
              404 - Page Not Found
            </h2>
          }
        />
      </Routes>
    </Router>
  );
}
