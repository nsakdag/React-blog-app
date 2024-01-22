import * as React from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";



export default function BlogCard({ blog ,page }) {
  const { deleteBlog ,likeBlog } = useBlogCalls();

  const { id } = useSelector((state) => state.auth);
 
  const navigate = useNavigate();
  
//  console.log(blog)
  const handleReadMoreClick = () => {
    navigate(`/BlogDetails/${blog._id}`); // Assuming your "BlogDetails" route expects a parameter named "blogId"
  };
  const truncateContent = (content, maxWords) => {
    const words = content.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return content;
    }
  };

  

  const handleDelete = () => {
    deleteBlog(blog._id ,page);
  };

  return (
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
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          PulieshedDate : {blog.updatedAt}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Content : {truncateContent(blog.content, 1)}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="error"
        height="140"
        image={blog.image}
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
         <div style={{ display :" flex", flexDirection: "column",justifyContent: "center" , alignItems: "center", gap: "6px" }}>
          <Button
            onClick={handleReadMoreClick}
            variant="contained"
            style={{
              width: "100%",
              backgroundColor: "lightgreen",
              borderRadius: "7px",
            }}
          >
            Read More
          </Button>
          {blog.userId === id && (
            <Button
              onClick={handleDelete}
              variant="contained"
              style={{
                width: "100%",
                backgroundColor: "red",
                margin: "5px",
                borderRadius: "7px",
              }}
            >
              DELETE
            </Button>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <FavoriteIcon sx={btnStyle} onClick={() => likeBlog(blog._id)} />
          {blog.likes.length}
          <CommentIcon sx={btnStyle} onClick={() => {}} />
          {blog.comments.length}
          <VisibilityIcon sx={btnStyle} onClick={() => {}} />
          {blog.countOfVisitors}
        </div>
      </CardActions>
    </Card>
  );
}
