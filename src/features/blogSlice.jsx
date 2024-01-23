import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  imageUrl: "",
  categories: [],
  data: [],
  loading: false,
  error: false,
  totalPages: 1,
  currentPage: '',
  nextPage: 1,
  previousPage: false,
  categoryId: "",
  comments: [],
  content: "",
  likes: [],
  updatedAt: "",
  blogId: "",
  userId: "",
  firstname: "",
  lastName: "",
  username: "",
  myblog : []
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.error = false;
      state.loading = true;
    },
    getBlogSuccess: (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
      state.totalPages = payload.details.pages.total;
      state.currentPage = payload.details.pages.current;
      state.nextPage = payload.details.pages.next;
      state.previousPage = payload.details.pages.previous;
    },
    getMyBlogSuccess: (state, { payload }) => {
      state.myblog = payload.data;
      state.loading = false;
    },
    getBlogCategorySuccess: (state, { payload }) => {
      state.categories = payload.data;
      state.loading = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    setBlogDetails: (state, { payload }) => {
      state.imageUrl = payload.image;
      state.title = payload.title;
      state.loading = false;
      state.error = false;
      state.categoryId = payload.categoryId.name;
      state.comments = payload.comments;
      state.content = payload.content;
      state.likes = payload.likes;
      state.updatedAt = payload.categoryId.updatedAt;
      state.blogId = payload._id;
      state.userId = payload.userId._id;
      state.firstname = payload.userId.firstname;
      state.lastName = payload.userId.lastName;
      state.username = payload.userId.username;
      
    },
  },
});

export const {
  fetchStart,
  getBlogSuccess,
  getBlogCategorySuccess,
  fetchFail,
  setCurrentPage,
  getMyBlogSuccess,
  setBlogDetails,
} = blogSlice.actions;

export default blogSlice.reducer;
