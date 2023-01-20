import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Package from "./Package";
import './Index.css'
import LoadingSpinner from "../Loading/Loading";

const Index = () =>{
    const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = 'http://localhost:8000';
  useEffect(() => {
    setIsLoading(true)
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    axios.get(url + "/insure/").then((res) => {
        console.log(res);
      let pack = res.data.filter(item=>item.release)
      .map((item) => {
        return <Package key={item.id} detail={item} />;
      });
      setPackages(pack);
      setIsLoading(false)
    }).catch(err=>{
        console.log(err);
    })
  }, []);

  return (
    <div >
      <h1 >Insurance Packages</h1>
       {isLoading ? <LoadingSpinner /> : null}
      <div className="container-package">{packages}</div>
      
    </div>
  );
};

export default Index;