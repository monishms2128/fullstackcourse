export default function TaskCard({ task, onStatusChange, onDelete }) {
  return (
    <div className={`task-card priority-${task.priority}`}>
      <h4>{task.title}</h4>
      {task.dueDate && <p className="due">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
      <div className="task-actions">
        <select value={task.status} onChange={(e) => onStatusChange(task._id, e.target.value)}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}
