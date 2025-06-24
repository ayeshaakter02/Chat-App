import React from "react";

const Userlist = () => {
  return (
    <div className="border border-[#ac4b22] rounded-2xl p-4 m-4 h-120">
        <h1 className="text-[#ac4b22] font-bold text-xl">User List</h1>
      <ul role="list" className=" divide-gray-100  h-100 overflow-y-scroll pr-2">
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="size-12 flex-none rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-md font-semibold text-gray-900">
                Leslie Alexander
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                leslie.alexander@example.com
              </p>
            </div>
          </div>
          <button className="bg-[#ac4b22] text-white font-medium rounded-2xl flex justify-center items-center p-2 cursor-pointer">
            Add Friend
          </button>
        </li>
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="size-12 flex-none rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                Michael Foster
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                michael.foster@example.com
              </p>
            </div>
          </div>
             <button className="bg-[#ac4b22] text-white font-medium rounded-2xl flex justify-center items-center p-2 cursor-pointer">
            Add Friend
          </button>
        </li>
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="size-12 flex-none rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                Dries Vincent
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                dries.vincent@example.com
              </p>
            </div>
          </div>
             <button className="bg-[#ac4b22] text-white font-medium rounded-2xl flex justify-center items-center p-2 cursor-pointer">
            Add Friend
          </button>
        </li>
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="size-12 flex-none rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                Courtney Henry
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                courtney.henry@example.com
              </p>
            </div>
          </div>
             <button className="bg-[#ac4b22] text-white font-medium rounded-2xl flex justify-center items-center p-2 cursor-pointer">
            Add Friend
          </button>
        </li>
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="size-12 flex-none rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">Tom Cook</p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                tom.cook@example.com
              </p>
            </div>
          </div>
             <button className="bg-[#ac4b22] text-white font-medium rounded-2xl flex justify-center items-center p-2 cursor-pointer">
            Add Friend
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Userlist;
