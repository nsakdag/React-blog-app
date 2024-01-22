import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  imageUrl: [],
  categories: [],
  data: [],
  loading: false,
  error: false,
  totalPages : 1 ,
  currentPage : 0,
  nextPage : 1,
  previousPage : false ,
  
  
  
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
      state.totalPages = payload.details.pages.total
      state.currentPage = payload.details.pages.current
      state.nextPage = payload.details.pages.next
      state.previousPage = payload.details.pages.previous
    },
    getMyBlogSuccess: (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
    
    },
    getBlogCategorySuccess: (state,  {payload} ) => {
      state.categories = payload.data;
      state.loading = false;
      
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
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
} = blogSlice.actions;

export default blogSlice.reducer;
