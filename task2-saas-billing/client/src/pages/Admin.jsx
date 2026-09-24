import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const load = () => api.get("/admin/users").then((res) => setUsers(res.data));
  useEffect(() => { load(); }, []);

  const changeRole = async (id, role) => {
    await api.put(`/admin/users/${id}/role`, { role });
    load();
  };

  const changePlan = async (id, plan) => {
    await api.put(`/admin/users/${id}/plan`, { plan });
    load();
  };

  return (
    <div className="page">
      <header>
        <h1>Admin Panel</h1>
        <Link to="/">Back to Dashboard</Link>
      </header>
      <div className="content">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Plan</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <select value={u.role} onChange={(e) => changeRole(u._id, e.target.value)}>
                    <option value="user">user</option>
                    <option value="manager">manager</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>
                  <select value={u.plan} onChange={(e) => changePlan(u._id, e.target.value)}>
                    <option value="free">free</option>
                    <option value="pro">pro</option>
                    <option value="enterprise">enterprise</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
