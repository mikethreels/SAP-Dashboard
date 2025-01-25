"use client";

import React from "react";
import { useSession } from "next-auth/react";

const ManagerPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>
    </div>
  );
};

export default ManagerPage;