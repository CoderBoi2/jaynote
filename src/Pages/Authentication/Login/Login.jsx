import React, { useState, useEffect } from "react";
import "../authentication.css";
import { toast } from "react-toastify";
import { useToggle } from "../../../hooks/useToggle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, useNotes, useArchive, useTrash } from "../../../context/";
import { loginService } from "../../../services/";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  getNotesHandler,
  getArchivesHandler,
  getTrashHandler,
  validateEmail,
} from "../../../functions/";

const Login = () => {
  const [showPass, setShowPass] = useToggle(false);
  const [remember, setRemember] = useToggle(false);

  const {
    authState: { token },
    authDispatch,
  } = useAuth();

  const { notesDispatch } = useNotes();

  const { archiveDispatch } = useArchive();

  const { trashDispatch } = useTrash();

  const navigate = useNavigate();

  const location = useLocation();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const guestUser = {
    email: "user@gmail.com",
    password: "user123",
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const guestUserHandler = (e) => {
    e.preventDefault();
    setUser(guestUser);
    setRemember(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (user.email !== "" && user.password !== "") {
      if (validateEmail(user.email)) {
        try {
          const response = await loginService(user);
          if (response.status === 200) {
            if (remember) {
              localStorage.setItem("token", response.data.encodedToken);
              localStorage.setItem(
                "user",
                JSON.stringify(response.data.foundUser)
              );
            }
            getNotesHandler(response.data.encodedToken, notesDispatch);
            getArchivesHandler(response.data.encodedToken, archiveDispatch);
            getTrashHandler(response.data.encodedToken, trashDispatch);
            authDispatch({
              type: "LOGIN",
              payload: {
                token: response.data.encodedToken,
                user: response.data.foundUser,
              },
            });
            navigate(location?.state?.from?.pathname || "/notes", {
              replace: true,
            });
            toast.success(`Welcome Back ${response.data.foundUser.firstName}`);
          } else {
            throw new Error("Something went wrong! Please try again later");
          }
        } catch (error) {
          toast.error(error.response.data.errors[0]);
        }
      }
    } else {
      toast.warning("Fields cannot be empty");
    }
  };

  useEffect(() => {
    if (token) navigate("/notes");
  }, []);

  return (
    <main className="login-section">
      <section className="section-form">
        <form action="" onSubmit={submitHandler}>
          <h1 className="form-title">Login</h1>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={changeHandler}
              value={user.email}
              required
            />
          </div>
          <div className="form-group">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={changeHandler}
              value={user.password}
              required
            />
            {showPass ? (
              <FaEyeSlash className="eye-icon" onClick={setShowPass} />
            ) : (
              <FaEye className="eye-icon" onClick={setShowPass} />
            )}
          </div>
          <div className="form-group check-remember">
            <div className="checkbox-group">
              <input
                type="checkbox"
                onChange={(e) =>
                  e.target.checked ? setRemember(true) : setRemember(false)
                }
                id="checkbox-remember"
                checked={remember}
              />
              <label htmlFor="checkbox-remember">Remember Me</label>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={guestUserHandler}>
              Add Guest credentials
            </button>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <p className="register-text">
              Don't have an account?
              <Link to="/signup" className="form-link">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export { Login };
