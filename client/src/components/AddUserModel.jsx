import { useState } from "react";
import axios from "axios";

export const AddUserModal = ({ onClose, onAddUser }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/admin/create-user",
        {...newUser, userType:newUser.role},
        {
          headers: {
            token: `${token}`,
          },
        }
      );

      onAddUser(res.data); 
      onClose();
    } catch (err) {
      console.error("❌ Create user failed:", err);
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Add New User</h3>

        {error && (
          <p className="text-red-500 text-sm mb-2">⚠️ {error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full p-2 border rounded"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Address"
            required
            className="w-full p-2 border rounded"
            value={newUser.address}
            onChange={(e) =>
              setNewUser({ ...newUser, address: e.target.value })
            }
          />
          <select
            className="w-full p-2 border rounded"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">Admin</option>
            <option value="OWNER">Store Owner</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
