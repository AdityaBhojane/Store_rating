import { useEffect, useState } from "react";
import { UpdatePasswordModal } from "../../components/UpdatePasswordModel";
import { StatsCard } from "../../components/StatsCard";
import { StarIcon } from "lucide-react";
import axios from "axios";

export default function StoreOwnerDashboard() {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState([]);
  
  useEffect(()=>{
      const fetchInitial = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get("http://localhost:5000/api/user/users", {
            headers: { token: `Bearer ${token}` },
          });
          setCurrentStore(res.data.store)
        } catch (err) {
          console.error("❌ Failed to fetch users:", err);
          throw err;
        }
      };
      fetchInitial()
  },[])

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">
            {currentStore.name} - Owner Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPasswordModalOpen(true)}
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Update Password
            </button>
            <button className="text-sm text-gray-600 hover:text-blue-600">
              Log Out
            </button>
          </div>
        </div>
      </header>
      <main className="p-6 max-w-7xl mx-auto">
        <section className="mb-6">
          <StatsCard
            title="Average Store Rating"
            value={currentStore.averageRating}
            icon={<StarIcon className="text-blue-600" />}
          />
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">User Ratings</h2>
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating Given
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentStore.length > 0 ? (
                  currentStore.map((user) => (
                    <tr key={user.email}>
                      {" "}
                      {/* Using a more unique key like email */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.rating} / 5
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      No ratings have been submitted for this store yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      {isPasswordModalOpen && (
        <UpdatePasswordModal onClose={() => setPasswordModalOpen(false)} />
      )}
    </div>
  );
}
