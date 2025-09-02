import prisma from "../configs/dbConfig.js";
import argon2 from "argon2";

export const adminService = {
  addUserByAdminService: async ({
    name,
    email,
    address,
    password,
    role,
  }) => {
    const hashedPassword = await argon2.hash(password);
    return prisma.user.create({
      data: { name, email, address, password: hashedPassword, role },
    });
  },
  addStoreByAdminService: async ({ name, email, address, ownerId }) => {
    return prisma.store.create({
      data: { name, email, address, ownerId },
    });
  },
  getDashboardStatsService: async ({ name, email, address, role }) => {
    return prisma.user.findMany({
      where: {
        name: name ? { contains: name, mode: "insensitive" } : undefined,
        email: email ? { contains: email, mode: "insensitive" } : undefined,
        address: address
          ? { contains: address, mode: "insensitive" }
          : undefined,
        role: role || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
      },
    });
  },
  listUsersForAdminService: async ({ name, email, address, role }) => {
    return prisma.user.findMany({
      where: {
        name: name ? { contains: name, mode: "insensitive" } : undefined,
        email: email ? { contains: email, mode: "insensitive" } : undefined,
        address: address
          ? { contains: address, mode: "insensitive" }
          : undefined,
        role: role || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
      },
    });
  },
  listStoresService: async ({ name, email, address }) => {
    const stores = await prisma.store.findMany({
      where: {
        name: name ? { contains: name, mode: "insensitive" } : undefined,
        email: email ? { contains: email, mode: "insensitive" } : undefined,
        address: address
          ? { contains: address, mode: "insensitive" }
          : undefined,
      },
      include: { ratings: true },
    });

    return stores.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      address: s.address,
      avgRating: s.ratings.length
        ? s.ratings.reduce((sum, r) => sum + r.rating, 0) / s.ratings.length
        : null,
    }));
  },
  getUserDetailsForAdminService: async (userId) => {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        stores: {
          include: { ratings: true },
        },
      },
    });

    if (!user) throw new Error("User not found");

    let ownerRating = null;
    if (user.role === "OWNER" && user.stores.length > 0) {
      const ratings = user.stores[0].ratings;
      ownerRating = ratings.length
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        : null;
    }

    const { password, ...userData } = user;
    return { ...userData, ownerRating };
  },
};
