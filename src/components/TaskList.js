import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, deleteTask, editTask }) => (
  <div className="task-list">
    {tasks.length === 0 ? <p>No tasks added yet.</p> :
      tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))
    }
  </div>
);

export default TaskList;
