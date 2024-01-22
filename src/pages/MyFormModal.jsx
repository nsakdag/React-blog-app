import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useBlogCalls from '../hooks/useBlogCalls';
import { modalStyle } from '../styles/globalStyles';
import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize } from '@mui/material';


const MyFormModal = ({  blogDetails   , open , setOpen}) => {

  const navigate = useNavigate();

  const { getCategories, putBlog } = useBlogCalls();
 
  const handleClose = () => {
    setOpen(false);

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    putBlog(blogDetails.data._id , formData);
    handleClose();
  
    
    

  };
  const { categories } = useSelector((state) => state.blog);

  useEffect(() => {
    getCategories();
  }, []);

  const [status, setStatus] = useState(["Draft", "Published"]);

  const [formData, setFormData] = useState({
    title: blogDetails.data.title,
    image: blogDetails.data.image,
    categoryId: "",
    isPublished: true,
    content: "",
    _id : blogDetails._id,
    userId : blogDetails.userId,
    isPublished :true
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  return (
    <div>
      

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
              required
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
            required
          />
          <Button type="submit" variant="contained" size="large">
            UPDATE BLOG
          </Button>
        </Box>
      </Box>
      </Modal>
    </div>
  );
};

export default MyFormModal;
