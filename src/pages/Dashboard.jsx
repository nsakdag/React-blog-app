import { useEffect, useState } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import BlogCard from "../pages/BlogCard";
import Buttons from "./Buttons";

const Dashboard = () => {
  const { getBlogs } = useBlogCalls();
  const { data, error, loading, totalPages, currentPage, nextPage } =useSelector((state) => state.blog);
  

  const [page, setPage] = useState(currentPage);
  useEffect(() => {
    getBlogs(page);
  }, [page]);
 

  return (
    <div>
      {!loading && !error && data.length > 0 && (
        <>
          <Grid container gap={2} mt={3} justifyContent={"center"}>
            {data?.map((blog) => (
              <Grid item key={blog._id}>
                <BlogCard  page={page} blog={blog} />
              </Grid>
            ))}
          </Grid>
          <Grid  container  mt={3} mb={3} justifyContent="center">
          <Buttons  setPage={setPage}  />

          </Grid>
               </>
      )}
    </div>
  );
};

export default Dashboard;
