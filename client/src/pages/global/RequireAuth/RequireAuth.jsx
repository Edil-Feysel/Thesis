import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const RequireAuth = ({ Autherization }) => {
  return (
    <>
      {sessionStorage.getItem("autenthicate") ? (
        Autherization.includes(
          JSON.parse(sessionStorage.getItem("autherization"))
        ) ? (
          <Outlet />
        ) : (
          <Navigate to="/Forbiden" />
        )
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RequireAuth;
