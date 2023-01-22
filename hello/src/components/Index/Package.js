import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link, Navigation } from "react-router-dom";
import RadialBar from "../Invest/RadialBar";
import './Package.css'

const Package =(props) =>{
    let cost = new Intl.NumberFormat().format(props.detail.premium);
return (
<div className="main">
  {localStorage.getItem("jwt") === null ?
  <Link to={`/login`}>
<div className="card-header">
  <img className="icon" src={props.detail.img_url} width="100"/>
</div>
<div className="detail">
  <h2 className="name">{props.detail.name}</h2>
  <h3><span>premium : </span>{cost}  Baht </h3>
  <h3><span>compensate : </span>{props.detail.compensation} Baht</h3>
  <h4><span>login to see detail</span></h4>
</div>
  </Link>:
  props.detail.release ? 
<Link to={`/packages/${props.detail.id}`}>
<div className="card-header">
  <img className="icon" src={props.detail.img_url} width="100"/>
</div>
<div className="detail">
  <h2 className="name">{props.detail.name}</h2>
  <h3><span>premium : </span>{cost}  Baht </h3>
  <h3><span>compensate : </span>{props.detail.compensation} Baht</h3>
  <h4><span>click to see detail</span></h4>
</div>
</Link>
: 
<Link to={`/fund/${props.detail.id}`}>
<div className="card-header">
  <img  className="icon" src={props.detail.img_url} width="100"/>
</div>
<div className="detail detail-invest">
  <h2 className="name">{props.detail.name}</h2>
  <h3>raise funds : <br/>{Intl.NumberFormat().format(props.detail.fund)} /{Intl.NumberFormat().format(props.detail.init_fund)}  Baht </h3>
  <div className="radialbar">
  <RadialBar percent={props.detail.fund *100/props.detail.init_fund}/>
  </div>
</div>
</Link>
}
</div>
)
}

export default Package