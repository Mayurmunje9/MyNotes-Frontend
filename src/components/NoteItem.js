import React from "react";
import { useContext } from "react";
import NotesContext from "./context/notes/notesContext";

export default function NoteItem(props) {
  //Always have to write this while RECIVING the props
  //Here we are RECIVING the props from Notes.js
  const { note,updateNote } = props;

  const context = useContext(NotesContext);
const { delNote  } = context;

  if (!note || !note.title) {
    return <div>Error: Invalid note data</div>;
  }

  return (
    <div>
      <div>
        <div className="card-body d-inline-block" style={{ width: "10em" }}>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i

          // The reason you should avoid using onClick={delNote(note._id)} directly is that it would invoke the delNote function immediately when the component renders, not when the click event occurs. This is because the parentheses () after delNote(note._id) call the function right away.

          // Using an arrow function like onClick={() => delNote(note._id)} ensures that delNote is called only when the click event happens. The arrow function acts as a wrapper around delNote, delaying its execution until the click event occurs.writing onClick{Function()} then the J will wont interpreet it as a OnClick function


            className="fa-solid fa-trash my-3 "onClick={()=>{delNote(note._id)}}
          ></i>
          <i
            className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)}}
            style={{
              display: "inline-block",
              fontSize: "2rem",
              marginLeft: "2em",
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
