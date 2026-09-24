import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext.jsx";

export default function Billing() {
  const [plans, setPlans] = useState([]);
  const [history, setHistory] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.get("/billing/plans").then((r) => setPlans(r.data));
    api.get("/billing/history").then((r) => setHistory(r.data));
  }, []);

  const subscribe = async (planName) => {
    const { data } = await api.post("/billing/checkout", { planName });
    window.location.href = data.url; // redirect to Stripe Checkout
  };

  return (
    <div className="billing-page">
      <h1>Billing</h1>
      <p>Current plan: <strong>{user?.plan}</strong></p>

      <h2>Plans</h2>
      <div className="plans">
        {plans.map((p) => (
          <div key={p._id} className="plan-card">
            <h3>{p.name}</h3>
            <p>${(p.priceMonthly / 100).toFixed(2)}/mo</p>
            <ul>{p.features?.map((f, i) => <li key={i}>{f}</li>)}</ul>
            <button onClick={() => subscribe(p.name)}>Subscribe</button>
          </div>
        ))}
      </div>

      <h2>Billing History</h2>
      <table>
        <thead><tr><th>Date</th><th>Plan</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
          {history.map((h) => (
            <tr key={h._id}>
              <td>{new Date(h.createdAt).toLocaleDateString()}</td>
              <td>{h.plan}</td>
              <td>${(h.amount / 100).toFixed(2)}</td>
              <td>{h.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
