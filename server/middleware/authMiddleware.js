import jwt from "jsonwebtoken";
import 'dotenv/config'

const separateJWT = {
  USER:process.env.JWT_SECRET_USER,
  ADMIN:process.env.JWT_SECRET_ADMIN,
  OWNER:process.env.JWT_SECRET_OWNER
}

export const authMiddleware = (req, res, next) => {
  const token = req.headers["token"];
  const { userType } = req.body;
  console.log(token, userType)
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, separateJWT[`${userType}`]);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token", msg:err });
  }
};
