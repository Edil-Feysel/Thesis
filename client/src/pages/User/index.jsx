// import React, { useState } from "react";
// // import { Box, Button, TextField } from "@mui/material";
// // import { Formik } from "formik";
// // import * as yup from "yup";
// // import { useMediaQuery } from "@mui/material";
// // import Header from "../../components/Header";
// import Topbar from "../global/Topbar";
// import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "../../theme";

// const User = () => {
//   const [theme, colorMode] = useMode();
//   const [General, setGeneral] = useState(false);
//   const [Securit, setSecurit] = useState(false);
//   const [Defualt, setDfualt] = useState(true);
//   const HandleSecurity = () => {
//     setDfualt(false);
//     setGeneral(false);
//     setSecurit(!Securit);
//   };
//   const HandleGeneral = () => {
//     setGeneral(!General);
//     setSecurit(false);
//   };

//   // const isNonMobile = useMediaQuery("(min-width:600px)");
//   // const phoneRegExp =
//   //   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
//   // const handleFormSubmit = (values) => {
//   //   console.log(values);
//   // };
//   // const initialValues = {
//   //   firstName: "",
//   //   lastName: "",
//   //   email: "",
//   //   contact: "",
//   //   address1: "",
//   //   address2: "",
//   // };
//   // const checkoutSchema = yup.object().shape({
//   //   firstName: yup.string().required("Required"),
//   //   lastName: yup.string().required("Required"),
//   //   email: yup.string().email("Invalid email!").required("Required"),
//   //   contact: yup
//   //     .string()
//   //     .matches(phoneRegExp, "phone number is not valid!")
//   //     .required("Required"),
//   //   address1: yup.string().required("Required"),
//   //   address2: yup.string().required("Required"),
//   // });

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <MyProSidebarProvider>
//           <div style={{ height: "100%", width: "100%" }}>
//             <main>
//               <Topbar />

//               <div className="setting-countainer">
//                 <div className="setting-header">
//                   <div className="header-list">
//                     <div className="header-text">Setting</div>
//                     <button className="setting-btn" onClick={HandleGeneral}>
//                       General
//                     </button>
//                     <button className="setting-btn" onClick={HandleSecurity}>
//                       Securit
//                     </button>
//                   </div>
//                 </div>
//                 <div className={`setting-countent ${Defualt ? "Defualt" : ""}`}>
//                   <div className={`General ${General ? "Show" : ""}`}>
//                     <div className="Form-Control">
//                       <div className="input-control">
//                         <label htmlFor="Model">First Name</label>
//                         <input
//                           type="text"
//                           name="FirstName"

//                         />
//                       </div>
//                       <div className="input-control">
//                         <label htmlFor="Model">Middle Name</label>
//                         <input
//                           type="text"
//                           name="MidleName"

//                         />
//                       </div>
//                       <div className="input-control">
//                         <label htmlFor="Model">Last Name</label>
//                         <input
//                           type="text"
//                           name="LastName"

//                         />
//                       </div>
//                     </div>
//                     <div className="Form-Control">
//                       <div className="input-control">
//                         <label htmlFor="Model">Address</label>
//                         <input
//                           type="text"
//                           name="PhoneNumber"

//                         />
//                       </div>
//                     </div>
//                     <div className="Form-Control">
//                       <div className="input-control">
//                         <label htmlFor="Model">Phone</label>
//                         <input
//                           type="text"
//                           name="Address"

//                         />
//                       </div>
//                     </div>
//                     <button>submit</button>
//                   </div>
//                   <div className={`Security ${Securit ? "display" : ""}`}>
//                     <div className="Form-Control">
//                       <div className="input-control">
//                         <label htmlFor="Model">Old Email</label>
//                         <input type="text" placeholder="Enter Old Email" />
//                       </div>
//                       <div className="input-control">
//                         <label htmlFor="Model">Old Password</label>
//                         <input type="text" placeholder="Enter Old Password" />
//                       </div>
//                     </div>
//                     <div className="Form-Control">
//                       <div className="input-control">
//                         <label htmlFor="Model">New Email</label>
//                         <input type="text" placeholder="Enter New Email" />
//                       </div>
//                       <div className="input-control">
//                         <label htmlFor="Model">Old Password</label>
//                         <input type="text" placeholder="Enter New Password" />
//                       </div>
//                     </div>
//                     <div className="Form-Control">
//                       <div className="input-control">
//                         <label htmlFor="Model">Confirm Email</label>
//                         <input type="text" placeholder="Confirm New Email" />
//                       </div>
//                       <div className="input-control">
//                         <label htmlFor="Model">Confirm Password</label>
//                         <input type="text" placeholder="Confirm New Password" />
//                       </div>
//                     </div>
//                     <button>Submit</button>
//                   </div>
//                 </div>
//               </div>
//             </main>
//           </div>
//         </MyProSidebarProvider>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };

// export default User;
import React, { useState } from "react";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

const User = () => {
  const [theme, colorMode] = useMode();
  const [general, setGeneral] = useState(false);
  const [security, setSecurity] = useState(false);

  const handleSecurity = () => {
    setGeneral(false);
    setSecurity(!security);
  };

  const handleGeneral = () => {
    setSecurity(false);
    setGeneral(!general);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission
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
                    <div className="header-text">Settings</div>
                    <button className="setting-btn" onClick={handleGeneral}>
                      General
                    </button>
                    <button className="setting-btn" onClick={handleSecurity}>
                      Security
                    </button>
                  </div>
                </div>
                <form className="setting-content" onSubmit={handleSubmit}>
                  <div className={`general ${general ? "show" : ""}`}>
                    <h2>General Settings</h2>
                    <div className="form-control">
                      <label htmlFor="first-name">First Name</label>
                      <input type="text" id="first-name" name="first-name" />
                    </div>
                    <div className="form-control">
                      <label htmlFor="middle-name">Middle Name</label>
                      <input type="text" id="middle-name" name="middle-name" />
                    </div>
                    <div className="form-control">
                      <label htmlFor="last-name">Last Name</label>
                      <input type="text" id="last-name" name="last-name" />
                    </div>
                    <div className="form-control">
                      <label htmlFor="address">Address</label>
                      <input type="text" id="address" name="address" />
                    </div>
                    <div className="form-control">
                      <label htmlFor="phone">Phone</label>
                      <input type="tel" id="phone" name="phone" />
                    </div>
                  </div>
                  <div className={`security ${security ? "show" : ""}`}>
                    <h2>Security Settings</h2>
                    <div className="form-control">
                      <label htmlFor="old-email">Old Email</label>
                      <input type="email" id="old-email" name="old-email" />
                    </div>
                    <div className="form-control">
                      <label htmlFor="old-password">Old Password</label>
                      <input
                        type="password"
                        id="old-password"
                        name="old-password"
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="new-email">New Email</label>
                      <input type="email" id="new-email" name="new-email" />
                    </div>
                    <div className="form-control">
                      <label htmlFor="new-password">New Password</label>
                      <input
                        type="password"
                        id="new-password"
                        name="new-password"
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="confirm-new-email">
                        Confirm New Email
                      </label>
                      <input
                        type="email"
                        id="confirm-new-email"
                        name="confirm-new-email"
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="confirm-new-password">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirm-new-password"
                        name="confirm-new-password"
                      />
                    </div>
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default User;
