import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login/`,
        userInfo
      );
console.log(data.user._id);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login işlemi basarili.");
      navigate("/newblog");
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login işlemi başarisiz oldu.");
      console.log(error);
      console.log(userInfo);
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
        headers: { Authorization: `Token ${token}` },
      });

      toastSuccessNotify("Çıkış işlemi başarili.");
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Çıkış işlemi başarisiz oldu.");
    }
  };

  return { login, logout };
};

export default useAuthCalls;
