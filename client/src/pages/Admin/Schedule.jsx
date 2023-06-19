import Axios from "axios";
import { useState } from "react";
import "./Schedule.css";

const Schedule = (EventId) => {
  const [group, setGroup] = useState("");
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const submit = (e) => {
    e.preventDefault();
    try {
      Axios.post("http://localhost:3001/addSchedule", {
        group: group,
        task: task,
        date: date,
        EventId: EventId,
      });
      console.log(date);
      setDate("");
      setGroup("");
      setTask("");
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="schedule-container">
      <form action="!#" onSubmit={submit}>
        <label htmlFor="group">Asigned Group</label>
        <select
          id="group"
          name="group"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option value="">select group</option>
          <option value="Group A">Group A</option>
          <option value="Group B">Group B</option>
          <option value="Group C">Group C</option>
          <option value="Group D">Group D</option>
        </select>
        <label htmlFor="task">Assigned task</label>
        <select
          id="task"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        >
          <option value="">Select Task</option>
          <option value="Camping">Camping</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Diner">Diner</option>
        </select>
        <label htmlFor="date"> Enter date (YYYY-MM-DD)</label>
        <input
          id="date"
          name="date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Schedule;
