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
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("all");
  const [selectedTab, setSelectedTab] = useState<string>("portfolio"); // Set PortfolioOverview as default tab

  // Calculate totalOutstanding and totalOverdue for financial overview
  const totalOutstanding = mockData.invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = mockData.invoices
    .filter((inv) => parseDate(inv.dueDate) < new Date())
    .reduce((sum, inv) => sum + inv.amount, 0);
  const overduePercentage = totalOutstanding > 0 ? (totalOverdue / totalOutstanding) * 100 : 0;

  // Aging buckets calculation
  const agingBuckets = {
    "1-30": 0,
    "31-60": 0,
    "61-90": 0,
    "91+": 0,
  };

  mockData.invoices.forEach((invoice) => {
    const dueDate = parseDate(invoice.dueDate);
    const today = new Date();
    const daysInArrear = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysInArrear > 0) {
      if (daysInArrear <= 30) agingBuckets["1-30"] += invoice.amount;
      else if (daysInArrear <= 60) agingBuckets["31-60"] += invoice.amount;
      else if (daysInArrear <= 90) agingBuckets["61-90"] += invoice.amount;
      else agingBuckets["91+"] += invoice.amount;
    }
  });

  useEffect(() => {
    if (!session) return;

    let customers = mockData.customers;

    if (role === "sales") {
      customers = customers.filter((customer) => customer.region === session.user.region);
    } else if (role === "collector") {
      customers = customers.filter((customer) => customer.portfolio === session.user.portfolio);
    }

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
    setSelectedPortfolio(portfolio);
  };

  return (
    <div>
      <h1>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>

      {/* Financial Overview section for Manager */}
      {role === "manager" && (
        <div>
          <h2>Financial Overview</h2>
          <p><strong>Total Outstanding Amount:</strong> ${totalOutstanding.toFixed(2)}</p>
          <p><strong>Total Overdue Amount:</strong> ${totalOverdue.toFixed(2)}</p>
          <p><strong>Overdue Percentage:</strong> {overduePercentage.toFixed(2)}%</p>

          <h3>Aging Buckets</h3>
          <table>
            <thead>
              <tr>
                <th>1-30 Days</th>
                <th>31-60 Days</th>
                <th>61-90 Days</th>
                <th>91+ Days</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${agingBuckets["1-30"].toFixed(2)}</td>
                <td>${agingBuckets["31-60"].toFixed(2)}</td>
                <td>${agingBuckets["61-90"].toFixed(2)}</td>
                <td>${agingBuckets["91+"].toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {role === "collector" && <CollectorFilter selectedPortfolio={selectedPortfolio} onPortfolioChange={handlePortfolioChange} />}
      
      <div>
        <button onClick={() => setSelectedTab("portfolio")}>Portfolio Overview</button>
        <button onClick={() => setSelectedTab("customers")}>Customer Overview</button>
        {role === "manager" && <button onClick={() => setSelectedTab("dso")}>DSO Overview</button>}
      </div>

      {selectedTab === "portfolio" && <PortfolioOverview />}
      {selectedTab === "customers" && <CustomerTable customers={filteredCustomers} />}
      {selectedTab === "dso" && <DSOOverview />}
    </div>
  );
};

export default DashboardPage;
