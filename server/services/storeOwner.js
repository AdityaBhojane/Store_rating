

export const getStoreRatings = async (ownerId) => {
  const store = await prisma.store.findFirst({
    where: { ownerId },
    include: {
      ratings: {
        include: { user: true }, 
      },
    },
  });

  if (!store) throw new Error("Store not found for this owner");

  // calculating average reting here 
  const avgRating = store.ratings.length
    ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length
    : null;

  return {
    storeId: store.id,
    storeName: store.name,
    avgRating,
    ratings: store.ratings.map((r) => ({
      id: r.id,
      rating: r.rating,
      user: {
        id: r.user.id,
        name: r.user.name,
        email: r.user.email,
        address: r.user.address,
      },
    })),
  };
};
