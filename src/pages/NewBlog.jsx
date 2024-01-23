import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { modalStyle } from "../styles/globalStyles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import useBlogCalls from "../hooks/useBlogCalls";
import { useNavigate } from "react-router-dom";

export default function NewBlog() {
  const { categories } = useSelector((state) => state.blog);
  const navigate = useNavigate();

  const { getCategories, postBlog } = useBlogCalls();
  useEffect(() => {
    getCategories();
  }, []);

  const [status, setStatus] = useState(["Draft", "Published"]);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    categoryId: "",
    isPublished: true,
    content: "",
    status: "Draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postBlog(formData);
    navigate("/");
  };

  return (
    <div>
      <Box sx={modalStyle}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Title"
            name="title"
            type="text"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Image Url"
            name="image"
            type="text"
            variant="outlined"
            value={formData.image}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              name="categoryId"
              value={formData.categoryId}
              label="Category"
              onChange={handleChange}
            >
              {categories.map((item) => (
                <MenuItem key={item.name} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              name="status"
              value={formData.status}
              label="Status"
              onChange={handleChange}
            >
              {status.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextareaAutosize
            minRows={6}
            name="content"
            placeholder="Enter your text here..."
            value={formData.content}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
          <Button type="submit" variant="contained" size="large">
            NEW BLOG
          </Button>
        </Box>
      </Box>
    </div>
  );
}
