import React from 'react'
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ManagementLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <SessionProvider>
      <div>
        <Header />
          <h1>Management Dashboard</h1>
        <main>{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  )
}

export default ManagementLayout