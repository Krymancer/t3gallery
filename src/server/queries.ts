"import server-only";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export async function getImages() {
  const user = auth();

  if (!user || !user.userId) return [];

  return await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt)
  })
}

export async function getImageById(imageId: number) {
  return await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, imageId)
  })
}