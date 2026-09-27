import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

export default function RegionChart({ data }) {
  return (
    <>
      <h3>Revenue by Region</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="revenue" nameKey="region" outerRadius={90} label>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
