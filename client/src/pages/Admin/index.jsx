// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./index.css";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Sevent from "./Sevent";

const Admin = () => {
  const [theme, colorMode] = useMode();
  const [General, setGeneral] = useState(true);
  const [Security, setSecurity] = useState(false);
  const [History, setHistory] = useState(false);
  const [futEvents, setFutEvent] = useState([]);
  const navigate = useNavigate();
  const [request, setResquest] = useState([]);

  Axios.get("http://localhost:3001/newRequest").then((response) => {
    setResquest(response.data);
  });

  Axios.get("http://localhost:3001/futureEvents").then((response) => {
    setFutEvent(response.data);
  });

  const handleSecurity = () => {
    setHistory(false);
    setGeneral(false);
    setSecurity(true);
  };

  const handleGeneral = () => {
    setSecurity(false);
    setHistory(false);
    setGeneral(true);
  };

  const handleHistory = () => {
    setGeneral(false);
    setSecurity(false);
    setHistory(true);
    // axios.get(`http://localhost:3001/historyPay?ID=${ID}`);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <div className="setting-container">
                <div className="setting-header">
                  <div className="header-list">
                    <button className="setting-btn" onClick={handleGeneral}>
                      Membership request
                    </button>
                    <button className="setting-btn" onClick={handleSecurity}>
                      Add Schedule
                    </button>
                    {/* <button className="setting-btn" onClick={handleSecurity}>
                    Add Schedule
                  </button> */}
                    <button className="setting-btn" onClick={handleHistory}>
                      Remove Member
                    </button>
                  </div>
                </div>
                <div className="setting-content">
                  {General &&
                    (request.length > 0 ? (
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
                            New membership request from{" "}
                            <span className="name">
                              {request[index].Applicant}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <h3>there is no request</h3>
                    ))}
                  {Security &&
                    (futEvents.length > 0 ? (
                      <Sevent />
                    ) : (
                      "There is No Future Event, therefore you can't shedule without Event"
                    ))}
                </div>
              </div>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Admin;
