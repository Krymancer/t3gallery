import Image from 'next/image';
import { Modal } from './modal';
import { getImageById } from '~/server/queries';

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const image = await getImageById(parseInt(photoId));

  if (!image) return;

  return <Modal>
    <Image src={image.url} alt={image.name} className="w-full h-full object-cover" layout="responsive" width={400} height={100} />
  </Modal>;
}