import React from "react";
import { Outlet, useLocation } from "react-router";
import Sidebar from "./Sidebar";
import Homebar from "./Homebar";

const Rootlayout = () => {
  const { pathname } = useLocation();
  return (
    <main className="h-screen bg-[url('../images/Signup_image.jpg')] bg-cover bg-center bg-no-repeat lg:flex xl:gap-4">
      <Sidebar />
      <div
        className={`lg:absolute lg:left-100 lg:w-130 xl:hidden ${pathname == "/message" && "hidden"}`}
      >
        <Homebar />
      </div>
      <Outlet />
    </main>
  );
};

export default Rootlayout;
