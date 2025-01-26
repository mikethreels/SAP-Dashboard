"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import mockData from "@/data/mockData.json";

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

      <h2>Customers</h2>
      <ul>
        {filteredCustomers.map((customer) => (
          <li key={customer.id}>
            {customer.name} - {customer.region} - Portfolio: {customer.portfolio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;