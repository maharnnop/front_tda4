import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Package from "./Package";

const Index = () =>{
    const [packages, setPackages] = useState([]);
  const [filterPack, setFilterPack] = useState([])
  const url = 'http://localhost:8000';
  useEffect(() => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    axios.get(url + "/insure/").then((res) => {
        console.log(res);
      let pack = res.data.filter(item=>item.release)
      .map((item) => {
        return <Package key={item.id} detail={item} />;
      });
      setPackages(pack);
      setFilterPack(pack)
    }).catch(err=>{
        console.log(err);
    })
  }, []);

  const handleClick =(e) =>{
    e.preventDefault();
    if(e.target.filter.value === 'All'){
      setFilterPack(packages)
    }else{
      const tier = e.target.filter.value
      const filterList = []
      packages.forEach(item =>{
        if(item.key[item.key.length -1] == tier){
          filterList.push(item)
        }
      })
      setFilterPack(filterList) 
       }
  }


  return (
    <div>
      <h1>Car Insurance Packages</h1>
      <form onSubmit={handleClick} >
      <select name="filter">
        <option id="Option" value={null}>All</option>
        <option id="Option" value={1}>First Class</option>
        <option id="Option" value={2}>Second Class</option>
        <option id="Option" value={3}>Third Class</option>
      </select>
      <input className="btn-filter" type="submit" value='Choose'/>
      </form>
      <h2>{packages}</h2>
      
    </div>
  );
};

export default Index;