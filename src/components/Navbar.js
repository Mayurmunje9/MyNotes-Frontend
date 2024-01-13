import React, { useContext } from "react";
import NotesContext from "./context/notes/notesContext";
import logo from "../components/logo.png"
import { Link, useLocation, useNavigate } from "react-router-dom";
export default function Navbar() {
  let location = useLocation();
  let history = useNavigate();
  const context = useContext(NotesContext);
  const { alert,showAlert} = context;
  React.useEffect(() => {
    console.log(location.pathname);
    // if(signout){
    //   localStorage.removeItem('token');
    // }
  }, [location]);
  const signout = () => {
    history("/login");
    try {
      localStorage.removeItem("token");
      console.log("Token removed successfully");
      showAlert("Signed out successfully", "danger");
    } catch (error) {
      console.error("Error removing token from localStorage:", error);
    }

    // clearCookie('token');
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid" >
          <Link className="navbar-brand " to="/">
           <img className="ml-2" src={logo} alt="nooooo" style={{height:"2em", width:"auto", left:"2dvw",position:"relative",marginRight:"4em"}}/>
           <div style={{left:"1dvw",position:"relative"}}>
            MyNotes</div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-primary mx-2 d-flex"
                  style={{ position: "relative", left: "57dvw" }}
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  style={{ position: "relative", left: "57dvw" }}
                  to="/signup"
                  role="button"
                >
                  Sign Up
                </Link>
              </form>
            ) : (
              <button
                className="btn btn-primary"
                style={{ position: "relative", left: "66dvw" }}
                role="button"
                onClick={signout}
              >
                {" "}
                Sign Out{" "}
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

