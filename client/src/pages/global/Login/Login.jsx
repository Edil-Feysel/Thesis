import React, { useRef, useState } from "react";
import * as Components from "./Components";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Axios from "axios";
Axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const [signIn, toggle] = useState(true);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [nm, setNm] = useState(false);
  const [usr, setUsr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const userRef = useRef();
  const passRef = useRef();

  const signup = async (e) => {
    e.preventDefault();
    try {
      setPassErr(false);
      setUsr(false);
      setNm(false);
      if (pass === confirmPass) {
        if (name === "") {
          setNm(true);
        } else if (userName === "") {
          setUsr(true);
        } else {
          Axios.post("http://localhost:3001/signUp", {
            Name: name,
            UserName: userName,
            password: pass,
            PhoneNo: phoneNo,
          });
          setName("");
          setUserName("");
          setPass("");
          setPhoneNo("");
          navigate("/");
        }
      } else {
        setPassErr(true);
        setConfirmPass("");
        setPass("");
      }
    } catch (err) {
      throw err;
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const responce = await Axios.post("http://localhost:3001/login", {
        user: user,
        password: password,
      });
      if (responce.data.passERR) {
        passRef.current.style.borderColor = "red";
        setPassError(responce.data.passERR);
      } else if (responce.data.userERR) {
        userRef.current.style.borderColor = "red";
        setUserError(responce.data.userERR);
      } else {
        sessionStorage.setItem(
          "autenthicate",
          JSON.stringify(responce.data[0].Name)
        );
        sessionStorage.setItem(
          "autherization",
          JSON.stringify(responce.data[0].Access_Level)
        );
        sessionStorage.setItem("ID", JSON.stringify(responce.data[0].ID));
        setUser("");
        setPassword("");
        navigate("/dashboard");
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="whole">
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form action="#!" onSubmit={signup}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <span style={{ color: "red" }}>
              {nm ? "The Name is empity" : ""}
            </span>
            <Components.Input
              type="text"
              placeholder="User Name"
              name="userName"
              id="userName"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <span style={{ color: "red" }}>
              {usr ? "The User Name is empity" : ""}
            </span>
            <Components.Input
              type="password"
              placeholder="Password"
              name="pass"
              id="pass"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <span style={{ color: "red" }}>
              {passErr ? "The password is not the same" : ""}
            </span>
            <Components.Input
              type="password"
              placeholder="Confirm Password"
              name="confirmPass"
              id="confirmPass"
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
            <span style={{ color: "red" }}>
              {passErr ? "The password is not the same" : ""}
            </span>
            <Components.Input
              type="tel"
              placeholder="Phone Number"
              name="phoneNo"
              id="phoneNo"
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
            />

            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form action="#!" onSubmit={login}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="text"
              ref={userRef}
              name="user"
              id="user"
              placeholder="User Name"
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
            <span style={{ color: "red" }}>{userError ? userError : ""}</span>
            <Components.Input
              type="password"
              ref={passRef}
              placeholder="Password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span style={{ color: "red" }}>{passError ? passError : ""}</span>

            <Components.Button>Sigin In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with Eder please login to your personal
                Account
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Welcome To Eder!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sigin Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default Login;
