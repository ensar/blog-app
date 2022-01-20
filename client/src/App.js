import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import NotFound from "./components/404";
import Posts from "./components/Posts.js";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PostDetail from "./components/Posts.js/PostDetail.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer position="top-center" autoClose={1500} />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:id" element={<PostDetail />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
