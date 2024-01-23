import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { btnStyle } from "../styles/globalStyles";
import useBlogCalls from "../hooks/useBlogCalls";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

const MyBlogs = () => {
  const { id } = useSelector((state) => state.auth);
  const {myblog:data , likes ,userId ,blogId} = useSelector((state) => state.blog)
  

  console.log(likes);

  const { getMyBlog ,likeBlog } = useBlogCalls();
  

  useEffect(() => {
   getMyBlog(id)
   console.log("clicked")
  }, []);

  


  const navigate = useNavigate();

  
  const truncateContent = (content, maxWords) => {
    // `data` nesnesi henüz gelmediyse, boş bir değer döndür.
    if (!data || !content) {
      return null;
    }

    const words = content.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return content;
    }
  };
 
 
  return ( <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    > {data.length ? ( data.map((item) =>  
      <Card
        sx={{
          maxWidth: 345,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "300px",
          height: "400px",
          p: 2,
        }}
        key={item._id}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            PulieshedDate : {item?.updatedAt}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Content : {truncateContent(item?.content, 1)}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="error"
          height="140"
          image={item?.image}
          sx={{ objectFit: "contain" }}
        />

        <CardActions
          sx={{
            width: "100%",
            justifyContent: "space-between",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <div
            style={{
              display: " flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Button
              onClick={() => navigate(`/BlogDetails/${item?._id}`)}
              variant="contained"
              style={{
                width: "100%",
                backgroundColor: "lightgreen",
                borderRadius: "7px",
              }}
            >
              Read More
            </Button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          
            <CommentIcon sx={btnStyle} onClick={() => {}} />
            {item?.comments?.length}
            <VisibilityIcon sx={btnStyle} onClick={() => {}} />
            {item?.countOfVisitors}
          </div>
        </CardActions>
      </Card> ))  :  ( 
        <Grid   style={{
           
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          
          width :"300px"
        }}>

     <Button 
              onClick={() => navigate("/newblog")}
              variant="contained"
              style={{
                width: "100%",
                backgroundColor: "lightgreen",
                borderRadius: "7px",
              }}
            >
              ADD BLOG
            </Button>
        </Grid>)}
    </div>
  );}
;

export default MyBlogs;
