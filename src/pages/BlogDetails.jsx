import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Container,
  Paper,
  Grid,
  Typography,
  Avatar,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import { DoneAll, Code, Settings } from "@mui/icons-material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { btnStyle } from "../styles/globalStyles";
import useBlogCalls from "../hooks/useBlogCalls";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import MyFormModal from "./MyFormModal";
// import { btnStyle } from "../styles/globalStyles";

function BlogDetails() {
  const { blogId } = useParams();
  const [blogDetails, setBlogDetails] = useState({ data: {} });
  const { id } = useSelector((state) => state.auth);
  const { deleteBlog } = useBlogCalls();
  console.log(id);

  const [ open ,setOpen] = useState()
  

  const { data, error, loading, totalPages, currentPage, nextPage } = useSelector((state) => state.blog);

  const [page, setPage] = useState(currentPage);

  const getBlogById = async () => {
    try {
      const response = await axios.get(
        `https://39220.fullstack.clarusway.com/blogs/${blogId}`
      );
      console.log(response.data);
      setBlogDetails(response.data);
    } catch (error) {
      console.error("Error fetching blog details by ID:", error);
      throw error;
    }
  };
console.log(data);
  const navigate = useNavigate();
  const handleDelete = () => {
    deleteBlog(blogDetails.data._id );
    navigate("/")
  };

  useEffect(() => {
    const fetchData = async () => {
      const blogDetails = await getBlogById();
      // Process and set blog details as needed
    };

    fetchData();
  }, []);

  if (!blogDetails || !blogDetails.data) {
    return <div>Loading...</div>;
  }

  console.log(blogDetails);
  // Render blog details using blogDetails

  const handleOpen = () => {
    setOpen(true);
  };

  const handleUpdateBlog = () => {
    handleOpen();
    
  };
  console.log(blogDetails);

  return (
    <div>
      <MyFormModal  blogDetails={blogDetails} handleOpen={handleOpen} setOpen={setOpen}  open={open}/>
      <Container component="main" maxWidth="md" sx={{ marginTop: 4,display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
        <img
          src={`${blogDetails.data.image}`}
          alt="Logo"
          style={{ maxWidth: "100%", marginRight: 16 }}
        />

        <Grid container spacing={2} mt={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 60, height: 60, backgroundColor: "#ffd700" }}>
              <DoneAll />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5"></Typography>
            <Typography variant="body2">
              {blogDetails.data.updatedAt}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ marginY: 4 }}>
          <Typography variant="h4">{blogDetails.data.title}</Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {blogDetails.data.content}
          </Typography>
        </Box>


        <Grid  textAlign={"center"}>
          {blogDetails.data.userId && blogDetails.data.userId._id === id ? (
            <>
              <Button
                onClick={handleUpdateBlog}
                variant="contained"
                style={{
                  width: "%40",
                  height : "2.5rem" ,
                  backgroundColor: "lightgreen",
                  borderRadius: "7px",
                }}
              >
                Update
              </Button>
              <Button
                onClick={handleDelete}
                variant="contained"
                style={{
                  width: "%40",
                  backgroundColor: "red",
                  margin: "5px",
                  height : "2.5rem" ,

                  borderRadius: "7px",
                }}
              >
                DELETE
              </Button>
            </>
          ) : null}
        </Grid>
      </Container>
    </div>
  );
}

export default BlogDetails;
