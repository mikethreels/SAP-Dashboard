"use client";

import Link from "next/link";
import * as XLSX from "xlsx";

const CustomerTable = ({ customers }: { customers: any[] }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      customers.map(({ id, name, region, portfolio, totalOpenAmount, totalOverdueAmount }) => ({
        ID: id,
        Name: name,
        Region: region,
        Portfolio: portfolio,
        "Total Open Amount": totalOpenAmount.toFixed(2),
        "Total Overdue Amount": totalOverdueAmount.toFixed(2),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    XLSX.writeFile(workbook, "customers.xlsx");
  };

  return (
    <div>
      <button onClick={exportToExcel}>Export to Excel</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Region</th>
            <th>Portfolio</th>
            <th>Total Open Amount</th>
            <th>Total Overdue Amount</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                <Link href={`/customers/${customer.id}`}>
                  {customer.name}
                </Link>
              </td>
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

export default CustomerTable;
