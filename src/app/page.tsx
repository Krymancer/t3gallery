import Image from "next/image";
import { ImageGallery } from "~/components/gallery";

import { getImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const imagesData = getImages();

  const [images] = await Promise.all([imagesData]);

  return (
    <>
      {images.length === 0 && (<div className="flex items-center justify-center h-screen w-full text-center font-bold">No images found.<br /> Try upload one!</div>)}
      <ImageGallery images={images} />
    </>
  );
}
