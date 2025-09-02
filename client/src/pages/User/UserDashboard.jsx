import { useState, useMemo, useEffect } from 'react';
import { RateStoreModal } from '../../components/RateStoreModel';
import { UpdatePasswordModal } from '../../components/UpdatePasswordModel';
import { StoreCard } from '../../components/StoreCard';
import axios from 'axios';



export default function UserDashboard() {
    const [stores, setStore] = useState([]);
    const [userRatings, setUserRatings] = useState([]);
    const [filters, setFilters] = useState({ name: '', address: '' });
    const [selectedStore, setSelectedStore] = useState(null);
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

    useEffect(()=>{
      const fetchInitial = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get("http://localhost:5000/api/user/users", {
            headers: { token: `Bearer ${token}` },
          });
          setUserRatings(res.data.store.rating);
          setStore(res.data.store)
        } catch (err) {
          console.error("❌ Failed to fetch users:", err);
          throw err;
        }
      };
      fetchInitial()
  },[])

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
