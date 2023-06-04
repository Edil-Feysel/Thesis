import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

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
      id: data.ID,
      FamilySize: data.FamilySize,
      userId: data.UserId,
      group: group,
      access: access,
      pay: pay,
    });
  };

  //  console.log(typeof data.FamilySize);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <div>
                <form action="" onSubmit={addNewMember}>
                  <label htmlFor="group">Choose a Group</label>
                  <select
                    id="group"
                    name="group"
                    onChange={(e) => {
                      setGroup(e.target.value);
                    }}
                  >
                    <option value="Group A">Group A</option>
                    <option value="Group B">Group B</option>
                    <option value="Group C">Group C</option>
                    <option value="Group D">Group D</option>
                  </select>
                  <label htmlFor="access">Access Level</label>
                  <select
                    id="access"
                    name="access"
                    onChange={(e) => {
                      setAccess(e.target.value);
                    }}
                  >
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <label htmlFor="pay">Membership Payment Amount</label>
                  <input
                    id="pay"
                    type="text"
                    onChange={(e) => {
                      setPay(e.target.value);
                    }}
                  ></input>
                  <button type="submit">Submit</button>
                </form>
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </button>
              </div>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default MembershipForm;
