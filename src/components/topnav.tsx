"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { SimpleUploadButton } from "./upload-button";
import Link from "next/link";

export function Topnav() {
  return <nav className="bg-background flex w-full items-center justify-between text-xl font-semibold border-b p-4">
    <Link href="/">T3 Gallery</Link>
    <div className="flex items-center justify-between gap-4 px-4">
      <SignedIn>
        <div className="flex gap-4 items-center">
          <SimpleUploadButton />
          <ModeToggle />
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <ModeToggle />
        <SignInButton mode="modal" />
      </SignedOut>
    </div>
  </nav>
}