"use client";

import { type images } from "~/server/db/schema";

import Image from "next/image";
import Link from "next/link";

type Props = {
  images: typeof images.$inferSelect[];
}

export function ImageGallery({ images }: Props) {

  return (
    <div className="py-10 gap-4 columns-4" >
      {
        images.map((image) => (
          <Link key={image.id} href={`/images/${image.id}`} passHref className="relative pb-6 group masonry-grid-item">
            <Image src={image.url} alt={image.name} className="w-full h-full object-cover hover:opacity-45 pb-4" layout="responsive" width={200} height={50} />
          </Link>
        ))
      }
    </div >
  );
}