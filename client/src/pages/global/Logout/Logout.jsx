import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();
  const LogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <button className="logout-btn" onClick={LogOut}>
      Logout
    </button>
  );
};

export default Logout;
