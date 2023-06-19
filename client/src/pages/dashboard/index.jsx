import Axios from "axios";
import "./index.css";
import { useState } from "react";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Payment from "./paymentPage";
import Welcome from "./Welcome";
const Dashboard = () => {
  const [ask, setAsk] = useState([]);
  const [access, setAccess] = useState([]);
  const [theme, colorMode] = useMode();
  const ID = sessionStorage.getItem("ID");

  Axios.get(`http://localhost:3001/getUserInfo?ID=${ID}`).then((response) => {
    setAccess(response.data);
    if (access[0]?.Access_Level === "User") {
      setAsk(response.data);
    }
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
                {ask.length > 0 ? <Payment /> : <Welcome />}
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
