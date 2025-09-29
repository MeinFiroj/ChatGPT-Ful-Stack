import { toast } from "react-toastify";
import axios from "../../axios.config";
import { loadUser } from "../reducers/userSlice";

export const registerUser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/api/auth/register", user);
    dispatch(loadUser(data.user));
    toast.success(data.message);
  } catch (error) {
    const { data } = error?.response;
    toast.error(data.message);
    console.log("userActions : Registration error ", error);
  }
};

export const loginUser = (user) => async (dispatch, getState)=> {
  try {
    const { data } = await axios.post("/api/auth/login", user);
    dispatch(loadUser(data.user));
    toast.success(data.message);
  } catch (error) {
    const { data } = error?.response;
    toast.error(data.message);
    console.log("userActions : Registration error ", error);
  }
}

export const verifyUser = ()=> async (dispatch, getState)=>{
  try {
    const {data} = await axios.get('/api/auth/verifyuser')
    dispatch(loadUser(data.user))
  } catch (error) {
    console.log(error)
  }
}
