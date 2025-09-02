import { getStoreRatings } from "../services/storeOwner.js";


export const getDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id; 
    const dashboard = await getStoreRatings(ownerId);
    res.json(dashboard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
