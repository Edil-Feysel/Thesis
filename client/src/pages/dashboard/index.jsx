import Axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [ask, setAsk] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      setData(response.data);
    });
    Axios.get("http://localhost:3001/ask").then((response) => {
      setAsk(response.data);
      console;
    });
  }, []);

  return (
    <div>
      {ask.ID ? (
        <div className="ask-membership">
          <button className="btn-ask">Ask Membership</button>
        </div>
      ) : (
        <h1>wellcome</h1>
      )}

      {/* {data.map((data) => (
        <h1>{data.Name}</h1>
      ))} */}
    </div>
  );
};

export default Dashboard;
