import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useSelector } from "react-redux";

export default function Buttons({setPage }) {

    const {  previousPage, nextPage  ,currentPage ,totalPages} =useSelector((state) => state.blog);
   
   

    
  return (
    <ButtonGroup   variant="contained" aria-label="outlined primary button group">
      <Button  disabled={previousPage === false} onClick={() => setPage(previousPage)}>PREV</Button>
      <Button disabled={totalPages === currentPage} onClick={() => setPage(nextPage)}>NEXT</Button>
      
    </ButtonGroup>
  );
}