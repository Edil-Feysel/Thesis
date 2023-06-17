import Axios from "axios";
import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

const Dashboard = () => {
  const [ask, setAsk] = useState([]);
  const [askedBefore, setAsked] = useState([]);
  const [access, setAccess] = useState([]);
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();
  const ID = sessionStorage.getItem("ID");

  Axios.get(`http://localhost:3001/getUserInfo?ID=${ID}`).then((response) => {
    setAccess(response.data);
    if (access[0]?.Access_Level === "User") {
      setAsk(response.data);
    }
  });

  Axios.get(`http://localhost:3001/askedBefore?ID=${ID}`).then((response) => {
    setAsked(response.data);
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
                {ask.length > 0 ? (
                  askedBefore.length > 0 ? (
                    <div>
                      <h3>
                        Dear{" "}
                        {JSON.parse(sessionStorage.getItem("autenthicate"))},{" "}
                        your membership request is on process
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
                        Ask
                      </button>
                    </div>
                  )
                ) : (
                  <div>
                    <h2>
                      Wellcome Back Dear{" "}
                      {JSON.parse(sessionStorage.getItem("autenthicate"))}
                    </h2>
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
