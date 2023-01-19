import React, { Component, useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link,useNavigate,useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PackageDetail =() =>{
  const navigate = useNavigate();
    const user_id =jwt_decode(localStorage.getItem("jwt"))['user_id']
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    const [userData, setUserData] = useState(true)
    const [packages, setPackages] = useState([]);
    const [cars, setCars] = useState([]);
    const [qr, setQr] = useState('');
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
    const myCarList = (userId) => {
      axios
        .get(url + "/cars/mycar/" + userId)
        .then((res) => {
          console.log(res.data);
  
          setCars(res.data);
        })
  
        .catch((err) => console.log(err));
    };
    console.log(packages.type);
    useEffect(() => {
      axios.get(url + "/user/"+user_id,{
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then(res =>{
        console.log(res.data);
        setUserData(res.data.users_user_insure.some(item=>item.insure_id === parseInt(id)))
      }).catch(err =>{console.log(err);})
      getPackages();
      // if (localStorage.getItem("jwt") !== null) {
      //   const decoded = jwt_decode(localStorage.getItem("jwt"));
        // myCarList(decoded.id);
      // }
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

      //   axios.post(url +"/qrgen/generate",{
      //     amount: parseFloat(packages.cost)
      // })
      // .then(res =>{
      //   console.log('good', res)
      //   console.log(res);
      //   setQr(res.data.Result)
      // })
      // .catch(err =>{
      //   console.log('bad', err)
      // })
          
        })
  
        .catch((err) => {
          console.log(err)
         alert("Not sure which one to choose ?")});
  
      
    };
   
    const buyForm = ( 
      <form onSubmit={handleBuy}>
        {/* <CarList name="cars" id="cars">
          {carlist}
        </CarList> */}
        <input className="buyBtn" type="submit" value="BUY" />
        
      </form>
    );
    return (
      <div>
        <div className="box-card">
          <img src={packages.img_url} />
            <h1>{packages.name}</h1>
            {/* <h2>{Intl.NumberFormat().format(packages.premium)} Baht / Year</h2> */}
          <div>
            <div>
              <b>for </b>
              {/* {packages.type === undefined ? null : packages.type.join(",")} */}
              <p>{packages.descript}</p>
              {localStorage.getItem("jwt") === null ? <h3>Login to buy</h3> :userData ? <h3>already buy</h3>: buyForm}
            </div>
          </div>
          <div id="modal" style={{display: qr !== "" ? 'block' : 'none' }}> 
          
          <img id="logo-qr" src="https://pp.js.org/img/PromptPay-logo.jpg"/>
          <h2> Prompt Pay accout : 081-5623390</h2>
          <img id="imgqr" src={qr} />
          <h2>name accout : TDA insurance</h2>
          <h2>amount : {Intl.NumberFormat().format(packages.premium)} Baht</h2>
          <br></br>
      <button onClick={()=>navigate("/")}>Done</button>
    </div>
        </div>
      </div>
)
}

export default PackageDetail