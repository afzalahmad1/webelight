import React, { useEffect, useState } from "react";
import "./styles.css";

import RepoDetails from "../RepoDetails";
import axios from "axios";
import Loader from "../Loader";


const Card = ({ repo }) => {
  const [details, setDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [commit, setCommit] = useState([]);
  const [addition, setAddition] = useState([]);
  const [deletion, setDeletion] = useState([]);
  const [contributors, setContributors] = useState([]);

  const token = process.env.REACT_APP_TOKEN;
  // console.log("token",token);

  useEffect(()=>{
   fetctAllDetails();
  },[details])

  async function fetctAllDetails(){
    try {
      if (details) {
        // Getting addition and deletion
        
        const data1 = await fetchAddition();

        // getting commit
        const data2 = await fetchCommit();

        // Getting contributors
        const data3 = await fetchContributors();
        if(data1 && data2 && data3){
          setIsLoading(false)
        }
        console.log("ccccc",data1);
        console.log("aaaaaa",data2);
        console.log("cont",data3);
        setAddition(data1.data.map((week) => week[1]));
        setDeletion(data1.data.map((week) => week[2]));
        setCommit(data2.data[data2.data.length - 2]);
        setContributors(data3.data)
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  // getting addition and detetion
  async function fetchAddition() {
    try {
      const res1 = await axios(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/stats/code_frequency`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res1.status === 202) {
        console.log("addition", 202);
        setTimeout(fetchAddition, 1500);
      } else {
        // console.log("res1", res1);
        // setAddition(res1.data.map((week) => week[1]));
        // setDeletion(res1.data.map((week) => week[2]));
        return res1
        // format : [totalAddition,weeklyAddition,weeklyDeletion]
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchCommit() {
    try {
      //  Getting Commit
      const res2 = await axios(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/stats/commit_activity`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res2.status === 202) {
        console.log("commit", 202);
        setTimeout(fetchCommit, 1500);
      } else {
        // console.log("res2", res2);
        // setCommit(res2.data[res2.data.length - 1]);
        return res2
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchContributors() {
    try {
      const res = await axios(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/stats/contributors`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 202) {
        console.log("contri", 202);
        setTimeout(fetchContributors, 1500);
      } else {
        // console.log("contri", res);
        // setContributors(res.data)
        return res
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleExpand = async () => {
    setDetails(!details);
    console.log(repo.owner.login);
    console.log(repo.name);
    
  };

  return (
    <div>
      <div className="card-flex">
        <div className="left-card">
          <div>
            <img src={repo.owner.avatar_url} alt={repo.name}/>
          </div>
          <div className="repo-details">
            <h2>{repo.name}</h2>
            <div>{repo.description}</div>
            <div className="publish">
              <div className="stars">
                <div className="star-bg">Stars: {repo.stargazers_count}</div>
                <div className="star-bg">Issues: {repo.open_issues}</div>
              </div>
              <div>
                last pushed {repo.pushed_at} by {repo.owner.login}
              </div>
            </div>
          </div>
        </div>
        <div className="expand" onClick={handleExpand}>
          {details ? "^" : ">"}
        </div>  
      </div>
      {details && (isLoading ? <h1 style={{textAlign:"center"}}>Loading.....</h1> :  <RepoDetails addition={addition} deletion={deletion} commit={commit} contributors={contributors}/>)
      }
    </div>
  );
};

export default Card;
