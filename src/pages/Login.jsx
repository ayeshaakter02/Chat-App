import React, { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase.config";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { getDatabase, ref, set } from "firebase/database";
import { FcGoogle } from "react-icons/fc";
import { userLoginInfo } from "../slices/userSlice";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const db = getDatabase();

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setUserInfo((prev) => {
      return { ...prev, email: e.target.value };
    });
  };

  const handlePassword = (e) => {
    setUserInfo((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("submit");
    if (userInfo.email && userInfo.password) {
      signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          if (user.emailVerified) {
            dispatch(userLoginInfo(user)); //set data in redux
            navigate("/");
          } else {
            toast.error("please verify your email or password");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("Email already in use");
            toast.error("invalid email or password");
            setUserInfo({
              name: "",
              email: "",
              password: "",
            });
          }
        });
    } else {
      toast.error("email and password is required");
    }
  };

  const handleGoogleSignin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        set(ref(db, "userlist/" + user.uid), {
          name: user.displayName,
          email: user.email,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });

        dispatch(userSigninInfo(user));
        navigate("/");
      })
      .catch((error) => {
        // Handle errors here
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  return (
    <div>
      <Toaster />
      <section className="min-h-screen flex box-border justify-center items-center bg-[url('../images/bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-[#693405] rounded-2xl flex max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8">
            <h2 className="font-bold text-3xl text-[#b99a8e]">Login</h2>
            <p className="text-sm mt-4 text-[#959fb1]">
              If you already a member, easily log in now.
            </p>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="text-white block mt-8">
                  Enter your Email
                </label>
                <input
                  onChange={handleEmail}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2 mb-5"
                  type="email"
                  placeholder="Email"
                  name="email"
                    id="email"
                    autoComplete="email"
                    required=""
                />
              </div>
              <div>
                <label htmlFor="password" className="text-white">
                  Enter Your Password
                </label>
                <input
                  onChange={handlePassword}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                  type="password"
                  placeholder="Password"
                  name="password"
                    id="password"
                    autoComplete="current-password"
                    required=""
                />
              </div>
              <button
                className="bg-[#ac4b22] text-[#e7dbd6] py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#8a6455c9] font-medium"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="mt-6  items-center text-gray-100">
              <p className="text-center text-sm">OR</p>
            </div>
            <button
              onClick={handleGoogleSignin}
              type="submit"
              className="bg-[#8a6455c9] py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#3b2e224f] font-medium text-white"
            >
              <FcGoogle className="mr-2 text-xl" />
              Continue with google
            </button>

            <div className="mt-4 text-sm flex justify-between items-center container-mr">
              <p className="mr-3 md:mr-0 text-[#b99a8e]">
                If you don't have an account..
              </p>
              <Link
                to={"/signup"}
                className=" register text-white bg-[#ac4b22]  rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#8a6455c9] font-semibold duration-300"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl max-h-[1600px]"
              src="../images/coffee.jpg"
              alt="signin form image"
            />
            <img alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
