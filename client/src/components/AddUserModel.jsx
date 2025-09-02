import { useState } from "react";

export const AddUserModal = ({ onClose, onAddUser }) => {
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', role: 'Normal' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddUser(newUser);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Add New User</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Name" required className="w-full p-2 border rounded" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
                    <input type="email" placeholder="Email" required className="w-full p-2 border rounded" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
                    <input type="password" placeholder="Password" required className="w-full p-2 border rounded" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} />
                    <input type="text" placeholder="Address" required className="w-full p-2 border rounded" value={newUser.address} onChange={e => setNewUser({...newUser, address: e.target.value})} />
                     <select className="w-full p-2 border rounded" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                        <option value="Normal">Normal</option>
                        <option value="Admin">Admin</option>
                        <option value="Store Owner">Store Owner</option>
                    </select>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
