import { adminService } from "../services/adminService.js";


export const createUserByAdminController = async (req, res) => {
  try {
    const user = await adminService.addUserByAdminService(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createStoreByAdminController = async (req, res) => {
  try {
    const store = await adminService.addStoreByAdminService(req.body);
    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const dashboardForAdminController = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStatsService();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsersForAdminController = async (req, res) => {
  try {
    const users = await adminService.listUsersForAdminService(req.query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStoresForAdminController = async (req, res) => {
  try {
    const stores = await adminService.listStoresService(req.query);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserForAdminController = async (req, res) => {
  try {
    const user = await adminService.getUserDetailsForAdminService(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
