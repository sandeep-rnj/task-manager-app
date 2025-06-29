import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheck, FaEdit, FaSave, FaTrash } from 'react-icons/fa';

const TaskItem = ({ task, deleteTask, editTask, toggleComplete, provided }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    editTask(editedTask);
    setIsEditing(false);
  };

  return (
    <motion.div
      className={`task-item ${task.priority.toLowerCase()} ${task.isCompleted ? 'completed' : ''}`}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isEditing ? (
        <>
          <input
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <textarea
            value={editedTask.desc}
            onChange={(e) => setEditedTask({ ...editedTask, desc: e.target.value })}
          />
          <select
            value={editedTask.priority}
            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
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
          <span>Due: {new Date(task.date).toLocaleDateString()}</span><br />
          <span>Priority: {task.priority}</span>
          <div className="buttons">
            <button onClick={() => setIsEditing(true)}><FaEdit /></button>
            <button onClick={() => deleteTask(task.id)}><FaTrash /></button>
            <button onClick={() => toggleComplete(task.id)}><FaCheck /></button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TaskItem;
