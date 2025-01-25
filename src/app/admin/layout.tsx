'use client';
import React from 'react'
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.role !== 'admin') {
    router.push('/login');
    return null;
  }

  return (
    <div>
      <header>Admin Dashboard</header>
      <main>{children}</main>
      <footer>Admin Footer</footer>
    </div>
  );
}