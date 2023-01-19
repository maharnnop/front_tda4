import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { ContainerFlex, InputBox, Label } from "../StylesPages/ProfileStyles";
// import { BackgroundImg2, Header2, BackdropBox2, ContainInput } from "../StylesPages/SignupStyles";


import jwt_decode from "jwt-decode";
// import './CardPackage.css'
// const config = require("../../config.json");
const Profile = () => {
    const user_id =jwt_decode(localStorage.getItem("jwt"))['user_id']
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [insureData, setInsureData] = useState([]);
  const url = 'http://localhost:8000';
  
useEffect(()=>{
    axios.get(url + "/user/"+user_id,{
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}
      })
      .then((res)=>{
        console.log(res.data)
        setUserData(res.data)
        res.data.users_user_insure.map(item=>{
            const insure =[]
            axios.get(url + "/insure/"+item.insure_id,{
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}
              })
              .then(res =>{
                console.log(res.data);
                let detail = <h2> name : {res.data.name} premium : {res.data.premium} compensation : {res.data.compensation} date : {item.date_buy}</h2>
                insure.push(detail)
              })
              setInsureData(insure)
        })
        
      })
      .catch(err=>{
        console.log(err);
      })
},[])



  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    axios
      .patch(url + "/user/"+user_id, userData,{
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}
      })
      .then((res) => {
        console.log(res);
        navigate("/");
        // document.cookies.set("jwt",token)
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("username update fail");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div>
        <h2>Profile form</h2>
        <div className="container-input">
          <form onSubmit={handleSubmit}>
          
            username:{" "}
            <input
              type="text"
              name="username"
              onChange={handleChange}
              defaultValue={userData.username}
              required
            />
            <br />
            firstname:{" "}
            <input
              type="text"
              name="first_name"
              defaultValue={userData.first_name}
              onChange={handleChange}
              required
            />
            lastname:{" "}
            <input
              type="text"
              name="last_name"
              defaultValue={userData.last_name}
              onChange={handleChange}
              required
            />
            <br />
            email:{" "}
            <input
              type="text"
              name="email"
              defaultValue={userData.email}
              onChange={handleChange}
              required
            />
            birthday:{" "}
            <input type="date" name="date_of_birth" defaultValue={userData.date_of_birth} onChange={handleChange} required />
            <br />
            <br />
            <input type="submit" value='Edit'/>
          </form>
        </div>
        <div className="packages">
            <h2>my insurances</h2>
            {insureData}
        </div>
    </div>
  );
};

export default Profile;