import mockData from "@/data/mockData.json";

interface CollectorFilterProps {
  selectedPortfolio: string;
  onPortfolioChange: (portfolio: string) => void;
}

const CollectorFilter = ({ selectedPortfolio, onPortfolioChange }: CollectorFilterProps) => (
  <div>
    <label>Filter by Portfolio:</label>
    <select value={selectedPortfolio} onChange={(e) => onPortfolioChange(e.target.value)}>
      <option value="all">All Portfolios</option>
      {[...new Set(mockData.customers.map((c) => c.portfolio))].map((portfolio) => (
        <option key={portfolio} value={portfolio}>
          {portfolio}
        </option>
      ))}
    </select>
  </div>
);

export default CollectorFilter;
