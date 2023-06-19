import Axios from "axios";
import { useState } from "react";
import "./index.css";
import Schedule from "./Schedule";

const Sevent = () => {
  const [futEvents, setFutEvent] = useState([]);
  // const [eventId, setEventId] = useState([]);

  Axios.get("http://localhost:3001/futureEvents").then((response) => {
    setFutEvent(response.data);
  });
  return (
    <div className="sevent-container">
      <div className="sevent-header">
        <p>Future Events</p>
      </div>
      {futEvents?.map((data) => (
        <div className="sevent">
          <div className="sevent-list">
            <div className="sevent-img">
              <img src={data.Img} alt="" />
            </div>
            <div className="sevent-name">{data.EventName}</div>
            {/* <button onClick={setEventId(data.ID)}>Add to Schedule</button> */}
            <Schedule EventId={data.ID} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sevent;
