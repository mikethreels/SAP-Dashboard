'use client';
import React, { ReactNode } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CollectorLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (!session || session.user.role !== "collector") {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <header>Collector Dashboard</header>
      <main>{children}</main>
      <footer>Collector Footer</footer>
    </div>
  );
};

export default CollectorLayout;