'use client'; // Mark this as a Client Component

import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import { ReactNode } from "react"; // For typing
import { metadata } from './serverLayout'; // Import metadata from server-side

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}
