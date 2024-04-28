import "~/styles/globals.css";
import { Inter as FontSans } from "next/font/google"

import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "~/lib/utils"
import { Toaster } from "~/components/ui/sonner"

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ThemeProvider } from "~/components/theme-provider"

import { ourFileRouter } from "~/app/api/uploadthing/core";
import { Topnav } from "~/components/topnav";
import React from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "T3 Gallery",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen flex flex-col font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            <header className="top-0 w-full sticky z-50">
              <Topnav />
            </header>
            <main className="flex flex-1 overflow-hidden">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
          {modal}
          <div id="modal-root" />
        </body>
      </html>
    </ClerkProvider>
  );
}
