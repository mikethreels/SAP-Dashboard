"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import mockData from "@/data/mockData.json";

interface DashboardPageProps {
  role: string;
}

interface Customer {
  id: number;
  name: string;
  region: string;
  portfolio: string;
}

interface Invoice {
  id: number;
  customerId: number;
  amount: number;
  invoiceDate: string;
  dueDate: string;
}

const DashboardPage = ({ role }: DashboardPageProps) => {
  const { data: session } = useSession();
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [totals, setTotals] = useState<Record<number, { total: number; overdue: number }>>({});
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("");

  useEffect(() => {
    if (!session) return;

    let customers = mockData.customers;

    if (role === "sales") {
      // Sales can only see customers in their region
      customers = customers.filter(
        (customer) => customer.region === session.user.region
      );
    } else if (role === "collector") {
      // Collectors see only their assigned portfolio by default
      customers = customers.filter(
        (customer) => customer.portfolio === session.user.portfolio
      );
    }

    setFilteredCustomers(customers);
  }, [session, role]);

  useEffect(() => {
    // Calculate totals for each customer
    const today = new Date();
    const customerTotals: Record<number, { total: number; overdue: number }> = {};

    filteredCustomers.forEach((customer) => {
      const customerInvoices = mockData.invoices.filter((inv) => inv.customerId === customer.id);
      const totalAmount = customerInvoices.reduce((sum, inv) => sum + inv.amount, 0);
      const overdueAmount = customerInvoices
        .filter((inv) => {
          const [day, month, year] = inv.dueDate.split(".").map(Number);
          const dueDate = new Date(year, month - 1, day);
          return dueDate < today;
        })
        .reduce((sum, inv) => sum + inv.amount, 0);

      customerTotals[customer.id] = { total: totalAmount, overdue: overdueAmount };
    });

    setTotals(customerTotals);
  }, [filteredCustomers]);

  const handlePortfolioChange = (portfolio: string) => {
    if (portfolio === "all") {
      setFilteredCustomers(mockData.customers);
    } else {
      setFilteredCustomers(
        mockData.customers.filter((c) => c.portfolio === portfolio)
      );
    }
    setSelectedPortfolio(portfolio);
  };

  return (
    <div>
      <h1>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>

      {role === "collector" && (
        <div>
          <label>Filter by Portfolio:</label>
          <select
            value={selectedPortfolio}
            onChange={(e) => handlePortfolioChange(e.target.value)}
          >
            <option value="all">All Portfolios</option>
            {[...new Set(mockData.customers.map((c) => c.portfolio))].map(
              (portfolio) => (
                <option key={portfolio} value={portfolio}>
                  {portfolio}
                </option>
              )
            )}
          </select>
        </div>
      )}

      <h2>Customer Overview</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Region</th>
            <th>Portfolio</th>
            <th>Total Invoice Amount</th>
            <th>Overdue Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.region}</td>
              <td>{customer.portfolio}</td>
              <td>${totals[customer.id]?.total.toFixed(2) || "0.00"}</td>
              <td style={{ color: totals[customer.id]?.overdue ? "red" : "inherit" }}>
                ${totals[customer.id]?.overdue.toFixed(2) || "0.00"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;