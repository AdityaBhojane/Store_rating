import prisma from "../configs/dbConfig.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";

const separateJWT = {
  USER: process.env.JWT_SECRET_USER,
  ADMIN: process.env.JWT_SECRET_ADMIN,
  OWNER: process.env.JWT_SECRET_OWNER,
};

export const authService = {
  createUserService: async ({ name, email, address, password }) => {
    const hashedPassword = await argon2.hash(password);
    return prisma.user.create({
      data: { name, email, address, password: hashedPassword, role: "USER" },
    });
  },

  loginUserService: async ({ email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      separateJWT[`${user.role}`],
      { expiresIn: "1d" }
    );
    return { token, username: user.name, role: user.role };
  },
  updatePasswordService: async ({ userId, oldPassword, newPassword }) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await argon2.verify(user.password, oldPassword);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }
    const hashed = await argon2.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return { message: "Password updated successfully" };
  },
};
