import React from 'react';
import {  useSelector } from 'react-redux';



const PaginationComponent = () => {

  const {totalPages , totalRecords } = useSelector((state) => state.blog);



let pages = [];

for (let i = 1; i <= Math.ceil(totalRecords/totalPages); i++) {
    pages.push(i);
}


  return (
    <div className='pagination'>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? "active" : ""}>
                        {page}
                    </button>
                );
            })}
        </div>
  );
};

export default PaginationComponent;
