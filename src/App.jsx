import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Message from './pages/Message';
import Rootlayout from './component/Rootlayout';
import Userlist from './component/Userlist';
import BlockList from './component/BlockList';
import FriendRequestList from './component/FriendRequestList';
import FriendListmsg from './component/FriendListmsg';
import EmojiPicker from 'emoji-picker-react';
import Not_found from './pages/Not_found';


const router = createBrowserRouter([
    {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: Home },
      { path: "/message", Component: Message }
    ]
  },

  {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: Home},
      { path: "/friendrequest", Component: FriendRequestList },
      { path: "/userlist", Component: Userlist },
      { path: "/blocklist", Component: BlockList },
    ],
  },

  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/friendListmsg",
    Component: FriendListmsg,
  },
    {
    path: "/emoji",
    Component: EmojiPicker,
  },
  {
    path: "*",
    Component: Not_found,
  }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
    
  )
}

export default App