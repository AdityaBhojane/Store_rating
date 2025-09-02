import { useMemo, useState } from "react";

export const StoreManagement = ({ stores }) => {
    const [filters, setFilters] = useState({ name: '', email: '', address: '' });

    const filteredStores = useMemo(() => {
        return stores.filter(store =>
            store.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            store.email.toLowerCase().includes(filters.email.toLowerCase()) &&
            store.address.toLowerCase().includes(filters.address.toLowerCase())
        );
    }, [stores, filters]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Stores</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <input type="text" placeholder="Filter by Name" className="p-2 border rounded" value={filters.name} onChange={e => setFilters({ ...filters, name: e.target.value })} />
                <input type="text" placeholder="Filter by Email" className="p-2 border rounded" value={filters.email} onChange={e => setFilters({ ...filters, email: e.target.value })} />
                <input type="text" placeholder="Filter by Address" className="p-2 border rounded" value={filters.address} onChange={e => setFilters({ ...filters, address: e.target.value })} />
            </div>
            {/* Stores Table */}
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredStores.map(store => (
                            <tr key={store.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{store.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{store.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{store.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{store.rating} / 5.0</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
