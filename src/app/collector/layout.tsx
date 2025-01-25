'use client';
import React from 'react'
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CollectorLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.role !== 'collector') {
    router.push('/login');
    return null;
  }

  return (
    <div>
      <header>Collector Dashboard</header>
      <main>{children}</main>
      <footer>Collector Footer</footer>
    </div>
  );
}
