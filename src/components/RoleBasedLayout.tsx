"use client";

import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RoleBasedLayoutProps {
  children: ReactNode;
  requiredRole: string;
}

const RoleBasedLayout = ({ children, requiredRole }: RoleBasedLayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (!session || session.user.role !== requiredRole) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <header>{requiredRole.charAt(0).toUpperCase() + requiredRole.slice(1)} Dashboard</header>
      <main>{children}</main>
      <footer>{requiredRole.charAt(0).toUpperCase() + requiredRole.slice(1)} Footer</footer>
    </div>
  );
};

export default RoleBasedLayout;