"use client";

import React from "react";
import { useSession } from "next-auth/react";

interface DashboardPageProps {
  role: string;
}

const DashboardPage = ({ role }: DashboardPageProps) => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>
    </div>
  );
};

export default DashboardPage;