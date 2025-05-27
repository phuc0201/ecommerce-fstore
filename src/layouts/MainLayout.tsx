import type React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="h-[1000px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
