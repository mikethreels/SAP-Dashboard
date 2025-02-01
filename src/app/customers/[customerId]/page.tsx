"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import mockData from "@/data/mockData.json";
import { parseDate } from "@/utils/dateUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const [agingBuckets, setAgingBuckets] = useState({
    "1-30": 0,
    "31-60": 0,
    "61-90": 0,
    "91+": 0,
  });

  const router = useRouter();

  useEffect(() => {
    const foundCustomer = mockData.customers.find((c) => c.id === customerId);
    if (foundCustomer) {
      setCustomer(foundCustomer);

      const customerInvoices = mockData.invoices.filter(
        (inv) => inv.customerId === customerId
      );

      setInvoices(customerInvoices);

      // Calculate aging buckets
      const today = new Date();
      const updatedBuckets = { "1-30": 0, "31-60": 0, "61-90": 0, "91+": 0 };

      customerInvoices.forEach((invoice) => {
        const dueDate = parseDate(invoice.dueDate);
        const daysInArrear = Math.floor(
          (today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysInArrear > 0) {
          if (daysInArrear <= 30) updatedBuckets["1-30"] += invoice.amount;
          else if (daysInArrear <= 60) updatedBuckets["31-60"] += invoice.amount;
          else if (daysInArrear <= 90) updatedBuckets["61-90"] += invoice.amount;
          else updatedBuckets["91+"] += invoice.amount;
        }
      });

      setAgingBuckets(updatedBuckets);
    }
  }, [customerId]);

  const handleBack = () => {
    router.back();
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

      {/* Aging Buckets Summary */}
      <h2>Aging Buckets</h2>
      <table>
        <thead>
          <tr>
            <th>Days Overdue</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1-30 days</td>
            <td>${agingBuckets["1-30"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>31-60 days</td>
            <td>${agingBuckets["31-60"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>61-90 days</td>
            <td>${agingBuckets["61-90"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>91+ days</td>
            <td>${agingBuckets["91+"].toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <h2>Outstanding Invoices</h2>
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
              const daysInArrear = Math.floor(
                (today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
              );

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

