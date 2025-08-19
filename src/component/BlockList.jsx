import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { auth } from "../firebase.config";

const BlockList = () => {
  const db = getDatabase();
  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    const requestRef = ref(db, "blockList/");
    onValue(requestRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().blockbyuser 
        ){
            array.push({ ...item.val(), id: item.key });
        }
          
      });
      setBlockList(array);
    });
  }, []);

  const handleUnblock = (item) =>{
    if(auth.currentUser.uid == item.blockbyuser) {
      set(push(ref(db, "friendList/")), {
              senderid: item.blockbyuser,
              sendername: item.blockbyusername,
              receiverid: item.blockuser,
              receivername: item.blockusername,
            }).then(() => {
              remove(ref(db, "blockList/" + item.id));
            });
    }else{
      set(push(ref(db, "friendList/")), {
              senderid: item.blockuser,
              sendername: item.blockusername,
              receiverid: item.blockbyuser,
              receivername: item.blockbyusername,
            }).then(() => {
              remove(ref(db, "blockList/" + item.id));
            });
    }
  }

  return (
    <>
      {/* component */}
      {/* This is an example component */}
      <div className="border border-[#ac4b22] rounded-2xl p-4 m-4 h-120">
        <h1 className="text-[#ac4b22] font-bold text-xl">Block List</h1>
        <ul
          role="list"
          className=" divide-gray-100  h-100 overflow-y-scroll pr-2"
        >
          {blockList.map((item) => (
            <li className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="size-12 flex-none rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  {auth.currentUser.uid == item.blockbyuser ? (
                    <div>
                      <p className="text-md font-semibold text-gray-900">
                        {item.blockusername}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-md font-semibold text-gray-900">
                        {item.blockbyusername}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUnblock(item)}
                  className="bg-[#ac4b22] text-white font-medium rounded-2xl flex justify-center items-center p-2 cursor-pointer"
                >
                  Unblock
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BlockList;
