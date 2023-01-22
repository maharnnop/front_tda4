import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  Link} from "react-router-dom";
import './Login.css'

const Login = ()=>{
  const navigate = useNavigate();
  const [logInData, setLogInData] = useState({});
  const url = 'http://localhost:8000';

  const handleChange = (e) => {
    setLogInData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    axios
      .post(url + "/user/login", logInData)
      .then((res) => {
        console.log(res);
        let token = res.data.token.access;
        let username = res.data.token.username;
        navigate("/");
        localStorage.setItem("jwt", token);
        localStorage.setItem("username", username);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          alert("username or password wrong");
        } else {
          console.log(err);
        }
      });
  };
    return (
        <div>
    
            <h1>Welcome Back !</h1>
    
            <form className="input-login" onSubmit={handleSubmit}>
              <input type="text" placeholder="Username" name="username" onChange={handleChange}/>{" "}
              
              <input type="password" placeholder="Password" name="password" onChange={handleChange}/>{" "}
              
              <input className="login-btn" type="submit" value='Login'/>
            </form>
            <br/> 
            <Link to="/signup" >
              Let's sign up
            </Link>
        
        </div>
      );
}

export default Login;