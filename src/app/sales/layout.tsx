'use client';
import React, { ReactNode } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SalesLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (!session || session.user.role !== "sales") {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <header>Sales Dashboard</header>
      <main>{children}</main>
      <footer>Sales Footer</footer>
    </div>
  );
};

export default SalesLayout;