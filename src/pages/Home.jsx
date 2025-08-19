import React from "react";
import Sidebar from "../component/Sidebar";
import Userlist from "../component/Userlist";
import FriendRequestList from "../component/FriendRequestList";
import FriendList from "../component/FriendList";
import BlockList from "../component/BlockList";

const Home = () => {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 w-full">
      <FriendList/>
      <Userlist/>
      <FriendRequestList/>
      <BlockList/>
    </div>
  );
};

export default Home;
