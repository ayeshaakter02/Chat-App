import React from "react";
import { Link } from "react-router";

const Not_found = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Image */}
      <div className=" lg:block lg:w-1/2 bg-[#8d644a] ">
        <img
          src="https://images.unsplash.com/photo-1549415697-8e9a0872f910?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Lost man in desert"
          className="h-screen px-6 mx-auto"
        />
      </div>
      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-6  lg:px-8">
        <div className="text-center max-w-md">
          <p className="text-base font-semibold text-green-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link 
              to={"/Signup"}
              className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link href="/Contact" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Not_found;
