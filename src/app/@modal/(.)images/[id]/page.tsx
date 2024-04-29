import Image from 'next/image';
import { deleteImageById, getImageById } from '~/server/queries';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '~/components/ui/dialog';
import { clerkClient } from '@clerk/nextjs/server';


export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const image = await getImageById(parseInt(photoId));

  if (!image?.userId) return;

  const uploader = await clerkClient.users.getUser(image.userId);

  return <Dialog defaultOpen>
    <DialogContent>
      <DialogTitle>{image.name}</DialogTitle>
      <Image src={image.url} alt={image.name} className="w-full h-full object-cover" layout="responsive" width={400} height={100} />
      <DialogDescription>
        <div className='flex flex-col gap-4'>
          <span>Upload at: {image.createdAt.toLocaleString()}</span>
          <span>Uploaded by: {uploader.fullName}</span>
          <form action={async () => {
            "use server";
            await deleteImageById(image.id);
          }}>
            <Button type="submit" variant="destructive">Delete</Button>
          </form>
        </div>
      </DialogDescription>

    </DialogContent>
  </Dialog>;
}