import Axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AskAdmin = () => {
  const [family, setFamily] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state || {};
  const [userId, setUserId] = useState("");
  
  useEffect(() => {
    setUserId(id);
  }, []);

  const askMembership = () => {
    Axios.post("http://localhost:3001/askMembership", {
      family: family,
      id: userId,
    });
  };

  return (
    <div className="container">
      <form className="form" onSubmit={askMembership}>
        <label htmlFor="family" className="label">
          How many family members do you have?
        </label>
        <input
          id="family"
          className="input"
          placeholder="Family size"
          onChange={(e) => {
            setFamily(e.target.value);
          }}
        />
        <button type="submit" className="button">Ask the admin</button>
      </form>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="button"
      >
        Back to home
      </button>
    </div>
  );
};

export default AskAdmin;
