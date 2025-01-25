'use client';
import React, { ReactNode } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ManagerLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (!session || session.user.role !== "manager") {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <header>Manager Dashboard</header>
      <main>{children}</main>
      <footer>Manager Footer</footer>
    </div>
  );
};

export default ManagerLayout;