import Axios from "axios";
import { useState } from "react";

const Payment = () => {
  const [payment, setPayment] = useState([]);
  const [pay, setPay] = useState("");
  const [appNm, setAppNm] = useState([]);
  const ID = sessionStorage.getItem("ID");
  Axios.get(`http://localhost:3001/askNotification?ID=${ID}`).then(
    (response) => {
      setPayment(response.data);
    }
  );
  const handlebooking = async (e) => {
    e.preventDefault();
    try {
      Axios.get(`http://localhost:3001/applicantName?ID=${ID}`)
        .then((res) => {
          setAppNm(res.data);
        })
        .then(() => {
          const data = {
            amount: pay,
            name: appNm[0],
          };
          //   Axios.post("http://localhost:3001/monPayment/", data)
          //     .then((response) => {
          //       window.open(response.data);
          //     })
          //     .catch((error) => {
          //       console.error(error);
          //     });
        });
    } catch (err) {
      throw err;
    }

    // console.log(pay);
  };
  return (
    <div>
      <div>
        {payment.length > 0 ? (
          <div>
            {" "}
            you have monthly payment due{" "}
            <div>
              <input
                id="pay"
                name="pay"
                type="number"
                onChange={(e) => setPay(e.target.value)}
              />
              <button onClick={handlebooking}>Click to Pay</button>
            </div>
          </div>
        ) : (
          <div>no due</div>
        )}
      </div>
    </div>
  );
};

export default Payment;
