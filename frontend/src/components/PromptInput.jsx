import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { createChat } from "../appStore/actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../appStore/actions/messageActions";
import { loadSingleMessage, removeMessages } from "../appStore/reducers/messageSlice";

const PromptInput = () => {
  // const { allMessages, setAllMessages } = props;
  const [text, setText] = useState("");
  const submitBtnRef = useRef(null);
  const params = useParams();
  const [socket, setSocket] = useState(null);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { messages } = useSelector((state) => state.message);

  const handleMessage = async () => {
    if (text.trim() === "") return;

    if (pathname === "/" || pathname === "/new-chat") {
      const newChat = await dispatch(createChat(text));

      socket.emit("ai-message", { message: text, chat: newChat.chat.id });

      dispatch(removeMessages())
      dispatch(loadSingleMessage({ content: text, role: "user" }));

      navigate(`/${newChat.chat.id}`);
      setText("");
    } else {
      socket.emit("ai-message", { message: text, chat: params.id });
      dispatch(loadSingleMessage({ content: text, role: "user" })); 
      setText("");
    }
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      transports: ["websocket"],
    });
    setSocket(socketInstance);

    socketInstance.on("ai-response", (data) => {
      dispatch(loadSingleMessage({ content: data.message, role: "model" }));
    });
  }, []);

  useEffect(() => {
    if (text.trim() === "") {
      submitBtnRef.current.style.display = "none";
    } else {
      submitBtnRef.current.style.display = "block";
    }
  }, [text]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="text-area">
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        placeholder="Ask anything"
      />
      <button onClick={handleMessage} ref={submitBtnRef} className="submit">
        <img src="/icons/uparrow.png" alt="" />
      </button>
    </form>
  );
};

export default PromptInput;
