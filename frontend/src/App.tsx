import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./components/Home";
import { Menu } from "./components/Menu";
import About from "./components/About";
import Comments from "./components/Comments";
import Navbar from "./components/Navbar";

// Auth pages
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Forgot from "./components/auth/Forgot";
import Verify from "./components/auth/Verify";
import Reset from "./components/auth/Reset";

// init auth
import { useAppDispatch } from "./store/hooks";
import { fetchMe } from "./store/authSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/comments" element={<Comments />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/reset" element={<Reset />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
