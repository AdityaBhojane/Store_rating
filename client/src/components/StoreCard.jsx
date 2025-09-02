import { StarIcon, StarsIcon } from "lucide-react";


export const StoreCard = ({ store, userRating, onRateClick }) => {
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div>
                <h3 className="font-bold text-lg">{store.name}</h3>
                <p className="text-gray-600 text-sm">{store.address}</p>
                <div className="flex items-center my-2">
                    <StarIcon filled className="text-yellow-400" />
                    <span className="ml-1 text-gray-700">{store.overallRating.toFixed(1)} Overall</span>
                </div>
                 <div className="flex items-center my-2 text-blue-600">
                    <StarsIcon filled className="text-blue-500" />
                    <span className="ml-1 ">{userRating ? `Your Rating: ${userRating.rating}` : 'Not rated yet'}</span>
                </div>
            </div>
            <button 
                onClick={() => onRateClick(store)}
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                {userRating ? 'Modify Your Rating' : 'Submit a Rating'}
            </button>
        </div>
    );
};