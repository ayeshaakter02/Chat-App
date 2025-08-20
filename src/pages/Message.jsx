import React, { useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import FriendListmsg from "../component/FriendListmsg";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase.config";
import moment from "moment";
import { Link } from "react-router";
import EmojiPicker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
const Message = () => {
  const db = getDatabase();
  const user = useSelector((state) => state.chatInfo.value);
  let [msg, setMsg] = useState("");
  const [msglist, setMsglist] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  let handleMsg = (e) => {
    setMsg(e.target.value);
  };

  let handleSendmsg = () => {
    set(push(ref(db, "msgList/")), {
      senderid: auth.currentUser.uid,
      sendername: auth.currentUser.displayName,
      receiverid: user.id,
      receivername: user.name,
      msg: msg,
      date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
    }).then(() => {
      setMsg("");
      toast.success("msg send successfull");
    });
  };

  useEffect(() => {
    const requestRef = ref(db, "msgList/");
    onValue(requestRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          (auth.currentUser.uid == item.val().senderid &&
            user?.id == item.val().receiverid) ||
          (auth.currentUser.uid == item.val().receiverid &&
            user?.id == item.val().senderid)
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setMsglist(array);
    });
  }, [user?.id]);

  const handleEmoji = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = (emojiData) => {
    setMsg((prev) => prev + emojiData.emoji);
  };

  return (
    <>
      <Toaster />
      {/* component */}
      {/* This is an example component */}
      <div className="m-3 mx-auto w-full rounded-lg shadow-lg backdrop-blur-xl ">
        {/* Chatting */}
        <div className="flex flex-row justify-between">
          {/* chat list */}
          <div className="">
            <div className="text-2xl font-bold text-[#ac4b22] md:text-3xl">
              GoingChat
            </div>
            <FriendListmsg />
          </div>

          {/* end chat list */}
          {/* message */}

          <div className="w-full flex-col justify-between px-5 xl:flex">
            <div className="flex items-center justify-between border-b-2 border-[#693405] px-5 py-2 xl:py-5 ">
              <IoIosArrowBack className="text-3xl font-semibold text-[#ac4b22] sm:hidden" />

              <h1 className="text-xl md:text-3xl font-semibold text-[#ac4b22]">
                {user?.name}
              </h1>
            </div>
            <div className="bg-[url('../images/chat-bg.jpg')] bg-cover bg-center bg-no-repeat">
              <div className="mt-5 mr-0 flex h-90 sm:h-40 md:h-170 lg:h-135 xl:h-180 flex-col overflow-y-scroll ">
                {msglist.map((msgitem) =>
                  msgitem.senderid == auth.currentUser.uid ? (
                    <div className="mb-4">
                      <div className="flex justify-end">
                        <div className="mr-2 rounded-tl-3xl rounded-tr-xl rounded-bl-3xl bg-[#693405] px-4 py-3 text-white">
                          {msgitem.msg}
                        </div>
                        <img
                          src="images/user.jpg"
                          className="h-8 w-8 rounded-full object-cover"
                          alt=""
                        />
                      </div>
                      <p className="mr-2 flex justify-end px-4 text-[#693405]">
                        {moment(msgitem.date, "YYYYMMDD,h:mm").fromNow()}
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <div className="flex justify-start">
                        <img
                          src="images/user.jpg"
                          className="h-8 w-8 rounded-full object-cover"
                          alt=""
                        />
                        <div className="ml-2 rounded-tl-xl rounded-tr-3xl rounded-br-3xl bg-[#693405] px-4 py-3 text-white">
                          {msgitem.msg}
                        </div>
                      </div>
                      <p className="mr-2 px-4 text-[#693405]">
                        {moment(msgitem.date, "YYYYMMDD,h:mm").fromNow()}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {user && (
              <div>
                <div className="relative inline-block py-5">
                  <MdEmojiEmotions
                    onClick={handleEmoji}
                    className="absolute z-1 -mt-8 ml-3 text-2xl text-[#693405] xl:-mt-4"
                  />
                  {showPicker && (
                    <div className="absolute -mt-128">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        searchDisabled={true}
                        theme="dark"
                        skinTonesDisabled={true}
                      />
                    </div>
                  )}
                  <textarea
                    onChange={handleMsg}
                    className="fixed -mt-10 w-7/13 rounded-xl bg-[rgba(172,75,34,.5)] px-10 py-2  md:w-5/7 lg:w-5/7 xl:-mt-8 xl:w-6/8"
                    type="text"
                    value={msg}
                    placeholder="Type your message here..."
                  />
                  <button
                    onClick={handleSendmsg}
                    className="absolute ml-42 sm:ml-87 md:ml-125 lg:ml-138 xl:ml-280 z-1 -mt-8 text-2xl text-[#693405] xl:-mt-4"
                  >
                    <RiSendPlaneFill />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* end message */}
        </div>
      </div>
    </>
  );
};

export default Message;
