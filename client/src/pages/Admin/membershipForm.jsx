import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import "./membershipform.css"; 
const MembershipForm = () => {
  const [theme, colorMode] = useMode();
  const [group, setGroup] = useState("");
  const [access, setAccess] = useState("");
  const [pay, setPay] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = state || {};

  const addNewMember = () => {
    Axios.post("http://localhost:3001/addNewMember", {
      id: data?.ID,
      FamilySize: data?.FamilySize,
      userId: data?.UserId,
      group: group,
      access: access,
      pay: pay,
    }).then(() => navigate("/admin"));
  };

  return (
    <center>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyProSidebarProvider>
            <div className="container">
              <Topbar />
              <main>
                <div className="form-container">
                  <h1>Membership Form</h1>
                  <form id="myForm" onSubmit={addNewMember}>
                    <div className="form-group">
                      <label htmlFor="group">Choose a Group</label>
                      <select
                        id="group"
                        name="group"
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                      >
                        <option value="">Select Group</option>
                        <option value="Group A">Group A</option>
                        <option value="Group B">Group B</option>
                        <option value="Group C">Group C</option>
                        <option value="Group D">Group D</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="access">Access Level</label>
                      <select
                        id="access"
                        name="access"
                        value={access}
                        onChange={(e) => setAccess(e.target.value)}
                      >
                        <option value="">Select Access Level</option>
                        <option value="Member">Member</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="pay">Membership Payment Amount</label>
                      <input
                        id="pay"
                        type="text"
                        value={pay}
                        onChange={(e) => setPay(e.target.value)}
                      />
                    </div>
                    <div className="button-group">
                      <button type="submit">Submit</button>
                      <button onClick={() => navigate("/admin")}>Back</button>
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </MyProSidebarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </center>
  );
};

export default MembershipForm;
