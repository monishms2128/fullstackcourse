import { useEffect, useState } from "react";
import api from "../api";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  const load = () => api.get("/admin/users").then((r) => setUsers(r.data));
  useEffect(() => { load(); }, []);

  const changeRole = async (id, role) => {
    await api.put(`/admin/users/${id}/role`, { role });
    load();
  };

  return (
    <div className="admin-page">
      <h1>Admin — Manage Users</h1>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Plan</th><th>Role</th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.plan}</td>
              <td>
                <select value={u.role} onChange={(e) => changeRole(u._id, e.target.value)}>
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
