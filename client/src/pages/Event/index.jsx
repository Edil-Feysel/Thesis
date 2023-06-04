import { useState } from "react";
import "./App.css";
import "react-multi-carousel/lib/styles.css";
import Axios from "axios";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
const Event = () => {
  const [events, setEvents] = useState([]);
  const [theme, colorMode] = useMode();

  Axios.get("http://localhost:3001/events").then((response) => {
    setEvents(response.data);
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <div className="App">
                <h1>Events</h1>
                <div className="event-card">
                  {events.map((data) => (
                    <div className="card">
                      <div className="card-pic">
                        <img
                          src={data.Img}
                          alt="No Pic"
                          className="card-pic"
                        ></img>
                      </div>
                      <div className="card-name">{data.EventName}</div>
                      <div className="card-desc">{data.Description}</div>
                    </div>
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

export default Event;
