import React from "react";
import Sidebar from "../component/Sidebar";
import Userlist from "../component/Userlist";
import FriendRequestList from "../component/FriendRequestList";
import FriendList from "../component/FriendList";

const Home = () => {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 w-full">
      <FriendList/>
      <Userlist/>
      <FriendRequestList/>
    </div>
  );
};

export default Home;
