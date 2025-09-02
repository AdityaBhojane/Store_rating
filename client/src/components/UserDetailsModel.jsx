export const UserDetailsModal = ({ user, onClose, initialStores }) => {
    const store = initialStores.find(s => s.ownerId === user.id);
    return (
        <div className="fixed inset-0 bg-[#0a0a0a4b] flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">User Details</h3>
                <div className="space-y-2">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    {user.role === 'Store Owner' && store && (
                         <p><strong>Store Rating:</strong> {store.rating} / 5.0</p>
                    )}
                </div>
                 <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">Close</button>
                </div>
            </div>
        </div>
    )
};