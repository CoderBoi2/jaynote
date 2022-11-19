import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Notes,
  Archive,
  Trash,
  Signup,
  Login,
  Label,
  Error404,
} from "./Pages/";
import { RequiresAuth } from "./RequiresAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-text"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/notes"
            element={
              <RequiresAuth>
                <Notes />
              </RequiresAuth>
            }
          />
          <Route
            path="/archive"
            element={
              <RequiresAuth>
                <Archive />
              </RequiresAuth>
            }
          />
          <Route
            path="/trash"
            element={
              <RequiresAuth>
                <Trash />
              </RequiresAuth>
            }
          />
          <Route
            path="/labels/:labelName"
            element={
              <RequiresAuth>
                <Label />
              </RequiresAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
