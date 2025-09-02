
import prisma from "../configs/dbConfig.js";


export const userService = {
 getStoresService : async (userId, { name, address }) => {
  const stores = await prisma.store.findMany({
    where: {
      name: name ? { contains: name, mode: "insensitive" } : undefined,
      address: address ? { contains: address, mode: "insensitive" } : undefined,
    },
    include: {
      ratings: {
        select: { rating: true, userId: true },
      },
    },
  });

  return stores.map((s) => {
    const avgRating = s.ratings.length
      ? s.ratings.reduce((sum, r) => sum + r.rating, 0) / s.ratings.length
      : null;

    const userRating =
      s.ratings.find((r) => r.userId === userId)?.rating || null;

    return {
      id: s.id,
      name: s.name,
      email: s.email ?? null, 
      address: s.address,
      avgRating,
      userRating,
    };
  });
},

 addRatingService : async ({ userId, storeId, rating }) => {
  if (rating < 1 || rating > 5) throw new Error("Rating must be 1 to 5");

  return prisma.rating.create({
    data: { userId, storeId, rating },
  });
},

 updateRatingService : async ({ userId, storeId, rating }) => {
  if (rating < 1 || rating > 5) throw new Error("Rating must be 1 to 5");

  const existing = await prisma.rating.findFirst({
    where: { userId, storeId },
  });
  if (!existing) throw new Error("Rating not found");

  return prisma.rating.update({
    where: { id: existing.id },
    data: { rating },
  });
},
}