import { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Alert from "./components/Alert";
import NotesContext from "./components/context/notes/notesContext";
import NoteState from "./components/context/notes/notesState";
import SignUp from "./components/SignUp";
function App() {
  const context = useContext(NotesContext);
  const showAlert  = context;
  // const [alert, setalert] = useState();
  // const showAlert = (message, type) => {
  //   setalert({
  //     msg: message,
  //     type: type,
  //   });
  //   setTimeout(() => {
  //     setalert(null);
  //   }, 2000);
  // };
  localStorage.removeItem("token");
  return (
    <div>
      <NoteState>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Navbar />
                  <Alert alert={alert} />
                  <div className="container">
                    <Home showAlert={showAlert} />
                  </div>
                </div>
              }
            />
            <Route
              path="/About"
              element={
                <div>
                  <Navbar />
                  <div className="container">
                    <About />
                  </div>
                </div>
              }
            />

            <Route
              path="/SignUp"
              element={
                <div>
                  <Navbar />
                  <div className="container">
                    <SignUp />
                  </div>
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <div>
                  <Navbar />
                  <div className="container">
                    <Login showAlert={showAlert} />
                  </div>
                </div>
              }
            />
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
