import { useState } from "react";
import "./App.css";
import "react-multi-carousel/lib/styles.css";
import Axios from "axios";

const Event = () => {
  const [events, setEvents] = useState([]);

  Axios.get("http://localhost:3001/events").then((response) => {
    setEvents(response.data);
  });

  return (
    <div className="App">
      <h1>Events</h1>
      <div className="event-card">
        {events.map((data) => (
          <div className="card">
            <div className="card-pic">
              <img src={data.Img} alt="No Pic" className="card-pic"></img>
            </div>
            <div className="card-name">{data.EventName}</div>
            <div className="card-desc">{data.Description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
