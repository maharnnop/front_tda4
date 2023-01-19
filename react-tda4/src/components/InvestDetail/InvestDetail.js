import React, { Component, useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link,useNavigate,useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const InvestDetail =() =>{
    const navigate = useNavigate();
    const user_id =jwt_decode(localStorage.getItem("jwt"))['user_id']
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    const [packages, setPackages] = useState([]);
    const { id } = useParams();
    const [investing, setInvesting] = useState({insure_id:id,invest_id:user_id})
    const [qr, setQr] = useState('');
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
 
    useEffect(() => {
      getPackages();
    }, []);
    
    const handleChange =(e) =>{
        setInvesting((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }));
        };
    const handleBuy = (e) => {
      e.preventDefault();
      console.log(id);
      axios
        .post(url + "/insure/invest/",investing ,
          { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        })
        .then((res) => {
          console.log(res.data);
          alert("Invest completed");
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
        init_fund : {packages.init_fund}<br/>
        currenly : {packages.fund}<br/>
        invest: <input type="number" name="cost" onChange={handleChange} required/><br/>
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
              {localStorage.getItem("jwt") === null ? <h3>Login to buy</h3> : buyForm}
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

export default InvestDetail