import React, { Component } from "react";
import Chart from "react-apexcharts";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props.data[0],
      options: {
        chart: {width: 380,},
        labels: props.data[1],
        responsive: [{breakpoint: 480,options: {chart: {width: 200,},legend: {position: "bottom",},},},],
      },
    };
  }

  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="380"
        />
      </div>
    );
  }
}

export default Donut;
