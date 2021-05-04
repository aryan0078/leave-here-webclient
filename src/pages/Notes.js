import { CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import { getNote, updateNote } from "../apis/index";
export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateLoading: false,
      loading: true,
      noteId: this.props.match.params.id,
    };
  }
  async componentDidMount() {
    let note = await getNote(this.props.match.params.id);
    let _ = await note.json();
    let noteData = _.notes;
    let payload = { ...noteData, loading: false };
    if (_.success) {
      this.setState(payload);
    }
    if (!_.success) {
      NotificationManager.error("No notes found with this id", "Invalid Note");
      this.setState({ invalid: true, loading: false });
    }
    setInterval(() => {}, 5000);
  }
  updateNotes = async () => {
    this.setState({ updateLoading: true });
    let uid = JSON.parse(localStorage.getItem("user")).uid;
    let content = this.state.content;
    let note = await updateNote(this.props.match.params.id, uid, content);
    let _ = await note.json();
    if (_.success) {
      this.setState({ updateLoading: false });
      NotificationManager.success(_.msg, "Notes updated!");
    }
  };
  render() {
    if (this.state.loading) {
      return (
        <div className="notes">
          <CircularProgress color="grey"></CircularProgress>
        </div>
      );
    }
    if (this.state.invalid) {
      return (
        <div className="notes">
          <h2>No notes found with this id</h2>
          <h5>May be note is deleted</h5>
          <Link
            to="/home"
            style={{
              textDecoration: "none",
              fontSize: "small",
              fontWeight: "bold",
              color: "tomato",
            }}
          >
            <span>Go Home</span>
          </Link>
        </div>
      );
    }
    return (
      <div className="notes">
        <div className="note-container">
          <Link
            to="/home"
            style={{
              textDecoration: "none",
              fontSize: "small",
              fontWeight: "bold",
              color: "tomato",
            }}
          >
            <span>Go Home</span>
          </Link>
          <h4 style={{ fontSize: "large", alignSelf: "center" }}>
            {this.state.title}
          </h4>
          <textarea
            onChange={(e) => this.setState({ content: e.target.value })}
            className="note-input"
            value={this.state.content}
          ></textarea>
        </div>
        <button onClick={this.updateNotes}>
          {!this.state.updateLoading ? (
            "Save"
          ) : (
            <CircularProgress color="grey"></CircularProgress>
          )}
        </button>
      </div>
    );
  }
}
