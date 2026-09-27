export default function SummaryCards({ summary }) {
  if (!summary) return null;
  return (
    <div className="summary-cards">
      <div className="card"><span>Total Revenue</span><h2>${summary.totalRevenue?.toLocaleString()}</h2></div>
      <div className="card"><span>Units Sold</span><h2>{summary.totalUnits?.toLocaleString()}</h2></div>
      <div className="card"><span>Records</span><h2>{summary.records?.toLocaleString()}</h2></div>
    </div>
  );
}
