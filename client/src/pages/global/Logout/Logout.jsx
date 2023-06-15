import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const LogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return <button onClick={LogOut}>Logout</button>;
};

export default Logout;
