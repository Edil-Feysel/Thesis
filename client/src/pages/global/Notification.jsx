import Axios from "axios";
import { useState } from "react";

const Notification = () => {
  const [res, setRes] = useState([]);
  Axios.get("http://localhost:3001/askNotification").then((res) => {
    setRes(res.data);
  });
  return (
    <div>
      {res.length > 0 ? (
        <h1>no</h1>
      ) : (
        <h1>Dear ms you have to pay this months monthly payment</h1>
      )}
    </div>
  );
};

export default Notification;
