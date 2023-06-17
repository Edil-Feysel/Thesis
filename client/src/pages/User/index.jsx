import React, { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

const User = () => {
  const [theme, colorMode] = useMode();
  const [General, setGeneral] = useState(false);
  const [Security, setSecurity] = useState(false);

  const handleSecurity = () => {
    setGeneral(false);
    setSecurity(!Security);
  };

  const handleGeneral = () => {
    setGeneral(!General);
    setSecurity(false);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
    oldEmail: "",
    oldPassword: "",
    newEmail: "",
    newPassword: "",
    confirmEmail: "",
    confirmPassword: "",
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email!").required("Required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid!")
      .required("Required"),
    address1: yup.string().required("Required"),
    address2: yup.string().required("Required"),
    oldEmail: yup.string().email("Invalid email!").required("Required"),
    oldPassword: yup.string().required("Required"),
    newEmail: yup.string().email("Invalid email!").required("Required"),
    newPassword: yup.string().required("Required"),
    confirmEmail: yup
      .string()
      .email("Invalid email!")
      .oneOf([yup.ref("newEmail")], "Emails must match")
      .required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match").required("Required"),
  });

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
                      General
                    </button>
                    <button className="setting-btn" onClick={handleSecurity}>
                      Security
                    </button>
                  </div>
                </div>
                <div className="setting-content">
                  {General && (
                    <Formik
                      initialValues={initialValues}
                      validationSchema={checkoutSchema}
                      onSubmit={handleFormSubmit}
                    >
                      {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Field
                                as={TextField}
                                name="firstName"
                                label="First Name"
                                fullWidth
                              />
                              <ErrorMessage name="firstName" component="div" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                as={TextField}
                                name="lastName"
                                label="Last Name"
                                fullWidth
                              />
                              <ErrorMessage name="lastName" component="div" />
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                as={TextField}
                                name="email"
                                label="Email"
                                fullWidth
                              />
                              <ErrorMessage name="email" component="div" />
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                as={TextField}
                                name="contact"
                                label="Contact"
                                fullWidth
                              />
                              <ErrorMessage name="contact" component="div" />
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                as={TextField}
                                name="address1"
                                label="Address 1"
                                fullWidth
                              />
                              <ErrorMessage name="address1" component="div" />
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                as={TextField}
                                name="address2"
                                label="Address 2"
                                fullWidth
                              />
                              <ErrorMessage name="address2" component="div" />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                              >
                                Submit
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      )}
                    </Formik>
                  )}
                  {Security && (
                    
                     
                       <Formik
                      initialValues={initialValues}
                      validationSchema={checkoutSchema}
                      onSubmit={handleFormSubmit}
                    >
                      {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                          {/* Security form fields */}
                          <Grid container spacing={2}>
                           
                            <Grid item xs={12}>
                              <Field
                                as={TextField}
                                name="oldPassword"
                                label="Old Password"
                                fullWidth
                              />
                              <ErrorMessage
                                name="oldPassword"
                                component="div"
                              />
                            </Grid>
                          
                            <Grid item xs={12}>
                              <Field
                                as={TextField}
                                name="newPassword"
                                label="New Password"
                                fullWidth
                              />
                              <ErrorMessage
                                name="newPassword"
                                component="div"
                              />
                            </Grid>
                        
                            <Grid item xs={12}>
                              <Field
                                as={TextField}
                                name="confirmPassword"
                                label="Confirm Password"
                                fullWidth
                              />
                              <ErrorMessage
                                name="confirmPassword"
                                component="div"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                              >
                                Submit
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      )}
                    </Formik>
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

export default User;
