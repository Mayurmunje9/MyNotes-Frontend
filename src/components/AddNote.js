import React, { useState, useEffect, useContext } from "react";
import NotesContext from "./context/notes/notesContext";
import Alert from "./Alert";

export default function AddNote() {
  const context = useContext(NotesContext);
  const { addNote, alert } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Fetch user details when the component mounts
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const user = await response.json();
      setUserName(user.name);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  const handleClick = (e) => {
    addNote(note.title, note.description);
    e.preventDefault();
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="container mt-3">
      {localStorage.getItem("token") === null && (
  <Alert alert={{ type: "danger", msg: "Login to Save your Notes" }} />
)}


        <Alert alert={alert} />
       <h4 style={{display:"inline-block"}}>Hello </h4> <h2 style={{display:"inline-block"}}> {userName}....  </h2><h4 style={{display:"inline-block"}}> Start Entering your Note</h4>

        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              rows="3"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              placeholder="Enter title"
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <textarea
              className="form-control"
              rows="4"
              columns="4"
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.title.length < 3 || note.description.length < 5}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
