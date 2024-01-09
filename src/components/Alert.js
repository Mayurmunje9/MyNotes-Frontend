import { useContext } from "react";
import NotesContext from "./context/notes/notesContext";
export default function Alert(props) {
  const context = useContext(NotesContext);
  return (
    
// If props.alert? exist it will give output as props.alert?.type else it will give only "alert-" this was the first part  and if props.alert?.type is defined it will give `alert-${props.alert.type}` else it willl do 'd-none'

<div className={`alert ${props.alert?.type ? `alert-${props.alert.type}` : 'd-none'}`}
role="alert">
 
  <div>{props.alert?.msg}</div>
</div>

  );
}
