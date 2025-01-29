import mockData from "@/data/mockData.json";
import { parseDate } from "@/utils/dateUtils";

const DSOOverview = () => {
  const calculateDSO = () => {
    const totalSales = mockData.invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalReceivables = mockData.invoices.reduce((sum, inv) => sum + (parseDate(inv.dueDate) < new Date() ? inv.amount : 0), 0);
    const daysInPeriod = 30; // Can be adjusted

    return totalReceivables > 0 ? (totalReceivables / totalSales) * daysInPeriod : 0;
  };

  const dso = calculateDSO();

  return (
    <div>
      <h2>Days Sales Outstanding (DSO)</h2>
      <p>Current DSO: {dso.toFixed(2)} days</p>
    </div>
  );
};

export default DSOOverview;
