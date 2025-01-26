"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { data: session, status } = useSession(); // session status
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // State to track mounting

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true after component is mounted
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Only run after the component is mounted on the client

    if (status === "loading") return;

    if (status === "authenticated" && session?.user) {
      // Redirect based on user role
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
    } else if (status === "unauthenticated") {
      // Redirect to login page if not authenticated
      router.push("/login");
    }
  }, [status, session, router, isMounted]);

  // Wait until the component is mounted and session is loaded
  if (!isMounted || status === "loading") {
    return <div>Loading...</div>; // Show a loading state while session is being fetched
  }

  return <div>Redirecting...</div>; // Fallback content during redirection
};

export default HomePage;