"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import mockData from "@/data/mockData.json";
import { parseDate } from "@/utils/dateUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";

interface Invoice {
  id: number;
  customerId: number;
  amount: number;
  invoiceDate: string;
  dueDate: string;
}

interface Customer {
  id: number;
  name: string;
  region: string;
  portfolio: string;
}

const CustomerDetailsPage = () => {
  const params = useParams();
  const customerId = Number(params.customerId);

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const router = useRouter();

  useEffect(() => {
    const foundCustomer = mockData.customers.find((c) => c.id === customerId);
    if (foundCustomer) {
      setCustomer(foundCustomer);
      setInvoices(
        mockData.invoices
          .filter((inv) => inv.customerId === customerId)
          .map((inv) => ({
            ...inv,
            date: inv.invoiceDate,
          }))
      );
    }
  }, [customerId]);

  const handleBack = () => {
    router.back();
  };

  const exportToExcel = () => {
    if (!customer) return;

    const workbook = XLSX.utils.book_new();
    
    // 1️⃣ Customer details as an array of arrays (for structured placement)
    const customerData = [
      ["Customer Details"],  // Title Row
      ["ID", "Name", "Region", "Portfolio"],  // Header Row
      [customer.id, customer.name, customer.region, customer.portfolio], // Data Row
      [],  // First Empty Row
      []   // Second Empty Row
    ];

    // 2️⃣ Invoice data formatted as an array of arrays
    const invoiceHeader = [
      ["Invoice ID", "Invoice Date", "Due Date", "Days in Arrear", "Amount"]
    ];
    const invoiceRows = invoices.map(({ id, invoiceDate, dueDate, amount }) => {
      const parsedDueDate = parseDate(dueDate);
      const today = new Date();
      const daysInArrear = Math.floor((today.getTime() - parsedDueDate.getTime()) / (1000 * 60 * 60 * 24));

      return [id, invoiceDate, dueDate, daysInArrear, `$${amount.toFixed(2)}`];
    });

    // 3️⃣ Combine customer data and invoice data
    const fullSheetData = [...customerData, ...invoiceHeader, ...invoiceRows];

    // 4️⃣ Convert to worksheet & add to workbook
    const worksheet = XLSX.utils.aoa_to_sheet(fullSheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Report");

    // 5️⃣ Trigger file download
    XLSX.writeFile(workbook, `customer_${customer.id}.xlsx`);
  };

  if (!customer) return <p>Customer not found.</p>;

  return (
    <div>
      {/* Back to Dashboard Button */}
      <Link href="/dashboard">
        <button>← Back to Dashboard</button>
      </Link>

      {/* Back to previous page button */}
      <button onClick={handleBack}>← Back</button>

      <h1>Customer Details</h1>
      <p><strong>ID:</strong> {customer.id}</p>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Region:</strong> {customer.region}</p>
      <p><strong>Portfolio:</strong> {customer.portfolio}</p>

      <h2>Outstanding Invoices</h2>
      {/* Export to Excel Button */}
      <button onClick={exportToExcel}>Export to Excel</button>
      {invoices.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Invoice Date</th>
              <th>Due Date</th>
              <th>Days in Arrear</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => {
              const invoiceDate = parseDate(invoice.invoiceDate);
              const dueDate = parseDate(invoice.dueDate);
              const today = new Date();
              const daysInArrear = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

              return (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.invoiceDate}</td>
                  <td>{invoice.dueDate}</td>
                  <td>{daysInArrear}</td>
                  <td>${invoice.amount.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No outstanding invoices for this customer.</p>
      )}
    </div>
  );
};

export default CustomerDetailsPage;
