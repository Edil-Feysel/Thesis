import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [askedBefore, setAsked] = useState([]);
  const [access, setAccess] = useState([]);

  const navigate = useNavigate();
  const ID = sessionStorage.getItem("ID");
  Axios.get(`http://localhost:3001/askedBefore?ID=${ID}`).then((response) => {
    setAsked(response.data);
  });
  Axios.get(`http://localhost:3001/getUserInfo?ID=${ID}`).then((response) => {
    setAccess(response.data);
  });
  const handlebooking = () => {
    const data = {
      amount: 3000,
      name: access[0]?.Name,
      phone_number: access[0]?.Phone_No,
    };
    Axios.post("http://localhost:3001/payment/", data)
      .then((response) => {
        window.open(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return askedBefore.length > 0 ? (
    <div>
      <h3>
        Dear {JSON.parse(sessionStorage.getItem("autenthicate"))}, your
        membership request is on process
        <button onClick={handlebooking}>Pay</button>
      </h3>
    </div>
  ) : (
    <div className="ask-membership">
      <button
        onClick={() => {
          navigate("/askMembership");
        }}
        className="btn-ask"
      >
        Ask Membership
      </button>
    </div>
  );
};
export default Payment;
