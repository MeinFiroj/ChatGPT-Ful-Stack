import { useEffect, useRef, useState } from "react";
import "./Newchat.css";
import PromptInput from "../PromptInput";
const NewChat = () => {
  return (
    <div className="newchat">
      <h1>Hey Firoj, How are you doing now</h1>
      
      <PromptInput />
    </div>
  );
};

export default NewChat;
