import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="page">
      <header>
        <h1>SaaS Billing Portal</h1>
        <div>
          <span>{user?.name} ({user?.role})</span>
          <button onClick={logout}>Log Out</button>
        </div>
      </header>
      <div className="content">
        <h2>Current plan: {user?.plan}</h2>
        <nav className="nav-links">
          <Link to="/billing">Billing & Plans</Link>
          {(user?.role === "admin" || user?.role === "manager") && <Link to="/admin">Admin Panel</Link>}
        </nav>
      </div>
    </div>
  );
}
