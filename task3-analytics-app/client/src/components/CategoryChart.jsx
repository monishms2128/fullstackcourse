import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function CategoryChart({ data }) {
  return (
    <>
      <h3>Revenue by Category</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
