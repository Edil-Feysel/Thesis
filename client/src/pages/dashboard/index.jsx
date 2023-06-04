import Axios from "axios";
import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

const Dashboard = () => {
  const [ask, setAsk] = useState({});
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();

  Axios.get("http://localhost:3001/askbutton").then((response) => {
    setAsk(response.data);
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <div>
                {ask.length > 0 ? null : (
                  <div className="ask-membership">
                    <button
                      onClick={() => {
                        navigate("/askMembership", {
                          state: { id: 4 },
                        });
                      }}
                      className="btn-ask"
                    >
                      Ask Membership
                    </button>
                  </div>
                )}
                {/* <h1>{JSON.parse(sessionStorage.getItem("autenthicate"))}</h1>
                <h1>{JSON.parse(sessionStorage.getItem("ID"))}</h1>
                <h1>{JSON.parse(sessionStorage.getItem("autherization"))}</h1> */}
              </div>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Dashboard;
