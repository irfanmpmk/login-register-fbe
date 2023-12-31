import "./signup.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";

const URI = "https://login-register-website.onrender.com";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
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

    const err = Validation(values);
    setErrors(err);

    if (err.name === "" && err.email === "" && err.password === "") {
      axios
        .post(URI + "/signup", {
          name: values.name,
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          console.log(res.data);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center  vh-100 container">
      <div className="bg-white p-3 rounded frame">
        <h2 className="signin-inactive">Sign Up</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label mb-0">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="rounder-5 form-styling"
              name="name"
              onChange={handleInput}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="rounder-5 form-styling"
              name="email"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="rounder-5 form-styling"
              name="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-5">
            Sign Up
          </button>
          <p style={{ fontSize: "10px", textAlign: "center" }}>
            You are agree to our terms and policies
          </p>
          <div className="btn-animate">
            <Link
              to="/"
              className="btn btn-signin w-100 rounded-0 text-decoration-none"
            >
              To Login Screen
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
