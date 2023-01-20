import React, { Component, useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link,useNavigate,useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import './InvestDetail.css'
import RadialBar from "../Invest/RadialBar";
import LoadingSpinner from "../Loading/Loading"

const InvestDetail =() =>{
    const navigate = useNavigate();
    const user_id =jwt_decode(localStorage.getItem("jwt"))['user_id']
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    const [packages, setPackages] = useState({});
    const [chart, setChart] = useState([])
    const [isLoading, setIsLoading] =useState(false)
    const [userData, setUserData] = useState(true)
    const { id } = useParams();
    const [investing, setInvesting] = useState({insure_id:id,invest_id:user_id})
    const [qr, setQr] = useState('');
    const url = 'http://localhost:8000';
    const getPackages= () =>{
      setIsLoading(true)
      axios.get(url + "/user/"+user_id,{
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then(res =>{
        console.log(res.data);
        setUserData(res.data.users_invest_insure.some(item=>item.insure_id === parseInt(id)))
      }).catch(err =>{console.log(err);})
      axios
        .get(url + "/insure/" + id,{
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        })
        .then((res) => {
          setPackages(res.data);
          setChart(<RadialBar percent={parseInt(res.data.fund) *100/parseInt(res.data.init_fund)} />)
          setIsLoading(false)
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
          navigate("/invest");
          
        })
  
        .catch((err) => {
          console.log(err)
         alert("Not sure which one to choose ?")});
  
      
    };
   
    const buyForm = ( 
      <form className="buyform" onSubmit={handleBuy}>
       
        invest : <input type="number" name="cost" onChange={handleChange} required/><br/>
        <input className="buyBtn" type="submit" value="BUY" />
        
      </form>
    );
    return (
      <div>
        <div className="box-card">
            <h1>{packages.name}</h1>
        {isLoading ? <LoadingSpinner /> : null}
          {/* <img className="icon" src={packages.img_url} /> */}
            {/* <h2>{Intl.NumberFormat().format(packages.premium)} Baht / Year</h2> */}
          <div className="invest-detail">
            {chart}
            <div className="descript">
              <h3><span>Description : </span></h3>
              {/* {packages.type === undefined ? null : packages.type.join(",")} */}
              <h4>  - {packages.descript}</h4>
              <h3><span>Premium : </span>{packages.premium}</h3>
              <h3><span>Compensate : </span>{packages.compensation}</h3>
              </div>
              <div className="des2">
              init_fund : {packages.init_fund}<br/>
              currenly : {packages.fund}<br/>
              </div>
              <div className="buyform">
              {localStorage.getItem("jwt") === null ? <h3>Login to buy</h3> :
              userData ? <h3>already buy</h3>: buyForm}
              </div>
              
          </div>
         
        </div>
      </div>
)
}

export default InvestDetail