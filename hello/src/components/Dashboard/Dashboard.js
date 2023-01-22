import React, { useState,useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import DonutChart from "./Chart";
import LoadingSpinner from "../Loading/Loading";
import './Dashboard.css'


import jwt_decode from "jwt-decode";

const Dashboard = () => {
    const user_id =jwt_decode(localStorage.getItem("jwt"))['user_id']
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [investData, setInvestData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = 'http://localhost:8000';

  
  const handleEdit = (e) => {
    e.preventDefault();
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    axios
      .patch(url + "/insure/invest/"+e.target.name, {
        invest_id:user_id,
        cost:e.target.cost.value},
        {headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}})
      .then((res) => {
        navigate("/invest");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("username update fail");
        } else {
          console.log(err);
        }
      });
  };
  const handleDelete = (e) => {
    e.preventDefault()
    axios.delete(url + "/insure/invest/"+e.target.name,{
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}
    }).then((res) => {
      alert("remove fund done");
      navigate("/invest");
    })
    .catch((err) => {
        alert("remove fund fail");
        console.log(err);
    });
  };
useEffect(()=>{
    setIsLoading(true)
    axios.get(url + "/user/"+user_id,{
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}
      })
      .then((res)=>{
        console.log(res.data)
        setUserData(res.data)
        const invest =[]
        const chart_value = []
        const chart_name =[]
        res.data.users_invest_insure.map(item=>{
          let ht = [<form name={item.id} className="myfund" onSubmit={handleEdit}>
                      <h4 className="fund-name">{item.insure.name}</h4>
                      <h4 className="fund-invest"> invest : <input name="cost" defaultValue={item.cost}/></h4>
                      <h4 className="fund-rev">revenue : {item.revenue}</h4>
                      <input className="Edit-btn" type="submit" value="edit" />
                      <button className="del-btn" name={item.id} onClick={handleDelete}>Remove</button>
          </form>]
          chart_value.push(item.cost+item.revenue)
          chart_name.push(item.insure.name)
          invest.push(ht)
        })
        const donut = <DonutChart data={[chart_value,chart_name]}/>
        setChartData(donut)
        setInvestData(invest)
        setIsLoading(false)
      })
      .catch(err=>{
        console.log(err);
      })
},[])

  return (
    <div>
        <h1>summary Chart</h1>
            <div className="chart">
              {chartData}
              </div>
        <div className="container-dashboard">
            <h2>my invest</h2>
            {isLoading ? <LoadingSpinner /> : null}
            {investData}
        </div>
    </div>
  );
};

export default Dashboard;