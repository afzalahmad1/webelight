import React, { useState } from "react";
import "./styles.css";

import Highcharts from 'highcharts'
import HighchartsReact from "highcharts-react-official";

const RepoDetails = ({commit,addition,deletion,contributors}) => {
    const [value,setValue] = useState("commit")
    console.log("commitarr",commit);
    console.log("delArr",deletion);
    console.log("addArr",addition);
  const options = {
    title: {
      text: value === 'commit'?`Total Changes ${commit.total}`: value === 'addition'? 'weekly Addition Graph': value === 'deletion'? 'weekly Deletion Graph':"",
    },
    chart: {
        type: 'spline'
      },
    legend: {
        symbolWidth: 4
      },
      yAxis: {
        title: {
          text: value === 'commit'?`Commits`: value === 'addition'? 'Additions': value === 'deletion'? 'Deletions':""
        },
        accessibility: {
          description: 'commit value'
        }
      },
      xAxis: {
        
        categories:['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' , 'Saturday']
      },
      
    series: [
      {
        name: value,
        data: value === "commit"?commit.days: value === "addition" ?addition: value === "deletion"? deletion:"",
      },
    ],
  };




  const options2 = {
    chart: {
        type: 'spline'
      },
    legend: {
        symbolWidth: 4
      },
      title: {
        text: 'Contributors graphraph'
      },
      xAxis: {
        categories: contributors.map(contributor => contributor.author.login)
      },
      yAxis: {
        title: {
          text: 'Contributions'
        }
      },
      
    series: [
      {
        name: 'Contributions',
        data: contributors.map(contributor => contributor.total)
      },
    ],
  };
  return (
    <div>
      <div className="dropdown" >
        <select onChange={(e)=>setValue(e.target.value)}>
          <option value="commit">Commits</option>
          <option value="addition">Addition</option>
          <option value="deletion">Deletion</option>
        </select>
      </div>
      <div className="graph">
        <HighchartsReact highcharts={Highcharts} options={options} /> 
      </div>
      <div className="graph">
          <HighchartsReact highcharts={Highcharts} options={options2} /> 
      </div>
    </div>
  );
};

export default RepoDetails;
