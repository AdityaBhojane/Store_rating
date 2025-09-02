import { authService } from "../services/authService.js";



export const signupUserController = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;
    const user = await authService.createUserService({ name, email, address, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const data = await authService.loginUserService({ email, password });
    return res.json(data);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};


export const changePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Old and new passwords are required" });
    }
    const userId = req.user.id;

    const response = await authService.updatePasswordService({ userId, oldPassword, newPassword });
    return res.json(response);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

