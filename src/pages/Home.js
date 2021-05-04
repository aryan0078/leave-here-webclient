import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { getNotes } from "../apis/index";
export default function Home() {
  const [len_important, setlen_important] = useState(0);
  const [len_notes, setlen_notes] = useState(0);
  const [selected, setselected] = useState("recent");
  const [update, setupdate] = useState(0);
  const [id, setid] = useState(false);
  const [loading, setloading] = useState(true);
  const [notes, setnotes] = useState([
    {
      title: "Buy tickets",
      uid: "efqef",
      content: "Buy tickets and call ayush",
      time: "8:46",
    },
  ]);
  const getnotes = async () => {
    let userid = JSON.parse(localStorage.getItem("user"));
    let notes = await getNotes(userid.uid);
    let _ = await notes.json();
    setnotes(_.notes);
    setlen_notes(_.notes.length);
    setloading(false);
  };
  useEffect(async () => {
    setupdate(1);
    await getnotes();
    setloading(false);
    setInterval(async () => {
      await getnotes();
      setloading(false);
    }, 5000);
  }, [update]);

  if (!localStorage.getItem("user")) {
    return <Redirect to="/login"></Redirect>;
  }
  if (id) {
    return <Redirect to={"/note/" + id}></Redirect>;
  }
  if (loading) {
    return (
      <div className="notes">
        <CircularProgress color="grey"></CircularProgress>
      </div>
    );
  }
  return (
    <div className="home">
      <div className="home-card">
        <div className="top-section">
          <img src="http://pm1.narvii.com/7119/b0abdf491cffde4bdf95850956c1b15a5591a4b5r1-712-707v2_uhq.jpg"></img>
          <p>{JSON.parse(localStorage.getItem("user")).name}</p>
        </div>
        <div className="card-container">
          <div className="notes-card">
            <p>Notes</p>
            <p style={{ fontSize: "x-large" }}>{len_notes}</p>
          </div>
          <div className="important-card">
            <p>Important</p>
            <p style={{ fontSize: "x-large" }}>{len_important}</p>
          </div>
        </div>

        <div className="slider">
          <div
            className={
              selected == "recent" ? "item-selected" : "item-not-selected"
            }
            onClick={() => setselected("recent")}
          >
            <p>Recent</p>
          </div>
          <div
            className={
              selected == "yours" ? "item-selected" : "item-not-selected"
            }
            onClick={() => setselected("yours")}
          >
            <p>Your's</p>
          </div>
          <div
            className={
              selected == "important" ? "item-selected" : "item-not-selected"
            }
            onClick={() => setselected("important")}
          >
            <p>Important</p>
          </div>

          <div
            className={
              selected == "invited" ? "item-selected" : "item-not-selected"
            }
            onClick={() => setselected("invited")}
          >
            <p>Invited</p>
          </div>

          <div
            className={
              selected == "notes" ? "item-selected" : "item-not-selected"
            }
            onClick={() => setselected("notes")}
          >
            <p>Notes</p>
          </div>
        </div>
        <div className="scroll-view">
          <div className="inner-scroll">
            {notes.map((note) => (
              <div className="notes-container" onClick={() => setid(note.uid)}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <p>{note.title}</p>
                  <p style={{ fontSize: "small", color: "grey" }}>
                    {note.time}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "small",
                    marginTop: "15px",
                    fontWeight: "500",
                  }}
                >
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
