import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  return (
    <div>
      <nav className="navbar">
        <div className="brand">SaaS Portal</div>
        <div className="links">
          <Link to="/billing">Billing</Link>
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
          <span className="role-badge">{user?.role}</span>
          <button onClick={logout}>Log Out</button>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
