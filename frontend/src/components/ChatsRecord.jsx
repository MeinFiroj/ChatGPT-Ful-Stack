import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getChats } from "../appStore/actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../appStore/actions/messageActions";

const ChatsRecord = () => {
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chat);
  const [activeChatId, setActiveChatId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChatClick = (chatId) => {
    setActiveChatId(chatId);
    dispatch(getMessages(chatId));
    navigate(`/${chatId}`);
  };

  useEffect(() => {
    dispatch(getChats());
  }, []);

  useEffect(()=>{
    
  }, [id])

  return (
    <div className="chats-record">
      {chats.map((chat) => {
        return (
          <div
            key={chat._id}
            className={`chat-item ${activeChatId === chat._id ? "active" : ""}`}
            onClick={() => handleChatClick(chat._id)}
          >
            {chat.title}
          </div>
        );
      })}
    </div>
  );
};

export default ChatsRecord;
