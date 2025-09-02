import { useMemo, useState } from "react";
import { AddUserModal } from "../../components/AddUserModel";
import { UserDetailsModal } from "../../components/UserDetailsModel";

export 


const AdminUserManagement= ({ users, setUsers, initialStores }) => {
    const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
            user.address.toLowerCase().includes(filters.address.toLowerCase()) &&
            (filters.role === '' || user.role === filters.role)
        );
    }, [users, filters]);

    const handleAddUser = (user) => {
        setUsers(prev => [...prev, { ...user, id: Date.now() }]);
        setAddModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Users</h2>
                <button onClick={() => setAddModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add User</button>
            </div>
            {/* Filter Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <input type="text" placeholder="Filter by Name" className="p-2 border rounded" value={filters.name} onChange={e => setFilters({ ...filters, name: e.target.value })} />
                <input type="text" placeholder="Filter by Email" className="p-2 border rounded" value={filters.email} onChange={e => setFilters({ ...filters, email: e.target.value })} />
                <input type="text" placeholder="Filter by Address" className="p-2 border rounded" value={filters.address} onChange={e => setFilters({ ...filters, address: e.target.value })} />
                <select className="p-2 border rounded" value={filters.role} onChange={e => setFilters({ ...filters, role: e.target.value })}>
                    <option value="">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Normal">Normal</option>
                    <option value="Store Owner">Store Owner</option>
                </select>
            </div>
            {/* Users Table */}
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map(user => (
                            <tr key={user.id} onClick={() => setSelectedUser(user)} className="hover:bg-gray-50 cursor-pointer">
                                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{user.role}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isAddModalOpen && <AddUserModal onClose={() => setAddModalOpen(false)} onAddUser={handleAddUser} />}
            {selectedUser && <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} initialStores={initialStores}/>}
        </div>
    );
};
