"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import mockData from "@/data/mockData.json";
import CustomerTable from "./components/CustomerTable";
import PortfolioOverview from "./components/PortfolioOverview";
import CollectorFilter from "./components/CollectorFilter";
import DSOOverview from "./components/DSOOverview";

// Function to correctly parse "dd.mm.yyyy" format into a JavaScript Date object
const parseDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split(".").map(Number);
  return new Date(year, month - 1, day); // Month is 0-based
};

interface DashboardPageProps {
  role: string;
}

const DashboardPage = ({ role }: DashboardPageProps) => {
  const { data: session } = useSession();
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("");

  useEffect(() => {
    if (!session) return;

    let customers = mockData.customers;

    if (role === "sales") {
      customers = customers.filter((customer) => customer.region === session.user.region);
    } else if (role === "collector") {
      customers = customers.filter((customer) => customer.portfolio === session.user.portfolio);
    }

    // Calculate totalOpenAmount and totalOverdueAmount for each customer
    const customerStats = customers.map((customer) => {
      const customerInvoices = mockData.invoices.filter((inv) => inv.customerId === customer.id);

      const totalOpenAmount = customerInvoices.reduce((sum, inv) => sum + inv.amount, 0);
      const totalOverdueAmount = customerInvoices
        .filter((inv) => parseDate(inv.dueDate) < new Date()) // Correct date comparison
        .reduce((sum, inv) => sum + inv.amount, 0);

      return { ...customer, totalOpenAmount, totalOverdueAmount };
    });

    setFilteredCustomers(customerStats);
  }, [session, role]);

  const handlePortfolioChange = (portfolio: string) => {
    if (portfolio === "all") {
      setFilteredCustomers(mockData.customers);
    } else {
      setFilteredCustomers(mockData.customers.filter((c) => c.portfolio === portfolio));
    }
    setSelectedPortfolio(portfolio);
  };

  return (
    <div>
      <h1>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>

      {role === "collector" && <CollectorFilter selectedPortfolio={selectedPortfolio} onPortfolioChange={handlePortfolioChange} />}
      {role === "manager" && <PortfolioOverview />}
      {role === "manager" && <DSOOverview />}

      <CustomerTable customers={filteredCustomers} />
    </div>
  );
};

export default DashboardPage;
