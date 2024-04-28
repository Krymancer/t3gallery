'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { XIcon } from 'lucide-react';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-[1000]">
      <dialog ref={dialogRef} onClose={onDismiss} className="w-[80%] max-w-[500px] h-auto max-h-[500px] border-none bg-background text-foreground p-5 relative flex justify-center items-center font-semibold " >
        {children}
        <button onClick={onDismiss} className="absolute top-3 right-3 w-12 h-12 bg-transparent border-none cursor-pointer flex items-center justify-center" >
          <XIcon className='w-5 h-5 stroke-foreground' />
        </button>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}