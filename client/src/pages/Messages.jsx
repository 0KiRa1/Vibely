import React from "react";
import { dummyConnectionsData } from "../assets/assets";
import { Search, MessageSquare, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Messages
          </h1>

          <p className="text-slate-500 mt-1">
            Talk to your friends and family
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition"
          />
        </div>

        {/* Connections Card */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

          <div className="p-5 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">
              Connections
            </h2>
          </div>

          <div className="divide-y divide-slate-100">

            {dummyConnectionsData.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-all duration-200"
              >

                {/* Profile */}
                <div className="relative">
                  <img
                    src={user.profile_picture}
                    alt=""
                    className="w-14 h-14 rounded-full object-cover border border-slate-200"
                  />

                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">
                    {user.full_name}
                  </p>

                  <p className="text-sm text-slate-500">
                    @{user.username}
                  </p>

                  <p className="text-sm text-slate-400 truncate mt-1">
                    {user.bio}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">

                  <button
                    onClick={() => navigate(`/messages/${user._id}`)}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-sm hover:scale-105 transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Messages;