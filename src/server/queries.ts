"import server-only";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { revalidatePath } from "next/cache";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

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

export async function deleteImageById(imageId: number) {
  const user = auth();

  if (!user.userId) return;

  await db.delete(images).where(and(eq(images.id, imageId), eq(images.userId, user.userId)));
  revalidatePath("/");
  redirect("/");
}