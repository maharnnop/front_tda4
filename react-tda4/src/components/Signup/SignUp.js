import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Signup.css'
// import { ContainerFlex, InputBox, Label } from "../StylesPages/ProfileStyles";
// import { BackgroundImg2, Header2, BackdropBox2, ContainInput } from "../StylesPages/SignupStyles";


import jwt_decode from "jwt-decode";
// import './CardPackage.css'
// const config = require("../../config.json");
const SignUp = (props) => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({});
  const url = 'http://localhost:8000';

  const handleChange = (e) => {
    setSignUpData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    axios
      .post(url + "/user/signup", signUpData)
      .then((res) => {
        console.log(res);
        let token = res.data.token.access;
        let username = res.data.token.username;
        navigate("/");
        localStorage.setItem("jwt", token);
        localStorage.setItem("username", username);
        // document.cookies.set("jwt",token)
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("username already exists");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div>
        <h1>Registration form</h1>
        <div >
          <form  className="container-signup" onSubmit={handleSubmit}>
            firstname:{" "}
            <input
              type="text"
              name="first_name"
              onChange={handleChange}
              required
            />
            lastname:{" "}
            <input
              type="text"
              name="last_name"
              onChange={handleChange}
              required
            />
            <br />
            email:{" "}
            <input
              type="text"
              name="email"
              onChange={handleChange}
              required
            />
            birthday:{" "}
            <input type="date" name="date_of_birth" onChange={handleChange} required />
            <br />
            username:{" "}
            <input
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
            password:{" "}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
            <br />
            <input className="signup-btn" type="submit" value='Sign-Up'/>
          </form>
        </div>
    </div>
  );
};

export default SignUp;
