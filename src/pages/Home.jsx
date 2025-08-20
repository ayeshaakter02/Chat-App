import React from "react";
import Sidebar from "../component/Sidebar";
import Userlist from "../component/Userlist";
import FriendRequestList from "../component/FriendRequestList";
import FriendList from "../component/FriendList";
import BlockList from "../component/BlockList";

const Home = () => {
  return (
    <>
      <div className=" w-full xl:gap-8 xl:grid xl:grid-cols-2 hidden">
        <FriendList />
        <FriendRequestList />
        <Userlist />
        <BlockList />
      </div>
      <div className="xl:hidden ">
        <FriendList />
      </div>
    </>
  );
};

export default Home;
