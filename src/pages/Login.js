import React, { useState } from "react";
import { CircularProgress, InputLabel } from "@material-ui/core";
import { loginApi } from "../apis/index";
import { NotificationManager } from "react-notifications";
import { Redirect } from "react-router";
export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState(false);
  const [loading, setloading] = useState(false);
  const login = async () => {
    setloading(true);
    let res = await loginApi(email, password);
    let _ = await res.json();
    if (_.success) {
      setloading(false);
      NotificationManager.success(_.msg, "Login Done!");
      localStorage.setItem("user", JSON.stringify(_.payload));
      setredirect(true);
    }
    if (!_.success) {
      setloading(false);
      NotificationManager.error(_.msg, "Login failed!");
    }
  };

  if (redirect) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="login">
      <div className="login-card">
        <p>Login</p>
        <div className="form">
          <p>Email</p>
          <input
            onChange={(e) => setemail(e.target.value)}
            className="inputs"
            placeholder="Enter Email"
          ></input>
          <p>Password</p>
          <input
            onChange={(e) => setpassword(e.target.value)}
            className="inputs"
            placeholder="Enter Password"
          ></input>
          <button onClick={login}>
            {!loading ? (
              "Login"
            ) : (
              <CircularProgress color="grey"></CircularProgress>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
