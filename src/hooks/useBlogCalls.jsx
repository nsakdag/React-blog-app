import {
  fetchStart,
  fetchFail,
  getBlogCategorySuccess,
  getBlogSuccess,
  getMyBlogSuccess,
  setBlogDetails,
} from "../features/blogSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useBlogCalls = () => {
  const { axiosWithToken, axiosPublic } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  // console.log(token);
  const getCategories = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/categories/`
      );
      dispatch(getBlogCategorySuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`bilgiler çekilemedi.`);
    }
  };

  const getBlogs = async (page = 1) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(`/blogs/?page=${page}&limit=7`);
      dispatch(getBlogSuccess(data));

      // console.log(data)
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(` bilgileri çekilemedi.`);
    }
  };
  const getBlogDetails = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(`/blogs/${id}`);
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(` bilgileri çekilemedi.`);
    }
  };
  const getMyBlog = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `https://39220.fullstack.clarusway.com/blogs?author=${id}`
      );
      dispatch(getMyBlogSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(` bilgileri çekilemedi.`);
    }
  };
  const postBlog = async (info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(
        "https://39220.fullstack.clarusway.com/blogs/",
        info
      );
      toastSuccessNotify("Blog kaydı eklenmistir");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Blog kaydı eklenememiştir.");
    }
  };
  const deleteBlog = async (id, page) => {
    // dispatch(fetchStart())
    try {
      await axiosWithToken.delete(
        `https://39220.fullstack.clarusway.com/blogs/${id}`
      );
      toastSuccessNotify(`bilgisi silinmiştir.`);
      getBlogs(page);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`silinemedi`);
    }
  };
  const likeBlog = async (id) => {
    // dispatch(fetchStart())
    try {
      await axiosWithToken.post(
        `https://39220.fullstack.clarusway.com/blogs/${id}/postLike`
      );
      getBlogs();
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("lütfen login olunuz");
      getBlogs();
    }
  };
  const putBlog = async (id, formdata) => {
    // dispatch(fetchStart())
    try {
      await axiosWithToken.put(
        `https://39220.fullstack.clarusway.com/blogs/${id}`,
        formdata
      );
        getBlogById(id)
      navigate(`/BlogDetails/${id}`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("calismadi");
    }
  };
  const getBlogById = async (id) => {
    try {
      const response = await axios.get(
        `https://39220.fullstack.clarusway.com/blogs/${id}`
      );
      console.log(response.data.data);
      dispatch(setBlogDetails(response.data.data));
    } catch (error) {
      console.error("Error fetching blog details by ID:", error);
      throw error;
    }
  };

  return {
    getCategories,
    postBlog,
    getBlogs,
    deleteBlog,
    getMyBlog,
    likeBlog,
    putBlog,
    getBlogDetails,
    getBlogById,
  };
};

export default useBlogCalls;
