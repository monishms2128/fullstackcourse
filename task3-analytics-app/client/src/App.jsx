import { useEffect, useState } from "react";
import api from "./api";
import RevenueTrend from "./components/RevenueTrend.jsx";
import CategoryChart from "./components/CategoryChart.jsx";
import RegionChart from "./components/RegionChart.jsx";
import SummaryCards from "./components/SummaryCards.jsx";

export default function App() {
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [byRegion, setByRegion] = useState([]);

  useEffect(() => {
    const params = category ? { category } : {};
    api.get("/analytics/summary", { params }).then((r) => setSummary(r.data));
    api.get("/analytics/revenue-over-time", { params }).then((r) => setTrend(r.data));
    api.get("/analytics/by-category").then((r) => setByCategory(r.data));
    api.get("/analytics/by-region", { params }).then((r) => setByRegion(r.data));
  }, [category]);

  return (
    <div className="app">
      <header>
        <h1>Sales Analytics Dashboard</h1>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {byCategory.map((c) => (
            <option key={c.category} value={c.category}>{c.category}</option>
          ))}
        </select>
      </header>

      <SummaryCards summary={summary} />

      <div className="charts-grid">
        <div className="chart-box wide"><RevenueTrend data={trend} /></div>
        <div className="chart-box"><CategoryChart data={byCategory} /></div>
        <div className="chart-box"><RegionChart data={byRegion} /></div>
      </div>
    </div>
  );
}
