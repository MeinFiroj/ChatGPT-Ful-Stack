import { Route, Routes } from "react-router-dom";
// import ChatScreen from "../pages/Chat-Screen/ChatScreen";
// import NewChat from "../components/Newchat/NewChat";
import Register from "../pages/User/Register";
import Login from "../pages/User/Login";
// import { useSelector } from "react-redux";

const MainRoutes = () => {
  

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default MainRoutes;
