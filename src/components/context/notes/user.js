import React from 'react'
import NotesContext from "./notesContext";

const host = "http://localhost:4000";
export default function user() {
    const getusers = async () => {
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
      
          console.log(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  return (
    <div>user</div>
  )
}
