import type React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import ChatBot from "../components/chatbot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <Outlet />
      <Footer />
      <ChatBot />
    </>
  );
};

export default MainLayout;
