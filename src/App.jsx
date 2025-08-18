import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Signup from './pages/Signup';
import Not_found from './pages/not_found';
import Login from './pages/Login';
import Home from './pages/Home';
import Message from './pages/Message';
import Rootlayout from './component/Rootlayout';
import Userlist from './component/Userlist';


const router = createBrowserRouter([
    {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: Home },
      { path: "message", Component: Message }
    ]
  },

  {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: Home},
      // { path: "/friendrequest", Component: FriendRequestList },
      { path: "/userlist", Component: Userlist },
      // { path: "/blocklist", Component: BlockList },
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
  // {
  //   path: "/",
  //   Component: Home,
  // },
  {
    path: "*",
    Component: Not_found,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
    
  )
}

export default App