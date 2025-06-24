import React from "react";
import Sidebar from "../component/Sidebar";
import Userlist from "../component/Userlist";

const Home = () => {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 w-full">
      <Userlist/>
    </div>
  );
};

export default Home;
