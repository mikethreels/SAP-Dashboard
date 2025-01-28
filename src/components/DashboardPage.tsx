"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import mockData from "@/data/mockData.json";

interface DashboardPageProps {
  role: string;
}

// Function to correctly parse "dd.mm.yyyy" format into a JavaScript Date object
const parseDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split(".").map(Number);
  return new Date(year, month - 1, day); // Month is 0-based
};

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

    setFilteredCustomers(customers);
  }, [session, role]);

  const handlePortfolioChange = (portfolio: string) => {
    if (portfolio === "all") {
      setFilteredCustomers(mockData.customers);
    } else {
      setFilteredCustomers(mockData.customers.filter((c) => c.portfolio === portfolio));
    }
    setSelectedPortfolio(portfolio);
  };

  // Calculate open and overdue amounts per portfolio and per customer
  const portfolioStats = mockData.customers.reduce((acc, customer) => {
    const portfolio = customer.portfolio;
    const customerInvoices = mockData.invoices.filter((inv) => inv.customerId === customer.id);

    const totalOpenAmount = customerInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalOverdueAmount = customerInvoices
      .filter((inv) => parseDate(inv.dueDate) < new Date()) // Correct date comparison
      .reduce((sum, inv) => sum + inv.amount, 0);

    if (!acc[portfolio]) {
      acc[portfolio] = { totalOpen: 0, totalOverdue: 0 };
    }

    acc[portfolio].totalOpen += totalOpenAmount;
    acc[portfolio].totalOverdue += totalOverdueAmount;

    return acc;
  }, {} as Record<string, { totalOpen: number; totalOverdue: number }>);

  // Calculate open and overdue amounts per customer
  const customerStats = filteredCustomers.map((customer) => {
    const customerInvoices = mockData.invoices.filter((inv) => inv.customerId === customer.id);

    const totalOpenAmount = customerInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalOverdueAmount = customerInvoices
      .filter((inv) => parseDate(inv.dueDate) < new Date()) // Correct date comparison
      .reduce((sum, inv) => sum + inv.amount, 0);

    return { ...customer, totalOpenAmount, totalOverdueAmount };
  });

  // Calculate overall totals
  const totalOpenAmount = Object.values(portfolioStats).reduce((sum, p) => sum + p.totalOpen, 0);
  const totalOverdueAmount = Object.values(portfolioStats).reduce((sum, p) => sum + p.totalOverdue, 0);

  return (
    <div>
      <h1>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>

      {role === "collector" && (
        <div>
          <label>Filter by Portfolio:</label>
          <select value={selectedPortfolio} onChange={(e) => handlePortfolioChange(e.target.value)}>
            <option value="all">All Portfolios</option>
            {[...new Set(mockData.customers.map((c) => c.portfolio))].map((portfolio) => (
              <option key={portfolio} value={portfolio}>
                {portfolio}
              </option>
            ))}
          </select>
        </div>
      )}

      {role === "manager" && (
        <div>
          <h2>Portfolio Overview</h2>
          <table>
            <thead>
              <tr>
                <th>Portfolio</th>
                <th>Total Open Amount</th>
                <th>Overdue Amount</th>
                <th>Overdue %</th>
                <th>Weighted Impact</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(portfolioStats).map(([portfolio, stats]) => {
                const overduePercentage = stats.totalOpen > 0 ? (stats.totalOverdue / stats.totalOpen) * 100 : 0;
                const weightedImpact = totalOverdueAmount > 0 ? (stats.totalOverdue / totalOverdueAmount) * 100 : 0;

                return (
                  <tr key={portfolio}>
                    <td>{portfolio}</td>
                    <td>${stats.totalOpen.toFixed(2)}</td>
                    <td>${stats.totalOverdue.toFixed(2)}</td>
                    <td>{overduePercentage.toFixed(2)}%</td>
                    <td>{weightedImpact.toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h3>Total Overdue: ${totalOverdueAmount.toFixed(2)}</h3>
          <h3>Overall Overdue Percentage: {((totalOverdueAmount / totalOpenAmount) * 100 || 0).toFixed(2)}%</h3>
        </div>
      )}

      <h2>Customers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Region</th>
            <th>Portfolio</th>
            <th>Total Open Amount</th>
            <th>Overdue Amount</th>
          </tr>
        </thead>
        <tbody>
          {customerStats.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.region}</td>
              <td>{customer.portfolio}</td>
              <td>${customer.totalOpenAmount.toFixed(2)}</td>
              <td>${customer.totalOverdueAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
