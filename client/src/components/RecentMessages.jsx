import React, { useState, useEffect } from "react";
import { dummyRecentMessagesData } from "../assets/assets";
import { Link } from "react-router-dom";
import moment from "moment";

const RecentMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    setMessages(dummyRecentMessagesData);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Recent Messages
      </h3>

      <div className="space-y-3">
        {messages.map((message, idx) => (
          <Link
            key={idx}
            to={`/messages/${message.from_user_id?._id}`}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition"
          >
            <img
              src={message.from_user_id?.profile_picture}
              alt=""
              className="w-12 h-12 rounded-full object-cover border border-slate-200"
            />

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-medium text-slate-800 truncate">
                  {message.from_user_id?.full_name}
                </p>

                <p className="text-xs text-slate-400 ml-2 whitespace-nowrap">
                  {moment(message.createdAt).fromNow()}
                </p>
              </div>

              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-slate-500 truncate">
                  {message.text ? message.text : "📷 Media"}
                </p>

                {!message.seen && (
                  <span className="flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                    1
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;