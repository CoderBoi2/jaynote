import React, { useState, useEffect } from "react";
import "../authentication.css";
import { Link, useNavigate } from "react-router-dom";
import { useToggle } from "../../../hooks/useToggle";
import { toast } from "react-toastify";
import { signUpService } from "../../../services/";
import { useAuth } from "../../../context/";
import {
  validateEmail,
  validatePassword,
  confirmPasswordCheck,
} from "../../../functions/";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPass, setShowPass] = useToggle(false);
  const [showConfirmPass, setShowConfirmPass] = useToggle(false);

  const {
    authState: { token },
    authDispatch,
  } = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = async (e) => {
    const { name, value } = e.target;
    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const checkInputs = () => {
    return (
      user.firstName !== "" &&
      user.lastName !== "" &&
      user.email !== "" &&
      user.password !== "" &&
      user.confirmPassword !== ""
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (checkInputs()) {
        if (
          validateEmail(user.email) &&
          validatePassword(user.password) &&
          confirmPasswordCheck(user.password, user.confirmPassword)
        ) {
          const response = await signUpService(user);
          if (response.status === 201) {
            authDispatch({
              type: "SIGNUP",
              payload: {
                token: response.data.encodedToken,
                user: response.data.createdUser,
              },
            });
            toast.success("Signup Success!!");
            navigate("/notes");
          } else {
            throw new Error("Something went wrong! Please try again later");
          }
        }
      } else {
        toast.warning("Fields Cannot Be Empty");
      }
    } catch (error) {
      toast.error(error.response.data.errors[0]);
    }
  };

  useEffect(() => {
    if (token) navigate("/notes");
  }, []);

  return (
    <>
      <main className="signup-section">
        <section className="section-form signup-form">
          <form action="" onSubmit={submitHandler}>
            <h1 className="form-title">Sign Up</h1>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={user.email}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={changeHandler}
                required
              />
              {showPass ? (
                <FaEyeSlash className="eye-icon" onClick={setShowPass} />
              ) : (
                <FaEye className="eye-icon" onClick={setShowPass} />
              )}
            </div>
            <div className="form-group">
              <input
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={changeHandler}
                required
              />

              {showConfirmPass ? (
                <FaEyeSlash className="eye-icon" onClick={setShowConfirmPass} />
              ) : (
                <FaEye className="eye-icon" onClick={setShowConfirmPass} />
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
              <p className="login-text">
                Already Have an Account?
                <Link to="/login" className="form-link">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export { Signup };
