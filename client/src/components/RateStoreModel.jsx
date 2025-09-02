import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

export const RateStoreModal = ({
  store,
  userRating,
  onClose,
  onSubmitRating,
}) => {
  const [rating, setRating] = useState(
    new Array(userRating?.rating || 0).fill("")
  );
  const [NewRating, setNewRating] = useState(userRating?.rating || 0);
  const [totalRating, setTotalRating] = useState(new Array(5).fill(""));

  useEffect(() => {
    if (rating) {
      const total = 5 - rating.length;
      setTotalRating(new Array(total).fill(""));
    }
  }, [rating]);

  const addRating = async ({ userId, storeId, rating }) => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("role");

    const res = await axios.post(
      `${API_URL}/rate`,
      { userId, storeId, rating, userType },
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    return res.data;
  };

  const updateRating = async ({ userId, storeId, rating }) => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("role");

    const res = await axios.put(
      `${API_URL}/update-rate`,
      { userId, storeId, rating, userType },
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    return res.data;
  };

  const handleSubmit = async () => {
    if (NewRating > 0) {
      try {
        if (userRating) {
          await updateRating({
            userId: localStorage.getItem("userId"),
            storeId: store.id,
            rating: NewRating,
          });
        } else {
          await addRating({
            userId: localStorage.getItem("userId"),
            storeId: store.id,
            rating: NewRating,
          });
        }

        onSubmitRating(store.id, NewRating); 
        onClose();
      } catch (err) {
        console.error("❌ Rating error:", err);
        alert(err.response?.data?.error || "Something went wrong");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h3 className="text-xl font-bold mb-2">Rate {store.name}</h3>
        <p className="text-gray-600 mb-4">Select a rating from 1 to 5.</p>
        <div className="flex justify-center mb-6">
          {rating.map((e, i) => (
            <button
              key={i}
              onClick={() => {
                setNewRating(i + 1);
                setRating(new Array(i + 1).fill(""));
              }}
            >
              <StarIcon
                fill={"#ecdd00"}
                className="text-yellow-400 cursor-pointer"
              />
            </button>
          ))}
          {totalRating.map((star, Index) => (
            <button
              key={Index}
              onClick={() => {
                setNewRating(rating.length + Index + 1);
                setRating(new Array(rating.length + Index + 1).fill(""));
              }}
            >
              <StarIcon className="text-yellow-400 cursor-pointer" />
            </button>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            disabled={rating === 0}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
