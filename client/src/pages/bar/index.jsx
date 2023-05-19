// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./index.css";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [request, setResquest] = useState([]);

  Axios.get("http://localhost:3001/newRequest").then((response) => {
    setResquest(response.data);
  });

  return (
    <>
      <div className="request-tab">New request for membership</div>

      {request.length > 0 ? (
        <div className="request-membership">
          {request.map((data, index) => (
            <button
              className="btn-request"
              onClick={() => {
                navigate("/membershipForm", {
                  state: { data: data },
                });
              }}
            >
              New membership request
            </button>
          ))}
        </div>
      ) : (
        <h3>there is no request</h3>
      )}
    </>
  );
};

export default Admin;
