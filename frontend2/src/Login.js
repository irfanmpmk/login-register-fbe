import "./login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

const URI = "https://login-register-website.onrender.com";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  function handleInput(e) {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    //setErrors(Validation(values));
    const err = Validation(values);
    setErrors(err);

    if (err.email === "" && err.password === "") {
      axios
        .post(URI + "/login", {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.data === "Success") {
            navigate("/home");
          } else {
            alert("No record existed");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center  vh-100  container">
      <div className=" p-3 rounded frame">
        <h2 className="signin-inactive">Sign In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label mb-0">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="rounded-5 form-styling"
              name="email"
              onChange={handleInput}
            />{" "}
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label mb-0">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="rounded-5 form-styling"
              name="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-5">
            Log in
          </button>
          <p style={{ fontSize: "10px", textAlign: "center" }}>
            You are agree to our terms and policies
          </p>
          <div className="btn-animate">
            <Link
              to="/signup"
              className="btn btn-signin  w-100  rounded-0 text-decoration-none"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
