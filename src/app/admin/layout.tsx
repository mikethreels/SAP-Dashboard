'use client';
import React, { ReactNode } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (!session || session.user.role !== "admin") {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <header>Admin Dashboard</header>
      <main>{children}</main>
      <footer>Admin Footer</footer>
    </div>
  );
};

export default AdminLayout;