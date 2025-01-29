import mockData from "@/data/mockData.json";
import { parseDate } from "@/utils/dateUtils";

const PortfolioOverview = () => {
  const portfolioStats = mockData.customers.reduce((acc, customer) => {
    const portfolio = customer.portfolio;
    const customerInvoices = mockData.invoices.filter((inv) => inv.customerId === customer.id);

    const totalOpenAmount = customerInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalOverdueAmount = customerInvoices
      .filter((inv) => parseDate(inv.dueDate) < new Date())
      .reduce((sum, inv) => sum + inv.amount, 0);

    if (!acc[portfolio]) {
      acc[portfolio] = { totalOpen: 0, totalOverdue: 0 };
    }

    acc[portfolio].totalOpen += totalOpenAmount;
    acc[portfolio].totalOverdue += totalOverdueAmount;

    return acc;
  }, {} as Record<string, { totalOpen: number; totalOverdue: number }>);

  const totalOpenAmount = Object.values(portfolioStats).reduce((sum, p) => sum + p.totalOpen, 0);
  const totalOverdueAmount = Object.values(portfolioStats).reduce((sum, p) => sum + p.totalOverdue, 0);

  return (
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
    </div>
  );
};

export default PortfolioOverview;
