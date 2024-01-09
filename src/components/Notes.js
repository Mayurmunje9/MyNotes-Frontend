import React, { useEffect, useRef, useState } from "react";
import NotesItem from "./NoteItem";
import { useContext } from "react";
import NotesContext from "./context/notes/notesContext";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  //Jo jo cheze chahiye apko apke context se usko leke aao apne component me aur use use kro
  //This is the main advantage of context
  //You will always have to write this code whenever you have to use the the context
let tok=localStorage.getItem("token")
  const context = useContext(NotesContext);
  //Bringing The notes from context ie from notSetate.js file
  const { notes, getNotes, EditNote } = context;
  let history=useNavigate()
  useEffect(() => {
    if(localStorage.getItem.length!=0){

      getNotes();
    }
    else{
      history('/login')
    }
  }, []);

  const updateNote = (currNote) => {
    ref.current.click();

    setNote({
      id: currNote._id,
      etitle: currNote.title,
      edescription: currNote.description,
    });
    // ref.current.setShowModal(true);
    
  };

  const ref = useRef();
  const refClose = useRef();
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: " ",
    etag: "",
  });
  // const context = useContext(NotesContext);
  // const { addNote } = context;

  const handleClick = (e) => {
    EditNote(note.id, note.etitle, note.edescription);
    // addNote(note.title,note.description);
    e.preventDefault(); // Prevents the default form submission behavior
    refClose.current.click();
    // props.showAlert("updated Note","success")
  };
  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <AddNote  />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* //The Modal */}
            <div className="modal-body">
                 <div className="container">
                <h2>Enter your Note</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="etitle">Title </label>
                    <input
                      type="text"
                      value={note.etitle}
                      name="etitle"
                      className="form-control"
                      id="etitle"
                      aria-describedby="emailHelp"
                      placeholder="Enter title"
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edescription">description</label>
                    <input
                      value={note.edescription}
                      type="text"
                      name="edescription"
                      className="form-control"
                      id="edescription"
                      placeholder="description"
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {tok ?
      <div className="row col-md-4">
        {/* Taking every single note fron the list of notes and the rendering it   */}
        {notes.map((note) => (
          //Here im sending the whole note as a prop to NoteItem.js and then recivin there using
          // const { note } = props;
          <NotesItem key={note._id} note={note} updateNote={updateNote} />
        ))}
      </div>
      : " "}
    </>
  );
}
