import Image from "next/image";

import { getImageById } from "~/server/queries";

export default async function ImagePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const image = await getImageById(parseInt(id));

  if (!image) return;

  return <div className="card">
    <Image src={image.url} alt={image.name} className="w-full h-full object-cover" layout="responsive" width={400} height={100} />
  </div>;
}