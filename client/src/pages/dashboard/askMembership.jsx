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
      occation: occation,
      applicant: applicant,
      spouseName: spouseName,
      spouseBod: spouseBod,
      applicantBod: applicantBod,
      children: children,
      eContactName: eContactName,
      ePhone: ePhone,
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
                  <label htmlFor="app" className="label">
                    Applicant Name
                  </label>
                  <input
                    id="app"
                    className="input"
                    placeholder="Applicant Name"
                    onChange={(e) => {
                      setApplicant(e.target.value);
                    }}
                  />
                  <label htmlFor="bapp" className="label">
                    Birth date of applicant
                  </label>
                  <input
                    id="bapp"
                    className="input"
                    placeholder="Birth date of Applicant"
                    onChange={(e) => {
                      setApplicantBod(e.target.value);
                    }}
                  />
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
                  <label htmlFor="kebele" className="label">
                    Kebele
                  </label>
                  <input
                    id="kebele"
                    className="input"
                    placeholder="Kebele"
                    onChange={(e) => {
                      setKebele(e.target.value);
                    }}
                  />
                  <label htmlFor="occ" className="label">
                    Occation
                  </label>
                  <input
                    id="occ"
                    className="input"
                    placeholder="Occation"
                    onChange={(e) => {
                      setOccation(e.target.value);
                    }}
                  />
                  <label htmlFor="sname" className="label">
                    Spouse Name
                  </label>
                  <input
                    id="sname"
                    className="input"
                    placeholder="Spouse Name"
                    onChange={(e) => {
                      setSpouseName(e.target.value);
                    }}
                  />
                  <label htmlFor="sbod" className="label">
                    Birth Date of your spouse
                  </label>
                  <input
                    id="sbod"
                    className="input"
                    placeholder="Spouse birth date"
                    onChange={(e) => {
                      setSpouseBod(e.target.value);
                    }}
                  />
                  <label htmlFor="child" className="label">
                    Number of children under 18
                  </label>
                  <input
                    id="child"
                    className="input"
                    placeholder="Child only under 18"
                    onChange={(e) => {
                      setChildren(e.target.value);
                    }}
                  />
                  <label htmlFor="econtact" className="label">
                    Emergency contact person
                  </label>
                  <input
                    id="econtact"
                    className="input"
                    placeholder="Emergency contact name"
                    onChange={(e) => {
                      setEcontactName(e.target.value);
                    }}
                  />
                  <label htmlFor="ephone" className="label">
                    Emergency contact person phone number
                  </label>
                  <input
                    id="ephone"
                    className="input"
                    placeholder="Emergency contact"
                    onChange={(e) => {
                      setEphone(e.target.value);
                    }}
                  />
                  <button type="submit" className="button">
                    Submit
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
