import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskCard from "../components/TaskCard.jsx";

const COLUMNS = [
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("");
  const { user, logout } = useAuth();

  const fetchTasks = async () => {
    const params = {};
    if (priorityFilter) params.priority = priorityFilter;
    const { data } = await api.get("/tasks", { params });
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [priorityFilter]);

  const addTask = async (task) => {
    await api.post("/tasks", task);
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Task Dashboard</h1>
        <div>
          <span>{user?.name}</span>
          <button onClick={logout}>Log Out</button>
        </div>
      </header>

      <div className="controls">
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <TaskForm onAdd={addTask} />

      <div className="board">
        {COLUMNS.map((col) => (
          <div className="column" key={col.key}>
            <h3>{col.label}</h3>
            {tasks
              .filter((t) => t.status === col.key)
              .map((t) => (
                <TaskCard key={t._id} task={t} onStatusChange={updateStatus} onDelete={deleteTask} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
