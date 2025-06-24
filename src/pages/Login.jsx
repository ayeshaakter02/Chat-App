import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

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
          if(user.emailVerified){
            navigate("/")
          }else{
            toast.error("please verify your email")
          }
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("invalid email or password");
            setUserInfo({
              name: "",
              email: "",
              password: "",
            });
          }
        });
    }else{
      toast.error("email and password is required")
    }
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
                <label htmlFor="email" className="block mt-8 text-white">
                  Enter Your Email:
                </label>
                <input
                  onChange={handleEmail}
                  className="p-2 mt-2 rounded-xl border"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block mt-3 text-white">
                  Password:
                </label>
                <input
                  onChange={handlePassword}
                  className="p-2 rounded-xl border w-full mt-2"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="gray"
                  id="togglePassword"
                  className="bi bi-eye absolute top-3/4 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                </svg>
              </div>
              <button
                className="bg-[#ac4b22] text-[#e7dbd6] py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#8a6455c9] font-medium"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="mt-6  items-center text-gray-100">
              <hr className="border-gray-300" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-300" />
            </div>
            <button className="bg-[#8a6455c9] py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#3b2e224f] font-medium text-white">
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Login with Google
            </button>
            <div className="mt-10 text-sm border-b py-5 playfair tooltip text-[#b99a8e]">
              Forget password?
            </div>
            <div className="mt-4 text-sm flex justify-between items-center container-mr">
              <p className="mr-3 md:mr-0 text-[#b99a8e]">
                If you don't have an account..
              </p>
              <a
                to={"/signup"}
                className=" register text-white bg-[#ac4b22]  rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#8a6455c9] font-semibold duration-300"
              >
                Register
              </a>
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
