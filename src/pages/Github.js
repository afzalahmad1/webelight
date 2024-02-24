import { useEffect, useState } from "react";
import Card from "../components/Card";
import "./styles.css";
import axios from "axios";
import Loader from "../components/Loader";
import PaginationComponent from "../components/Pagination";
const Github = () => {
  const [data, setdata] = useState([]);
  const [page,setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, [page]);
  const handlePageChange = (event, value) => {
    setIsLoading(true)
    setPage(value);
  };
  const fetchData = async () => {
    try {
      const res = await axios(
        `https://api.github.com/search/repositories?q=created:>2024-02-15&sort=stars&order=desc&page=${page}`
      );
      if(res.status === 200){
        console.log(res.data.items);
        setdata(res.data.items);
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-flex">
      {isLoading ? (
        <Loader />
      ) : (
        <div >
          <div className="container">
            <h3>Most Starred Repos</h3>
            <div className="card-container">
              {data.map((repo) => {
                return <Card repo={repo} key={repo.id} />;
              })}
            </div>
          </div>
          
          <PaginationComponent page={page} handlePageChange={handlePageChange}/>
    </div>
      )}
    </div>
  );
};

export default Github;
