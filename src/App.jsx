import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Signup from './pages/Signup';
import Not_found from './pages/not_found';
import Login from './pages/Login';
import Home from './pages/Home';


const router = createBrowserRouter([
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Home,
  },
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