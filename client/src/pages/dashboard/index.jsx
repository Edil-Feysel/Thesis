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
      {ask.length > 0 ? null : (
        <div className="ask-membership">
          <button
            onClick={() => {
              navigate("/askMembership", {
                state: { id: 4 },
              });
            }}
            className="btn-ask"
          >
            Ask Membership
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
