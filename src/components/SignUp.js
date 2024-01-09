//newsignup 
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/SignUp.css";
import Alert from "./Alert";
import NotesContext from "./context/notes/notesContext";

const SignUp = () => {
  const host = "http://localhost:4000";
  const history = useNavigate();
  
  // Use useContext to access the NotesContext
  const { showAlert } = useContext(NotesContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password" || e.target.name === "cpassword") {
      showAlert("", ""); // Clear the alert when the user starts typing in the password fields
    }
  };

  const { name, email, password, cpassword } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cpassword === password) {
      try {
        const response = await fetch(`${host}/api/auth/createUser`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
          // Save authtoken and redirect to home page
          history("/"); // Call history function to navigate
          console.log(localStorage.setItem("token", json.authToken));
          return;
        } else {
          showAlert("User creation failed: " + json.message, "danger");
        }
      } catch (error) {
        console.error("Error during user creation:", error);
        showAlert("Error during user creation", "danger");
      }
    } else {
      showAlert("Passwords do not match", "danger");
    }
  };

  return (
    <div className="SignUpContainer">
      <h2 className="Title">Sign Up to start using MyNotes</h2>
      <form className="Form" onSubmit={handleSubmit}>
        <div className="FormGroup">
          <label className="Label">First Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="Input"
          />
        </div>
        <div className="FormGroup">
          <label className="Label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="Input"
          />
        </div>
        <div className="FormGroup">
          <label className="Label">Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="Input"
          />
        </div>
        <div className="FormGroup">
          <label className="Label">Confirm password </label>
          <input
            id="cpassword"
            type="password"
            name="cpassword"
            className={`Input ${cpassword === password ? "match" : ""}`}
            onChange={handleChange}
            required
          />
          {cpassword !== password && (
            <Alert alert={{ type: "danger", msg: "Passwords do not match" }} />
          )}
        </div>

        <button type="submit" className="Button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;

