export const UpdatePasswordModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Update Password</h3>
                <form className="space-y-4">
                    <input type="password" placeholder="Current Password" required className="w-full p-2 border rounded" />
                    <input type="password" placeholder="New Password" required className="w-full p-2 border rounded" />
                    <input type="password" placeholder="Confirm New Password" required className="w-full p-2 border rounded" />
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
