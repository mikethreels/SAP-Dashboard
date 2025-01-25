'use client';
import React from 'react'
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SalesLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.role !== 'sales') {
    router.push('/login'); // Redirect if not a sales user
    return null; // Prevent rendering if not authorized
  }

  return (
    <div>
      <header>Sales Dashboard Header</header>
      <main>{children}</main>
      <footer>Sales Footer</footer>
    </div>
  );
}