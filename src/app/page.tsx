import { ImageGallery } from "~/components/gallery";
import { getImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await getImages();

  return (
    <div className="overflow-y-scroll">
      {images.length === 0 && (<div className="flex items-center justify-center h-screen w-full text-center font-bold">No images found.<br /> Try upload one!</div>)}
      <ImageGallery images={images} />
    </div>
  );
}
