import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { Button } from "~/components/ui/button";

import { deleteImageById, getImageById } from "~/server/queries";

export default async function ImagePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = auth();
  const image = await getImageById(parseInt(id));

  if (!image) return;

  return <div className="max-w-screen h-screen flex flex-col gap-4 items-center justify-center">
    <h1 className="font-bold text-3xl self-start">{image.name}</h1>
    <Image src={image.url} alt={image.name} className="w-full h-full object-cover" layout="responsive" width={400} height={100} />
    <div className="flex flex-col gap-4 self-start">

      <span>Uploaded At: {image.createdAt.toLocaleString()}</span>
      {user?.userId === image.userId &&
        (
          <form action={async () => {
            "use server";
            await deleteImageById(image.id);
          }}>
            <Button type="submit" variant="destructive">Delete</Button>
          </form>
        )
      }
    </div>
  </div>;
}