import { useState } from "react";
import ChatsRecord from "../ChatsRecord";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [buttons, setButtons] = useState([
    {
      text: "New chat",
      imgUrl: "/icons/newchat.png",
    },
    {
      text: "Search chats",
      imgUrl: "/icons/search.png",
    },
    {
      text: "Library",
      imgUrl: "/icons/library.png",
    },
    {
      text: "Sora",
      imgUrl: "/icons/sora.png",
    },
    {
      text: "GPTs",
      imgUrl: "/icons/gpts.png",
    },
    {
      text: "New project",
      imgUrl: "/icons/newproject.png",
    },
  ]);

  return (
    <div className="nav">
      <div className="top">
        <button onClick={() => navigate("/new-chat")} className="btn">
          <img src="/icons/chatgpt.png" alt="" />
        </button>
        <button className="btn menu">
          <img src="/icons/menu.png" alt="" />
        </button>
      </div>
      <div className="other-features">
        {buttons.map((item, idx) => {
          if (item.text === "New chat") {
            return (
              <button key={idx} onClick={() => navigate("/new-chat")} className="btn feature-btn">
                <img src={item.imgUrl} alt="Buttons" />
                <span>{item.text}</span>
              </button>
            );
          }
          return (
            <button key={idx} className="btn feature-btn">
              <img src={item.imgUrl} alt="Buttons" />
              <span>{item.text}</span>
            </button>
          );
        })}
      </div>
      <div className="chat-cont">
        <h3>Chats</h3>
        <ChatsRecord />
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default Nav;
