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

const Admin = () => {
  const [theme, colorMode] = useMode();

  const navigate = useNavigate();
  const [request, setResquest] = useState([]);

  Axios.get("http://localhost:3001/newRequest").then((response) => {
    setResquest(response.data);
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
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
                      New membership request from{" "}
                      <span className="name">{request[index].Applicant}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <h3>there is no request</h3>
              )}
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Admin;
