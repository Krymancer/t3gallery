"use client";

import { type images } from "~/server/db/schema";

import Image from "next/image";
import Link from "next/link";

type Props = {
  images: typeof images.$inferSelect[];
}

export function ImageGallery({ images }: Props) {

  return (
    <div className="w-full flex-1 py-10 gap-4 columns-4 masonry-grid" >
      {
        images.map((image) => (
          <Link href={`/images/${image.id}`} passHref key={image.id} className="relative pb-6 group masonry-grid-item">
            <div className="group-hover:bg-background/50 transition-all absolute top-0 left-0 w-full h-full" />
            <Image src={image.url} alt={image.name} className="w-full h-full object-cover" layout="responsive" width={200} height={50} />
          </Link>
        ))
      }
    </div >
  );
}