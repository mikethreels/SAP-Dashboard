interface CustomerTableProps {
  customers: any[];
}

const CustomerTable = ({ customers }: CustomerTableProps) => (
  <div>
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
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.region}</td>
            <td>{customer.portfolio}</td>
            <td>${(customer.totalOpenAmount || 0).toFixed(2)}</td>
            <td>${(customer.totalOverdueAmount || 0).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CustomerTable;
