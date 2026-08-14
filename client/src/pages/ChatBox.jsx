import React, { useEffect, useRef, useState } from "react";
import { dummyMessagesData, dummyUserData } from "../assets/assets";
import { ImageIcon, SendHorizontal } from "lucide-react";
import { X } from "lucide-react";


const ChatBox = () => {
  const messages = dummyMessagesData;

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [user] = useState(dummyUserData);

  const messagesEndRef = useRef(null);

  const sendMessage = async () => {};

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    user && (
      <div className="h-screen flex flex-col bg-slate-50">

        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
          <img
            src={user.profile_picture}
            alt=""
            className="w-12 h-12 rounded-full object-cover border border-slate-200"
          />

          <div>
            <h3 className="font-semibold text-slate-800">
              {user.full_name}
            </h3>

            <p className="text-sm text-slate-500">
              @{user.username}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

          {messages
            .toSorted(
              (a, b) =>
                new Date(a.created_at) -
                new Date(b.created_at)
            )
            .map((message, index) => {
              const isMine =
                message.to_user_id === user._id;

              return (
                <div
                  key={index}
                  className={`flex ${
                    isMine
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-md rounded-2xl px-4 py-3 shadow-sm ${
                      isMine
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-white border border-slate-200 text-slate-700 rounded-bl-md"
                    }`}
                  >
                    {message.message_type === "image" && (
                      <img
                        src={message.media_url}
                        alt=""
                        className="w-100 rounded-xl mb-2"
                      />
                    )}

                    {message.text && (
                      <p className="text-md  break-words">
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

          <div ref={messagesEndRef} />
        </div>

        {/* Image Preview */}
        {image && (
          <div className="relative w-20 h-20">
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="w-20 h-20 rounded-xl object-cover border border-slate-200"
            />

            <button
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Input */}
        <div className="bg-white border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">

            <label
              htmlFor="image"
              className="cursor-pointer p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
            >
              <ImageIcon className="w-5 h-5 text-slate-600" />

              <input
                type="file"
                id="image"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setImage(e.target.files?.[0])
                }
              />
            </label>

            <input
              type="text"
              placeholder="Type a message..."
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              className="flex-1 px-4 py-3 border border-slate-200 rounded-2xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />

            <button
              onClick={sendMessage}
              disabled={!text && !image}
              className="p-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:opacity-90 transition disabled:opacity-50"
            >
              <SendHorizontal className="w-5 h-5" />
            </button>

          </div>
        </div>

      </div>
    )
  );
};

export default ChatBox;