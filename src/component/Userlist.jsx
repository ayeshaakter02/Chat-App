import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase.config";

const Userlist = () => {
  const [userList, setUserList] = useState([]);
  const [checkRequestId, setCheckRequestId] = useState([]);
  const [checkFriendId, setCheckFriendId] = useState([]);
  const [checkBlockId, setCheckBlockId] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    const userListRef = ref(db, "userslist/");
    onValue(userListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (item.key != auth.currentUser.uid) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(array);
    });
  }, []);

  //check request
  useEffect(() => {
    const requestRef = ref(db, "friendrequestList/");
    onValue(requestRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().receiverid);
      });
      setCheckRequestId(array);
    });
  }, []);

  //check friend
  useEffect(() => {
    const requestRef = ref(db, "friendList/");
    onValue(requestRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().receiverid);
      });
      setCheckFriendId(array);
    });
  }, []);

  //check block
  useEffect(() => {
    const requestRef = ref(db, "blockList/");
    onValue(requestRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        array.push(item.val().blockbyuser + item.val().blockuser);
      });
      setCheckBlockId(array);
    });
  }, []);

  const handleFriendrequest = (item) => {
    set(push(ref(db, "friendrequestList/")), {
      sendername: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      receivername: item.name,
      receiverid: item.id,
    }).then(() => {
      console.log("friendrequest");
    });
  };

  return (
    <div className="border border-[#ac4b22] rounded-2xl p-4 m-4 h-120">
      <h1 className="text-[#ac4b22] font-bold text-xl">User List</h1>
      {userList.map((item) => {
        return (
          <ul
            role="list"
            className=" divide-gray-100  h-100 overflow-y-scroll pr-2"
          >
            {checkFriendId.includes(auth.currentUser.uid + item.id) ||
            checkFriendId.includes(item.id + auth.currentUser.uid) ? (
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="size-12 flex-none rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-md font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {item.email}
                    </p>
                  </div>
                </div>
                <button className="bg-[#ac4b22] text-white font-medium rounded-2xl flex justify-center items-center p-2 cursor-pointer">
                  Friend
                </button>
              </li>
            ) : checkRequestId.includes(auth.currentUser.uid + item.id) ||
              checkRequestId.includes(item.id + auth.currentUser.uid) ? (
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="size-12 flex-none rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-md font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {item.email}
                    </p>
                  </div>
                </div>
                <button className="bg-[#ac4b22] text-white font-medium rounded-2xl flex justify-center items-center p-2 cursor-pointer">
                  Requested
                </button>
              </li>
            ) : checkBlockId.includes(auth.currentUser.uid + item.id) ||
              checkBlockId.includes(item.id + auth.currentUser.uid) ? (
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="size-12 flex-none rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-md font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {item.email}
                    </p>
                  </div>
                </div>
                <button className="bg-[#ac4b22] text-white font-medium rounded-2xl flex justify-center items-center p-2 cursor-pointer">
                  Block
                </button>
              </li>
            ) : (
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="size-12 flex-none rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-md font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {item.email}
                    </p>
                  </div>
                </div>
                <button onClick={()=>handleFriendrequest(item)} className="bg-[#ac4b22] text-white font-medium rounded-2xl flex justify-center items-center p-2 cursor-pointer">
                  Add Friend
                </button>
              </li>
            )}

            {/* <li className="flex justify-between gap-x-6 py-5">
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
        </li> */}
          </ul>
        );
      })}
    </div>
  );
};

export default Userlist;
