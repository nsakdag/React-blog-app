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
  const { paramId } = useParams();

  const { deleteBlog, getBlogById ,likeBlog } = useBlogCalls();

  const [open, setOpen] = useState();

  const { imageUrl, title, content, blogId, userId, updatedAt ,likes , comments , countOfVistors} = useSelector((state) => state.blog );
  const { id } = useSelector((state) => state.auth );
  console.log( blogId, userId);

  const navigate = useNavigate();
  const handleDelete = () => {
    deleteBlog(blogId);
    navigate("/myblogs");
  };

  useEffect(() => {
    getBlogById(paramId);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleUpdateBlog = () => {
    handleOpen();
  };
  const handleLike = () => {
    likeBlog(blogId)
   
    
  };
  const fav = likes.includes(id)
  return (
    <div>
      <MyFormModal
      blogDetails={{ imageUrl, title, content, blogId, userId, updatedAt }}
        handleOpen={handleOpen}
        setOpen={setOpen}
        open={open}
      />
      <Container
        component="main"
        maxWidth="md"
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={`${imageUrl}`}
          alt="Logo"
          style={{ maxWidth: "100%", marginRight: 16 }}
        />

        <Grid
          container
          spacing={2}
          mt={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Avatar sx={{ width: 60, height: 60, backgroundColor: "#ffd700" }}>
              <DoneAll />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5"></Typography>
            <Typography variant="body2">{updatedAt}</Typography>
          </Grid>
        </Grid>

        <Box sx={{ marginY: 4 }}>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {content}
          </Typography>
        </Box>

        <Grid textAlign={"center"}>
          {userId && userId === id ? (
            <>
              <Button
                onClick={handleUpdateBlog}
                variant="contained"
                style={{
                  width: "%40",
                  height: "2.5rem",
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
                  height: "2.5rem",

                  borderRadius: "7px",
                }}
              >
                DELETE
              </Button>
            </>
          ) : null}
        </Grid>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <FavoriteIcon sx={btnStyle} onClick={handleLike} style={fav ? { color: "red" } : { color: "black" }}/>
          {likes.length}
          <CommentIcon sx={btnStyle} onClick={() => {}} />
          {comments.length}
          <VisibilityIcon sx={btnStyle} onClick={() => {}} />
          {countOfVistors}
        </div>
      </Container>
    </div>
  );
}

export default BlogDetails;
