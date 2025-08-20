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
    <div className="sm:ml-15 md:ml-30 xl:ml-0 md:w-150 xl:w-auto md:mt-20 xl:mt-0">
      <div className="border border-[#ac4b22] rounded-2xl p-4 sm:py-1.5 md:p-8 m-4 h-107">
        <h1 className="text-[#ac4b22] font-bold text-xl">User List</h1>
        <div className="flow-root h-[330px] sm:h-40 md:h-[300px] overflow-y-scroll">
          {userList.map((item) => {
            return (
              <ul role="list" className="">
                {checkFriendId.includes(auth.currentUser.uid + item.id) ||
                checkFriendId.includes(item.id + auth.currentUser.uid) ? (
                  <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <img
                        className="size-12 flex-none rounded-full bg-gray-50"
                        src="images/user.jpg"
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-md font-semibold text-[#693405]">
                          {item.name}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-[#693405]">
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
                        src="images/user.jpg"
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-md font-semibold text-[#693405]">
                          {item.name}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-[#693405]">
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
                        src="images/user.jpg"
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-md font-semibold text-[#693405]">
                          {item.name}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-[#693405]">
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
                        src="images/user.jpg"
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-md font-semibold text-[#693405]">
                          {item.name}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-[#693405]">
                          {item.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleFriendrequest(item)}
                      className="bg-[#ac4b22] text-white font-medium rounded-2xl flex justify-center items-center p-2 cursor-pointer"
                    >
                      Add Friend
                    </button>
                  </li>
                )}
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Userlist;
