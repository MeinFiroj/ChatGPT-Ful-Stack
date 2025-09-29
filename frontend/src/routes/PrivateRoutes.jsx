import { Route, Routes } from "react-router-dom";
import NewChat from "../components/Newchat/NewChat";
import ChatScreen from "../pages/Chatscreen/ChatScreen";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NewChat />} />
      <Route path="/new-chat" element={<NewChat />} />
      <Route path="/:id" element={<ChatScreen/>} />
    </Routes>
  );
};

export default PrivateRoutes;
