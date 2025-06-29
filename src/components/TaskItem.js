import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const TaskItem = ({ task, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    editTask(editedTask);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.priority.toLowerCase()}`}>
      {isEditing ? (
        <>
          <input
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
          />
          <textarea
            value={editedTask.desc}
            onChange={(e) =>
              setEditedTask({ ...editedTask, desc: e.target.value })
            }
          />
          <select
            value={editedTask.priority}
            onChange={(e) =>
              setEditedTask({ ...editedTask, priority: e.target.value })
            }
          >
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </select>
          <button onClick={handleSave}><FaSave /></button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.desc}</p>
          <span>Priority: {task.priority}</span>
          <div className="buttons">
            <button onClick={() => setIsEditing(true)}><FaEdit /></button>
            <button onClick={() => deleteTask(task.id)}><FaTrash /></button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
