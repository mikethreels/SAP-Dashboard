"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1>Dashboard</h1>
        <nav>
          <ul style={styles.navList}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            {session ? (
              <>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={() => signOut()}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#333",
    padding: "10px 0",
    color: "#fff",
  },
  container: {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navList: {
    display: "flex",
    listStyleType: "none",
    gap: "20px",
  },
};

export default Header;