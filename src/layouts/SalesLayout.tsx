import React from 'react'
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SalesLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <SessionProvider>
      <div>
        <Header />
          <h1>Sales Dashboard</h1>
        <main>{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  )
}

export default SalesLayout