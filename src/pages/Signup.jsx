import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { app, auth } from "../firebase.config";
import { Link, useNavigate } from "react-router";
import { getDatabase, ref, set } from "firebase/database";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const db = getDatabase();
  const navigate = useNavigate();

  const handleName = (e) => {
    setUserInfo((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

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

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(userInfo);
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      toast.error("Please fill up the all filed");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInfo.email)) {
      toast.error("Invalid email address");
    } else {
      toast.success("Done");
      createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: userInfo.name,
              photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
              .then(() => {
                const user = userCredential.user;

                set(ref(db, "userslist/" + user.uid), {
                  name: user.displayName,
                  email: user.email,
                })
                  .then(() => {
                    navigate("/login");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                // An error occurred
                console.log(error);
              });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("auth/email-already-in-use")) {
            toast.error("Email already in use");
            setUserInfo({
              name: "",
              email: "",
              password: "",
            });
          }
        });
    }
  };

  return (
    <div>
      <Toaster />
      <section className="min-h-screen flex box-border justify-center items-center bg-[url('../images/bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-[#693405] rounded-2xl flex max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8">
            <h2 className="font-bold text-3xl text-[#b99a8e]">Sign up</h2>
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <div>
                      <label htmlFor="" className="text-white block mt-8">
                        User Name :
                      </label>
                      <input
                        value={userInfo.name}
                        onChange={handleName}
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2 mb-5"
                        type="text"
                        placeholder="Name"
                        name="text"
                    id="text"
                    required=""
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-white">
                        Enter your Email
                      </label>
                      <input
                        value={userInfo.email}
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
                        value={userInfo.password}
                        onChange={handlePassword}
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                        type="password"
                        placeholder="Password"
                        id="password"
                    autoComplete="current-password"
                    required=""
                      />
                    </div>
                <button
                  className="bg-[#ac4b22] text-[#e7dbd6] mt-5 py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#8a6455c9] font-medium"
                  type="submit"
                >
                  Sign up
                </button>
            </form>
            <div className="mt-4 text-sm flex justify-between items-center container-mr">
              <p className="mr-3 md:mr-0 text-[#b99a8e]">
                If you don't have an account..
              </p>
              <Link
                to={"/login"}
                className=" register text-white bg-[#ac4b22]  rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#8a6455c9] font-semibold duration-300"
              >
                Log in
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

export default Signup;
