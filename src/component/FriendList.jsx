import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { auth } from "../firebase.config";

const FriendList = () => {
  const db = getDatabase();
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const requestRef = ref(db, "friendList/");
    onValue(requestRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().senderid ||
          auth.currentUser.uid == item.val().receiverid
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setRequestList(array);
    });
  }, []);

  const handleBlock = (item) => {
    if (auth.currentUser.uid == item.senderid) {
      console.log("receiver", item);
      set(push(ref(db, "blockList/")), {
        blockbyuser: item.senderid,
        blockbyusername: item.sendername,
        blockuser: item.receiverid,
        blockusername: item.receivername,
      }).then(() => {
        remove(ref(db, "friendList/" + item.id));
      });
    } else {
      console.log("sender", item);
      set(push(ref(db, "blockList/")), {
        blockbyuser: item.receiverid,
        blockbyusername: item.receivername,
        blockuser: item.senderid,
        blockusername: item.sendername,
      }).then(() => {
        remove(ref(db, "friendList/" + item.id));
      });
    }
  };

  return (
    <>
      {/* component */}
      {/* This is an example component */}
      <div className="border border-[#ac4b22] rounded-2xl p-4 m-4 h-120">
        <h1 className="text-[#ac4b22] font-bold text-xl">Friend List</h1>
        <ul
          role="list"
          className=" divide-gray-100  h-100 overflow-y-scroll pr-2"
        >
          {requestList.map((item) => (
            <li className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="size-12 flex-none rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  {auth.currentUser.uid == item.senderid ? (
                    <div>
                      <p className="text-md font-semibold text-gray-900">
                        {item.receivername}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        {item.email}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-md font-semibold text-gray-900">
                        {item.sendername}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBlock(item)}
                  className="bg-[#ac4b22] text-white font-medium rounded-2xl flex justify-center items-center p-2 cursor-pointer"
                >
                  Block
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FriendList;