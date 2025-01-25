'use client';
import React from 'react'
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ManagerLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.role !== 'manager') {
    router.push('/login');
    return null;
  }

  return (
    <div>
      <header>Manager Dashboard</header>
      <main>{children}</main>
      <footer>Manager Footer</footer>
    </div>
  );
}