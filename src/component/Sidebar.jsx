import React, { useEffect } from 'react'
import { userLoginInfo } from '../slices/userSlice';
import { Link, useLocation, useNavigate } from 'react-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
    const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin.value);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          userLoginInfo({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
          }),
        );
        //user is signed in
        // ...
      } else {
        dispatch(userLoginInfo(null));
        navigate("/login");
        // User is signed out
        // ...
      }
    });
  }, [dispatch]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/Login");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
  <div className="bg-white">
    <div className="md:flex lg:h-full lg:w-70 bg-white border-r">
      <div className="mx-auto relative flex xl:h-full max-h-full flex-col">
        <h1 className="text-2xl font-bold cursor-pointer text-[#ac4b22] duration-150 flex items-center  gap-x-2 p-4 sm:py-0.5 md:p-4 sm:my-2.5 md:my-0 xl:my-8">
          {user?.name}
        </h1>
        <ul className="space-y-1 flex lg:flex-col gap-8 ml-3">
          <li className="flex space-x-2 cursor-pointer hover:text-[#ac4b22] duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <Link to={"/"} className="font-semibold">Home</Link>
          </li>
          <li className="flex space-x-2 cursor-pointer hover:text-[#ac4b22] duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <Link to={"/message"} className="font-semibold">Message</Link>
          </li>
          <button onClick={handleLogout} className=" bg-[#ac4b22] hover:bg-[#693405] rounded-lg text-white flex cursor-pointer items-center gap-x-3.5 px-2.5 py-2 sm:py-0 md:py-2 text-md -mt-2">
            Log Out
          </button>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Sidebar;