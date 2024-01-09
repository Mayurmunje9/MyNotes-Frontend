import React, { useContext } from "react";
import NotesContext from "./context/notes/notesContext";
import Notes from "./Notes";
export default function Home() {
  const context = useContext(NotesContext);
  const { notes, setNotes } = context;
  return (
   <>
   
 
     <Notes />
     
      </>
  
  );
}
