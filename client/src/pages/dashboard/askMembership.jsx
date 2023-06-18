import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const AskAdmin = () => {
  const [family, setFamily] = useState("");
  const [Kebele, setKebele] = useState("");
  const [occation, setOccation] = useState("");
  const [applicant, setApplicant] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [spouseBod, setSpouseBod] = useState("");
  const [applicantBod, setApplicantBod] = useState("");
  const [children, setChildren] = useState("");
  const [eContactName, setEcontactName] = useState("");
  const [ePhone, setEphone] = useState("");

  const [theme, colorMode] = useMode();

  const navigate = useNavigate();

  const askMembership = () => {
    Axios.post("http://localhost:3001/askMembership", {
      family: family,
      id: sessionStorage.getItem("ID"),
      Kebele: Kebele,
      occupation: occation,
      applicant: applicant,
      spouseName: spouseName,
      spouseBod: spouseBod,
      applicantBod: applicantBod,
      children: children,
      eContactName: eContactName,
      ePhone: ePhone,
    });
    setFamily("");
    setKebele("");
    setOccation("");
    setApplicant("");
    setSpouseName("");
    setSpouseBod("");
    setApplicantBod("");
    setChildren("");
    setEcontactName("");
    setEphone("");
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
                <Box
                  component="form"
                  onSubmit={askMembership}
                  sx={{ mt: 3, width: "100%" }}
                >
                  <Typography variant="h5" gutterBottom>
                    Ask Membership
                  </Typography>
                  <TextField
                    id="app"
                    label="Applicant Name"
                    fullWidth
                    required
                    value={applicant}
                    onChange={(e) => setApplicant(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="bapp"
                    label="Birth date of applicant in the form of 0000-00-00"
                    fullWidth
                    required
                    value={applicantBod}
                    onChange={(e) => setApplicantBod(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="family"
                    label="How many family members do you have?"
                    fullWidth
                    required
                    value={family}
                    onChange={(e) => setFamily(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="kebele"
                    label="Kebele"
                    fullWidth
                    required
                    value={Kebele}
                    onChange={(e) => setKebele(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="occ"
                    label="Occupation"
                    fullWidth
                    required
                    value={occation}
                    onChange={(e) => setOccation(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="sname"
                    label="Spouse Name"
                    fullWidth
                    value={spouseName}
                    onChange={(e) => setSpouseName(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="sbod"
                    label="Birth Date of your spouse in the form of 0000-00-00"
                    fullWidth
                    value={spouseBod}
                    onChange={(e) => setSpouseBod(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="child"
                    label="Number of children under 18"
                    fullWidth
                    required
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="econtact"
                    label="Emergency contact person"
                    fullWidth
                    required
                    value={eContactName}
                    onChange={(e) => setEcontactName(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="ephone"
                    label="Emergency contact person phone number"
                    fullWidth
                    required
                    value={ePhone}
                    onChange={(e) => setEphone(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => navigate("/dashboard")}
                        sx={{ mr: 2 }}
                      >
                        Back to home
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AskAdmin;
