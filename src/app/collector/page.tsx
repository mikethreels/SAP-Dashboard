"use client";

import React from "react";
import { useSession } from "next-auth/react";

const CollectorPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Collector Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>
    </div>
  );
};

export default CollectorPage;