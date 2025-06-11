import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Not_found from './pages/not_found';


const router = createBrowserRouter([
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/signin",
    Component: Signin,
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