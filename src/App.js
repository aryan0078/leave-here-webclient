import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./pages/Loading";
import "./App.css";
import Login from "./pages/Login";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
export default function App() {
  return (
    <Router>
      <NotificationContainer></NotificationContainer>
      <Switch>
        <Route exact path="/">
          <Loading></Loading>
        </Route>
        <Route exact path="/home">
          <Home></Home>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/note/:id" component={Notes} />
      </Switch>
    </Router>
  );
}
