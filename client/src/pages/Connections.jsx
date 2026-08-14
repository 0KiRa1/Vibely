import React, { useState } from "react";
import {
  Users,
  UserPlus,
  UserCheck,
  UserRoundPen,
  MessageSquare,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnections,
} from "../assets/assets";

const Connections = () => {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState("Followers");

  const dataArray = [
    {
      label: "Followers",
      value: followers,
      icon: Users,
    },
    {
      label: "Following",
      value: following,
      icon: UserCheck,
    },
    {
      label: "Pending",
      value: pendingConnections,
      icon: UserRoundPen,
    },
    {
      label: "Connections",
      value: connections,
      icon: UserPlus,
    },
  ];

  const currentUsers =
    dataArray.find((item) => item.label === currentTab)?.value || [];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Connections
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your connections and friends
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {dataArray.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-6 h-6 text-purple-500" />

                  <span className="text-2xl font-bold text-slate-800">
                    {item.value.length}
                  </span>
                </div>

                <p className="mt-3 text-slate-600 font-medium">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {dataArray.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.label}
                onClick={() => setCurrentTab(tab.label)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  currentTab === tab.label
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-4 h-4" />

                <span>{tab.label}</span>

                <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">
                  {tab.value.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Users */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col items-center text-center">

                <img
                  src={user.profile_picture}
                  alt=""
                  className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                />

                <h3 className="mt-4 font-semibold text-slate-800">
                  {user.full_name}
                </h3>

                <p className="text-sm text-slate-500">
                  @{user.username}
                </p>

                <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                  {user.bio}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mt-5">

                  <button
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                  >
                    <Eye className="w-4 h-4" />
                    Profile
                  </button>

                  {currentTab === "Following" && (
                    <button className="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition">
                      Unfollow
                    </button>
                  )}

                  {currentTab === "Pending" && (
                    <button className="px-4 py-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition">
                      Accept
                    </button>
                  )}

                  {currentTab === "Connections" && (
                    <button
                      onClick={() => navigate(`/messages/${user._id}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Connections;