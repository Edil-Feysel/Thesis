import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import "./index.css";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import axios from "axios";
import PayHistory from "./PayHistory";

const User = () => {
  const [theme, colorMode] = useMode();
  const [General, setGeneral] = useState(true);
  const [Security, setSecurity] = useState(false);
  const [History, setHistory] = useState(false);
  const [familySize, setFamilySize] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [spouseDOB, setSpouseDoB] = useState("");
  const [occupation, setOccupation] = useState("");
  const [childern, setChildren] = useState("");
  const [eContactN, setEcontactN] = useState("");
  const [ePhone, setEphone] = useState("");
  const [Opass, setOpass] = useState("");
  const [Npass, setNpass] = useState("");
  const [Cpass, setCpass] = useState("");
  const [Err, setErr] = useState(false);
  const [pErr, setPerr] = useState(false);
  const ID = sessionStorage.getItem("ID");

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
    axios.get(`http://localhost:3001/historyPay?ID=${ID}`);
  };

  const reset = () => {
    setFamilySize("");
    setSpouseName("");
    setSpouseDoB("");
    setOccupation("");
    setChildren("");
    setEcontactN("");
    setEphone("");
    setOpass("");
    setNpass("");
    setCpass("");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/updateUserInfo", {
      familySize: familySize,
      spouseName: spouseName,
      spouseDOB: spouseDOB,
      occupation: occupation,
      childern: childern,
      eContactN: eContactN,
      ePhone: ePhone,
      ID: ID,
    });
    setFamilySize("");
    setSpouseName("");
    setSpouseDoB("");
    setOccupation("");
    setChildren("");
    setEcontactN("");
    setEphone("");
  };

  const UpdatePassword = async (e) => {
    e.preventDefault();
    try {
      setErr(false);
      setPerr(false);
      if (Npass === Cpass) {
        const response = await axios.put("http://localhost:3001/updatepass", {
          ID: ID,
          NewPass: Npass,
          password: Opass,
          confPass: Cpass,
        });
        if (response.data.passErr) {
          setPerr(true);
        }
        setNpass("");
        setOpass("");
        setCpass("");
      } else {
        setErr(true);
      }
    } catch (err) {
      throw err;
    }
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
                      Update
                    </button>
                    <button className="setting-btn" onClick={handleSecurity}>
                      Change Password
                    </button>
                    <button className="setting-btn" onClick={handleHistory}>
                      Payment history
                    </button>
                  </div>
                </div>
                <div className="setting-content">
                  {General && (
                    <Box
                      component="form"
                      onSubmit={handleUpdate}
                      sx={{ mt: 3, width: "100%" }}
                    >
                      <Typography variant="h5" gutterBottom>
                        Update your personal information
                      </Typography>
                      <TextField
                        id="fsize"
                        name="fsize"
                        label="Total Family Size"
                        fullWidth
                        required
                        value={familySize}
                        onChange={(e) => setFamilySize(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        id="sname"
                        name="sname"
                        label="Spouse Name"
                        fullWidth
                        required
                        value={spouseName}
                        onChange={(e) => setSpouseName(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        id="bapp"
                        name="bapp"
                        label="Date of Birth of your spouse in the form of 0000-00-00"
                        fullWidth
                        required
                        value={spouseDOB}
                        onChange={(e) => setSpouseDoB(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        id="occupation"
                        name="occupation"
                        label="Occupation"
                        fullWidth
                        required
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        id="cno"
                        name="cno"
                        label="Number of Children under 18"
                        fullWidth
                        required
                        value={childern}
                        onChange={(e) => setChildren(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        id="sname"
                        name="sname"
                        label="Emergency contact person name"
                        fullWidth
                        value={eContactN}
                        onChange={(e) => setEcontactN(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        id="sbod"
                        name="sbod"
                        label="Emergency contact person phone number"
                        fullWidth
                        value={ePhone}
                        onChange={(e) => setEphone(e.target.value)}
                        sx={{ mb: 2 }}
                      />

                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Button
                            variant="contained"
                            onClick={reset}
                            sx={{ mr: 2 }}
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  {Security && (
                    <Box
                      component="form"
                      onSubmit={UpdatePassword}
                      sx={{ mt: 3, width: "100%" }}
                    >
                      <Typography variant="h5" gutterBottom>
                        Change your password
                      </Typography>
                      <TextField
                        id="Opass"
                        label="Old Password"
                        fullWidth
                        required
                        value={Opass}
                        type="password"
                        onChange={(e) => setOpass(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <span style={{ color: "red" }}>
                        {pErr ? "Wrong password" : ""}
                      </span>
                      <TextField
                        id="Npass"
                        label="New Password"
                        fullWidth
                        required
                        type="password"
                        value={Npass}
                        onChange={(e) => setNpass(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        id="cpass"
                        label="Confirm Password"
                        fullWidth
                        required
                        type="password"
                        value={Cpass}
                        onChange={(e) => setCpass(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <span style={{ color: "red" }}>
                        {Err ? "The password are not the same" : ""}
                      </span>

                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Button
                            variant="contained"
                            onClick={reset}
                            sx={{ mr: 2 }}
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  {History && <PayHistory />}
                </div>
              </div>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default User;
