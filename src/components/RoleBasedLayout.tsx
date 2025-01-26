"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";

interface RoleBasedLayoutProps {
  children: ReactNode;
  requiredRole: string;
}

const RoleBasedLayout = ({ children, requiredRole }: RoleBasedLayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState<boolean>(false);

  useEffect(() => {
    if (status === "loading" || redirecting) return;

    if (!session) {
      setRedirecting(true);
      router.push("/login");
    }

    // if (!session || session.user.role !== requiredRole) {
    //   setRedirecting(true);  // Flag to prevent future redirects
    //   router.push("/login");
    // }
  }, [session, status, requiredRole, router, redirecting]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  if (session.user.role !== requiredRole) {
    notFound();
  }

  // if (status === "loading" || !session || session.user.role !== requiredRole) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <header className="p-4 bg-gray-900 text-white">
          {requiredRole.charAt(0).toUpperCase() + requiredRole.slice(1)} Dashboard
        </header>
        <main className="flex-1 p-4">{children}</main>
        <footer className="p-4 bg-gray-900 text-white">
          {requiredRole.charAt(0).toUpperCase() + requiredRole.slice(1)} Footer
        </footer>
      </div>
    </div>
  );
};

export default RoleBasedLayout;