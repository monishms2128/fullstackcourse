import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function RevenueTrend({ data }) {
  return (
    <>
      <h3>Revenue Over Time</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
