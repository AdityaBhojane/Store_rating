import { useEffect, useState } from "react";
import { StatsCard } from "../../components/StatsCard";
import { StoreManagement } from "./StoreManagement";
import { AdminUserManagement } from "./AdminUserManagement";
import { Star, Store, Users } from "lucide-react";
import axios from "axios";

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState("users");
  const [users, setUsers] = useState([]);
  const [stores, setStore] = useState([]);

  const NavButton = ({ view, label }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => setCurrentView(view)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? "bg-blue-500 text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        {label}
      </button>
    );
  };

  const fetchInitial = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/user/users", {
        headers: { token: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
      throw err;
    }
  };

  useEffect(()=>{
    const response = fetchInitial();
    setUsers(response.user)
    setStore(response.store)
  },[])

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
          <nav className="flex items-center space-x-2">
            <NavButton view="users" label="Manage Users" />
            <NavButton view="stores" label="Manage Stores" />
          </nav>
          <button className="text-sm text-gray-600 hover:text-blue-600">
            Log Out
          </button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard
            title="Total Users"
            value={users.length}
            icon={<Users />}
          />
          <StatsCard
            title="Total Stores"
            value={stores.length}
            icon={<Store />}
          />
          <StatsCard
            title="Submitted Ratings"
            value={stores.length}
            icon={<Star />}
          />
        </section>

        {currentView === "users" ? (
          <AdminUserManagement
            users={users}
            setUsers={setUsers}
            initialStores={stores}
          />
        ) : (
          <StoreManagement stores={stores} />
        )}
      </main>
    </div>
  );
}
