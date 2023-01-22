import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../Loading/Loading";
import './Profile.css'

import jwt_decode from "jwt-decode";

const Profile = () => {
    const user_id =jwt_decode(localStorage.getItem("jwt"))['user_id']
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [insureData, setInsureData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = 'http://localhost:8000';
  
  const handledelete = (e)=>{
    e.preventDefault()
    // console.log(e.target.name);
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    axios
      .delete(url + "/insure/user/"+e.target.name,{
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}
      })
      .then((res) => {
        alert("remove package done");
        navigate("/");
        // document.cookies.set("jwt",token)
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("remove package fail");
        } else {
          console.log(err);
        }
      });
  }

useEffect(()=>{
    setIsLoading(true)
    axios.get(url + "/user/"+user_id,{
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}
      })
      .then((res)=>{
        
        setUserData(res.data)
        const insure =[]
        res.data.users_user_insure.map(item=>{
          let ht = [<form className="mypack" name={item.id} onSubmit={handledelete}>
                      <h3 className="pack-name"><span></span>{item.insure.name}</h3>
                      <h3 className="pack-pre"><span>premium : </span>{item.insure.premium}</h3>
                      <h3 className="pack-com"><span>compensate : </span>{item.insure.compensation}</h3>
                      <input className="del-btn" type="submit" value="Remove"/>
          </form>]
          insure.push(ht)
        })
        setInsureData(insure)
        setIsLoading(false)
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
        <h1>Profile form</h1>
        
          <form className="container-input" onSubmit={handleSubmit}>
          
            username:{" "}
            <input
              type="text"
              name="username"
              onChange={handleChange}
              defaultValue={userData.username}
              required
            />
           
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
            
            <input className="edit-btn" type="submit" value='Edit'/>
          </form>
        
        <div className="packages">
            <h2>my insurances</h2>
            {isLoading ? <LoadingSpinner /> : null}
            {insureData}
        </div>
    </div>
  );
};

export default Profile;