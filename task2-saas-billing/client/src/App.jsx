import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Billing from "./pages/Billing.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Layout from "./components/Layout.jsx";

function Protected({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/billing" />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/billing"
        element={
          <Protected>
            <Layout><Billing /></Layout>
          </Protected>
        }
      />
      <Route
        path="/admin"
        element={
          <Protected roles={["admin"]}>
            <Layout><AdminPanel /></Layout>
          </Protected>
        }
      />
      <Route path="/" element={<Navigate to="/billing" />} />
    </Routes>
  );
}
