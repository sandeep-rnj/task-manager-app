import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Select Priority');
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (priority === 'Select Priority') {
      alert('Please select a valid priority before submitting the task.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      desc,
      priority,
      date,
      isCompleted: false,
    };

    addTask(newTask);
    setTitle('');
    setDesc('');
    setPriority('Select Priority');
    setDate(new Date());
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Select Priority">Select Priority</option>
        <option value="Low">Low</option>
        <option value="Normal">Normal</option>
        <option value="High">High</option>
      </select>
      <Calendar value={date} onChange={setDate} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
