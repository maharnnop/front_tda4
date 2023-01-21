import React, { Component, useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link,useNavigate,useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import './PackageDetail.css'
import LoadingSpinner from "../Loading/Loading"

const PackageDetail =() =>{
  const navigate = useNavigate();
    const user_id =jwt_decode(localStorage.getItem("jwt"))['user_id']
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    const [userData, setUserData] = useState(true)
    const [packages, setPackages] = useState([]);
    const [isLoading, setIsLoading] =useState(false)
    const { id } = useParams();
    const url = 'http://localhost:8000';
    const getPackages= () =>{
      
      axios
        .get(url + "/insure/" + id,{
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        })
        .then((res) => {
          setPackages(res.data);
        })
  
        .catch((err) => console.log(err));
    }
    console.log(packages.type);
    useEffect(() => {
      setIsLoading(true)
      axios.get(url + "/user/"+user_id,{
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then(res =>{
        console.log(res.data);
        setUserData(res.data.users_user_insure.some(item=>item.insure_id === parseInt(id)))
      }).catch(err =>{console.log(err);})
      getPackages();
      setIsLoading(false)
    }, []);
    
    const handleBuy = (e) => {
      e.preventDefault();
      console.log(id);
      axios
        .post(url + "/insure/user/", {
          'user_id': user_id,
          'insure_id': id,
          'date_buy':'2023-01-19'
        },
          { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        })
        .then((res) => {
          console.log(res.data);
          alert("Buy completed");
          navigate("/");
        })
  
        .catch((err) => {
          console.log(err)
         alert("Not sure which one to choose ?")});
  
      
    };
   
    const buyForm = ( 
      <form onSubmit={handleBuy}>
        <input className="buyBtn" type="submit" value="BUY" />
        
      </form>
    );
    return (
      <div>
        <div className="box-card">
            <h1>{packages.name}</h1>
            {isLoading ? <LoadingSpinner /> : null}
          <div className="insure-detail">
          <img className="img-detail" src={packages.img_url} />
            <div className="descript-insure">
              <h3><span>Description : </span></h3>
              <h3> - {packages.descript}</h3>
              <h3><span>Premium : </span>{packages.premium}</h3>
              <h3><span>Compensate : </span>{packages.compensation}</h3>
            </div>
              {localStorage.getItem("jwt") === null ? <Link to="/login"> <h3>Login to buy</h3> </Link>:userData ? <Link to="/profile"><h3>Already buy</h3></Link>: buyForm}
          </div>
        </div>
      </div>
)
}

export default PackageDetail