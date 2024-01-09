// NoteState.js
import { useState } from "react";
import NotesContext from "./notesContext";

const host = "http://localhost:4000";
const NoteState = (props) => {
  //Initially Taking the notes array as emprt
  const [notes, setNotes] = useState([]);
  const [alert, setalert] = useState({msg:"",type:""})
  const showAlert = (message,type) => {
    setalert({
      msg: message,  // Corrected from "msg: 'set',"
      type: type
    });
    setTimeout(() => {
      setalert(null);
    }, 2000);
  };
  //GetNotes / Fetch all notes
  // ...

  // GetNotes / Fetch all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
        localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setNotes(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ...

  //Add Note
  const addNote = async (title, description, tag) => {
    console.log("adderd");
    //Do api call

    const response = await fetch(`${host}/api/notes/addnewnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();

    //Adding Append or Pussing this another note in the notes
    // and then setting it as notes using setNotes

    // setNotes(notes.concat(note));

    //Or
    // it will put the updated note at first
    showAlert("cuusess","success")
    // setalert({msg:"set",type:"success"})
    setNotes((prevNotes) =>[ ...prevNotes,note]);
    // showAlert(msg="set" ,type="success")
  };

  //Delete Note
  const delNote = async (id) => {
    console.log("deleting" + id);
    //api call
    try {
      const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
      });
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }

    const newNote = notes.filter((note) => note._id !== id);
    //I'll only keep the notes whose id's are not equal to the given id's
    setNotes(newNote);
  };

  //Edit Note
  const EditNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNote = await response.json();

      // Update the state with the modified note

      // prevNotes is implicitly provided by React's useState hook. When you use the functional form of setState, React passes the current state to your update function as the first argument.

      // The prevNotes parameter in the arrow function represents the current state (notes) at the time this update is being applied. It's a way of saying "the previous state of notes." You can name it anything you want; prevNotes is a common convention.It ensures that you are working with the most up-to-date state when making modifications.

      setNotes((prevNotes) => {
        return prevNotes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        );
      });

      // prevNotes is not a copy of the current note; it's a reference to the entire array of notes before the update. The use of prevNotes.map() ensures that you are creating a new array where only the specified note is updated, while the rest of the notes remain unchanged.THATS WHY IT IS UPDATING IN REAL TIME

      //You can also do it by
      // setNotes((prevNotes) => {
      //   return prevNotes.map((note) => {
      //     if (note._id === id) {
      //       return {
      //         title: note.title,
      //         description: note.description,
      //         tag: note.tag,
      //       };
      //     } else {
      //       return note;
      //     }
      //   });
      // });
      //  but you will have to refresh the page to see the results

      console.log("Note updated successfully:", updatedNote);
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  return (
    //Exporting all the things i'll need
    <NotesContext.Provider
      value={{ notes, addNote, delNote, EditNote, getNotes,showAlert,alert }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NoteState;
