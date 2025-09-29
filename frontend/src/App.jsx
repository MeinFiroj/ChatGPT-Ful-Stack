import { useDispatch, useSelector } from "react-redux";
import "./App.css";
// import ChatScreen from './pages/Chat-Screen/ChatScreen'
import Nav from "./components/Navbar/Nav";
import MainRoutes from "./routes/MainRoutes";
import { useEffect } from "react";
import { verifyUser } from "./appStore/actions/userActions";
import { useNavigate } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(verifyUser());
    // navigate("/");
    isAuthenticated ? navigate('/') : navigate('/login')
  }, [isAuthenticated]);

  return (
    <div className="app">
      {isAuthenticated ? (
        <>
          <Nav />
          <PrivateRoutes />
        </>
      ) : (
        <MainRoutes />
      )}
    </div>
  );
};

export default App;
