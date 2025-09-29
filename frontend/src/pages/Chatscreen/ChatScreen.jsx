import "./Chatscreen.css";
import { useSelector } from "react-redux";
import PromptInput from "../../components/PromptInput";
import Markdown from "react-markdown";
import { useEffect, useRef, useState } from "react";

const ChatScreen = () => {
  const { messages } = useSelector((state) => state.message);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chatscreen">
      <div className="messages-cont">
        <div className="messages">
          {messages.map((msg, idx) => {
            return (
              <div className={`message ${msg.role}`} key={idx}>
                <Markdown>{msg.content}</Markdown>
              </div>
            );
          })}
          <div ref={messagesEndRef} /> 
        </div>
      </div>
      <div className="prompt-input-cont">
        <PromptInput/>
      </div>
    </div>
  );
};

export default ChatScreen;
