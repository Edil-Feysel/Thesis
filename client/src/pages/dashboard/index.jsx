import Axios from "axios";
import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [ask, setAsk] = useState({});
  const navigate = useNavigate();

  Axios.get("http://localhost:3001/askbutton").then((response) => {
    setAsk(response.data);
  });

  return (
    <div>
      {ask.length > 0 ? (
        <div className="ask-membership">
          <button
            onClick={() => {
              navigate("/askMembership", {
                state: { id: 1 },
              });
            }}
            className="btn-ask"
          >
            Ask Membership
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
