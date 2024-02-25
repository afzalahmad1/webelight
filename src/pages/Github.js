import { useEffect, useState } from "react";
import Card from "../components/Card";
import "./styles.css";

import Loader from "../components/Loader";
import PaginationComponent from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos } from "../redux/slices/repo";
const Github = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.repo);
  useEffect(() => {
    
    dispatch(fetchRepos(page));
  }, [page]);
  const handlePageChange = (event, value) => {

    setPage(value);
  };

  if (state.loading) {
    return <Loader />;
  }
  return (
    <div className="container-flex">
      <div>
        <div className="container">
          <h3>Most Starred Repos</h3>
         
          <div className="card-container">
           {console.log("state",state)}
            {state.data.items !== undefined ? state.data.items.map((repo) => {
              return <Card repo={repo} key={repo.id} />;
            }):<h1>Network Error</h1>}
          </div>
        </div>

        <PaginationComponent page={page} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Github;
