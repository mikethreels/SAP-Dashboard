"use client";

import React from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import SalesLayout from "../layouts/SalesLayout";
import ManagerLayout from "../layouts/ManagerLayout";
import CollectorLayout from "../layouts/CollectorLayout";

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if session and session.user exist before accessing session.user.role
    if (session && session.user) {
      switch (session.user.role) {
        case "admin":
          router.push("/admin");
          break;
        case "sales":
          router.push("/sales");
          break;
        case "manager":
          router.push("/manager");
          break;
        case "collector":
          router.push("/collector");
          break;
        default:
          router.push("/"); // Redirect to home if no role
      }
    }
  }, [session, router]);

  if (!session) {
    return <div>Please log in to view the dashboard.</div>;
  }

  return <div>Redirecting...</div>;
};

export default HomePage;
