import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router";

export default function Loading() {
  const [logged, setlogged] = useState(null);
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      setlogged(true);
    } else {
      setlogged(false);
    }
  });
  if (logged) {
    return <Redirect to="/"></Redirect>;
  }
  if (!logged) {
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <div className="loading">
      <CircularProgress color="grey" size={50}></CircularProgress>
    </div>
  );
}
