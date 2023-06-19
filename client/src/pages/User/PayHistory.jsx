import Axios from "axios";
import { useRef, useState } from "react";
import "./index.css";
import { useReactToPrint } from "react-to-print";

const PayHistory = () => {
  const [payHis, setPayHis] = useState([]);
  const componentRef = useRef();
  const ID = sessionStorage.getItem("ID");

  Axios.get(`http://localhost:3001/payHistory?ID=${ID}`).then((res) => {
    setPayHis(res.data);
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Payment History",
    pageStyle: "print",
  });

  return (
    <div>
      <div className="print">
        <button onClick={handlePrint}>Print</button>
      </div>
      <div ref={componentRef}>
        <div className="pay-header">
          <div>
            <h3>ID</h3>
          </div>
          <div>
            <h3>Amount(Birr)</h3>
          </div>
          <div>
            <h3>Date</h3>
          </div>
        </div>
        <div className="pay-container">
          {payHis?.map((data) => (
            <div className="pay-column">
              <div>{data.ID}</div>
              <div>{data.MonthlyPayAmount}</div>
              <div>{data.PaymentDate}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayHistory;
