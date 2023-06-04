import Axios from "axios";
import { useState } from "react";
import "./Notification.css";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

const Notification = () => {
  const [theme, colorMode] = useMode();
  const [res, setRes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  Axios.get("http://localhost:3001/askNotification").then((res) => {
    setRes(res.data);
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
                <div
                  className={`notification-container ${
                    darkMode ? "dark-mode" : ""
                  }`}
                >
                  {res.length > 0 ? (
                    <h1
                      className={`notification-text ${
                        darkMode ? "dark-mode" : "light-mode"
                      }`}
                    >
                      no
                    </h1>
                  ) : (
                    <h1
                      className={`notification-text ${
                        darkMode ? "dark-mode" : "light-mode"
                      }`}
                    >
                      Dear ms, you have to pay this months monthly payment
                    </h1>
                  )}
                </div>
              </div>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Notification;
