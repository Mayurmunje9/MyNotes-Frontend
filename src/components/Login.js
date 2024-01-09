import React, { useState,useContext} from "react";
import NotesContext from "./context/notes/notesContext";
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const context = useContext(NotesContext);
  const { showAlert} = context;
  const host = "http://localhost:4000";
  let history = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // Save authtoken and redirect to home page
      console.log("hello")
      console.log( localStorage.setItem("token", json.authToken))
   
      history("/") // Redirect to home page
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <h2 className="mt-4">Login to get access to MyNotes</h2>
        <form className="container mt-4" onSubmit={submit}>
          <div className="form-group mt-1">
            <label htmlFor="exampleInputEmail1 my-3">Email address</label>
            <input
              type="email"
              className="form-control mt-2"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={onChange}
              value={credentials.email}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1 ">Password</label>
            <input
              type="password"
              className="form-control mt-2"
              id="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
              value={credentials.password}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
