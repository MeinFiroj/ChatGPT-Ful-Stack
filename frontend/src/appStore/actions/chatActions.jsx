import axios from "../../axios.config";
import { loadChats } from "../reducers/chatSlice";

export const getChats = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/api/chat/");
    dispatch(loadChats(data.chats));
  } catch (error) {
    console.log(error);
  }
};

export const createChat = (title) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/api/chat/", { title });
    dispatch(getChats())
    return data;

  } catch (error) {
    console.log(error);
  }
};
