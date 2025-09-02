import { useState, useMemo } from 'react';
import { RateStoreModal } from '../../components/RateStoreModel';
import { UpdatePasswordModal } from '../../components/UpdatePasswordModel';
import { StoreCard } from '../../components/StoreCard';

const initialStores = [
    { id: 1, name: 'SuperMart', address: '123 Market St', overallRating: 4.5 },
    { id: 2, name: 'QuickGrocer', address: '456 Commerce Ave', overallRating: 4.2 },
    { id: 3, name: 'The Corner Store', address: '789 Retail Rd', overallRating: 4.8 },
    { id: 4, name: 'Fresh Finds', address: '101 Produce Plaza', overallRating: 4.0 },
    { id: 5, name: 'City Staples', address: '212 Downtown Dr', overallRating: 3.9 },
];

const initialUserRatings = [
    { storeId: 1, rating: 5 },
    { storeId: 3, rating: 4 },
];



export default function UserDashboard() {
    const [stores] = useState(initialStores);
    const [userRatings, setUserRatings] = useState(initialUserRatings);
    const [filters, setFilters] = useState({ name: '', address: '' });
    const [selectedStore, setSelectedStore] = useState(null);
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

    const filteredStores = useMemo(() => {
        return stores.filter(store =>
            store.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            store.address.toLowerCase().includes(filters.address.toLowerCase())
        );
    }, [stores, filters]);

    const handleRateClick = (store) => {
        setSelectedStore(store);
    };

    const handleSubmitRating = (storeId, newRating) => {
        setUserRatings(prevRatings => {
            const existingRatingIndex = prevRatings.findIndex(r => r.storeId === storeId);
            if (existingRatingIndex > -1) {
                const updatedRatings = [...prevRatings];
                updatedRatings[existingRatingIndex] = { ...updatedRatings[existingRatingIndex], rating: newRating };
                return updatedRatings;
            } else {
                return [...prevRatings, { storeId, rating: newRating }];
            }
        });
    };


    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white shadow-sm p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-blue-600">User Dashboard</h1>
                    <div className="flex items-center space-x-4">
                         <button onClick={() => setPasswordModalOpen(true)} className="text-sm text-gray-600 hover:text-blue-600">Update Password</button>
                         <button className="text-sm text-gray-600 hover:text-blue-600">Log Out</button>
                    </div>
                </div>
            </header>
            <main className="p-6 max-w-7xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Find a Store</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
                    <input 
                        type="text" 
                        placeholder="Search by Store Name..." 
                        className="p-2 border rounded-lg" 
                        value={filters.name} 
                        onChange={e => setFilters({...filters, name: e.target.value})} 
                    />
                    <input 
                        type="text" 
                        placeholder="Search by Address..." 
                        className="p-2 border rounded-lg" 
                        value={filters.address} 
                        onChange={e => setFilters({...filters, address: e.target.value})} 
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStores.map(store => {
                        const userRating = userRatings.find(r => r.storeId === store.id);
                        return (
                           <StoreCard 
                                key={store.id} 
                                store={store} 
                                userRating={userRating}
                                onRateClick={handleRateClick} 
                            />
                        );
                    })}
                </div>
            </main>
            {selectedStore && (
                <RateStoreModal 
                    store={selectedStore} 
                    userRating={userRatings.find(r => r.storeId === selectedStore.id)}
                    onClose={() => setSelectedStore(null)} 
                    onSubmitRating={handleSubmitRating}
                />
            )}
            {isPasswordModalOpen && <UpdatePasswordModal onClose={() => setPasswordModalOpen(false)} />}
        </div>
    );
}
