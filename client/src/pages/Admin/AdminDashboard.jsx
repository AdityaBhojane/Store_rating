import { useState } from 'react';
import { StatsCard } from '../../components/StatsCard';
import { StoreManagement } from './StoreManagement';
import { AdminUserManagement } from './AdminUserManagement';
import { Star, Store, Users } from 'lucide-react';

const initialUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', address: '123 Maple St', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', address: '456 Oak Ave', role: 'Normal' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', address: '789 Pine Ln', role: 'Store Owner' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', address: '101 Birch Rd', role: 'Normal' },
];

const initialStores = [
    { id: 1, name: 'SuperMart', email: 'contact@supermart.com', address: '123 Market St', rating: 4.5, ownerId: 3 },
    { id: 2, name: 'QuickGrocer', email: 'hello@quickgrocer.com', address: '456 Commerce Ave', rating: 4.2, ownerId: null },
    { id: 3, name: 'The Corner Store', email: 'info@cornerstore.com', address: '789 Retail Rd', rating: 4.8, ownerId: null },
];


export default function AdminDashboard() {
    const [currentView, setCurrentView] = useState('users'); 
    const [users, setUsers] = useState(initialUsers);
    const [stores] = useState(initialStores);
    
    const NavButton = ({ view, label }) => {
        const isActive = currentView === view;
        return (
            <button 
                onClick={() => setCurrentView(view)} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            >
                {label}
            </button>
        )
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <header className="bg-white shadow-sm p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
                    <nav className="flex items-center space-x-2">
                        <NavButton view="users" label="Manage Users" />
                        <NavButton view="stores" label="Manage Stores" />
                    </nav>
                     <button className="text-sm text-gray-600 hover:text-blue-600">Log Out</button>
                </div>
            </header>
            
            <main className="p-6 max-w-7xl mx-auto">
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatsCard title="Total Users" value={users.length} icon={<Users />} />
                    <StatsCard title="Total Stores" value={stores.length} icon={<Store />} />
                    <StatsCard title="Submitted Ratings" value={stores.length} icon={<Star />} />
                </section>

                {currentView === 'users' ? (
                    <AdminUserManagement users={users} setUsers={setUsers} initialStores={initialStores} />
                ) : (
                    <StoreManagement stores={stores} />
                )}
            </main>
        </div>
    );
}

