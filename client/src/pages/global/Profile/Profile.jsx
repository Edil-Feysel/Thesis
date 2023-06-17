import { useEffect, useState } from "react";
import "./Profile.css";
// import "react-multi-carousel/lib/styles.css";
import Axios from "axios";
import Logout from "../Logout/Logout";
import Topbar from "../Topbar";
import { MyProSidebarProvider } from "../sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import { FaInstagram } from "react-icons/fa";
// import { IconButton } from "@mui/material";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Profile = () => {
  const [theme, colorMode] = useMode();
  const [profile, setProfile] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const ID = sessionStorage.getItem("ID");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  useEffect(
    (e) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      try {
        Axios.post(`http://localhost:3001/profilePhoto?ID=${ID}`, formData);
      } catch (err) {
        console.log(err);
      }
    },
    [file, fileName]
  );

  Axios.get(`http://localhost:3001/profile?ID=${ID}`).then((res) => {
    setProfile(res.data);
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <div className="profile-countainer">
                <div className="info-countainer">
                  <div className="image">
                    <img src={profile[0]?.Picture} alt="" />
                    <div className="img_btn">
                      <label htmlFor="pic">
                        <FaInstagram className="profile-icon"></FaInstagram>
                      </label>
                      <input
                        className="input_file"
                        id="pic"
                        name="pic"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={saveFile}
                      />
                    </div>
                    {/* <IconButton>
                      <SettingsOutlinedIcon />
                    </IconButton> */}
                  </div>
                  <div className="user_countainer">
                    <div className="user_name">
                      <p>Systems {profile[0]?.Access_Level} User</p>
                    </div>
                    <div className="user-info">
                      <p>Name</p>
                      <p>{profile[0]?.Name}</p>
                    </div>
                    <div className="user-info">
                      <p>User Name</p>
                      <p>{profile[0]?.UserName}</p>
                    </div>
                    <div className="user-info">
                      <p>Phone_No</p>
                      <p>{profile[0]?.Phone_No}</p>
                    </div>
                    <div className="user-info">
                      <p>Access Level</p>
                      <p>{profile[0]?.Access_Level}</p>
                    </div>
                    <div className="user-info">
                      <p>Registration Date</p>
                      <p>{profile[0]?.Registration_Date}</p>
                    </div>
                    <div className="logout-div">
                      <Logout />
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Profile;
