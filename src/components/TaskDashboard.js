import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

const TaskDashboard = ({ tasks, deleteTask, editTask, toggleComplete }) => {
  const [filter, setFilter] = useState('All');
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(taskList);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setTaskList(reordered);
  };

  const filteredTasks = taskList.filter(task => {
    if (filter === 'Completed') return task.isCompleted;
    if (filter === 'High') return task.priority === 'High';
    if (filter === 'Normal') return task.priority === 'Normal';
    if (filter === 'Low') return task.priority === 'Low';
    return true;
  });

  const sectionedTasks = {
    High: filteredTasks.filter(t => t.priority === 'High' && !t.isCompleted),
    Normal: filteredTasks.filter(t => t.priority === 'Normal' && !t.isCompleted),
    Low: filteredTasks.filter(t => t.priority === 'Low' && !t.isCompleted),
    Completed: filteredTasks.filter(t => t.isCompleted),
  };

  return (
    <div className="dashboard">
      <div className="filter-buttons">
        {['All', 'Completed', 'High', 'Normal', 'Low'].map(btn => (
          <button
            key={btn}
            onClick={() => setFilter(btn)}
            className={filter === btn ? 'active' : ''}
          >
            {btn} Tasks
          </button>
        ))}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        {['High', 'Normal', 'Low', 'Completed'].map(section => (
          <div key={section} className={`task-section ${section.toLowerCase()}`}>
            <h2>{section === 'Normal' ? 'Normal' : section} Priority Tasks</h2>
            <Droppable droppableId={section}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {sectionedTasks[section].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <TaskItem
                          task={task}
                          deleteTask={deleteTask}
                          editTask={editTask}
                          toggleComplete={toggleComplete}
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TaskDashboard;