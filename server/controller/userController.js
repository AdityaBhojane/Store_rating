import { userService } from "../services/userService.js";

export const listStores = async (req, res) => {
  try {
    const userId = req.user.id;
    const stores = await userService.getStoresService(userId, req.query);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const submitRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;

    const newRating = await userService.addRatingService({ userId, storeId, rating });
    res.status(201).json(newRating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const modifyRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;

    const updated = await userService.updateRatingService({ userId, storeId, rating });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
