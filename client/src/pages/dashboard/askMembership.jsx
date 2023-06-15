import Axios from "axios";
import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

const AskAdmin = () => {
  const [family, setFamily] = useState("");
  const [theme, colorMode] = useMode();

  const navigate = useNavigate();

  const askMembership = () => {
    Axios.post("http://localhost:3001/askMembership", {
      family: family,
      id: sessionStorage.getItem("ID"),
    });
    navigate("/dashboard");
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <div className="container">
                <form className="form" onSubmit={askMembership}>
                  <label htmlFor="family" className="label">
                    How many family members do you have?
                  </label>
                  <input
                    id="family"
                    className="input"
                    placeholder="Family size"
                    onChange={(e) => {
                      setFamily(e.target.value);
                    }}
                  />
                  <button type="submit" className="button">
                    Ask the admin
                  </button>
                </form>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className="button"
                >
                  Back to home
                </button>
              </div>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AskAdmin;
