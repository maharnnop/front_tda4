import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link, Navigation } from "react-router-dom";

const Package =(props) =>{
    let cost = new Intl.NumberFormat().format(props.detail.premium);
return (
<div>
  {props.detail.release ? 
<Link to={`/packages/${props.detail.id}`}>
<div className="card-header">
  <img src={props.detail.img_url} width="100"/>
  
</div>
  <h2>{props.detail.name}</h2>
  <p>{props.detail.descript}</p>
  <h3>premium : {cost}  Baht </h3>
  <h3>compensation : {props.detail.compensation} Baht</h3>
</Link>
: 
<Link to={`/fund/${props.detail.id}`}>
<div className="card-header">
  <img src={props.detail.img_url} width="100"/>
  
</div>
  <h2>{props.detail.name}</h2>
  <p>{props.detail.descript}</p>
  <h3>fund : {props.detail.fund}  Baht </h3>
  <h3>full fund : {props.detail.init_fund} Baht</h3>
</Link>
}
</div>
)
}

export default Package