import React from 'react';
import Pagination from '@mui/material/Pagination';
import './styles.css'

export default function PaginationComponent({ page,handlePageChange }) {
  

  return (
    <div className='pagination-component'>
      <Pagination count={10} page={page} onChange={(event,value)=> handlePageChange(event,value)} 
      sx={{
        color: "var(--white)",
        "& .Mui-selected": {
            backgroundColor: "var(--blue) !important",
            color: "var(--white) !important",
            borderColor: "var(--blue)"
        },
        "& .MuiPaginationItem-ellipsis": {
            border: "0px solid var(--red) !important"
        },
        "& .MuiPaginationItem-text": {
            color: "var(--black)",
            border: "1px solid var(--grey)"
        }
      }}/>
    </div>
  );
}