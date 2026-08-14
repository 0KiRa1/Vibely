import React from "react";
import { dummyUserData } from "../assets/assets";
import {
  MapPin,
  MessageCircle,
  Plus,
  UserPlus,
} from "lucide-react";

const UserCard = ({ user }) => {
  const currentUser = dummyUserData;

  const isFollowing =
    currentUser?.following?.includes(user._id);

  const isConnected =
    currentUser?.connections?.includes(user._id);

  const handleFollow = async () => {};

  const handleConnectionRequest = async () => {};

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300">

      {/* User Info */}
      <div className="flex flex-col items-center text-center">

        <img
          src={user.profile_picture}
          alt=""
          className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
        />

        <h3 className="mt-4 font-semibold text-slate-800">
          {user.full_name}
        </h3>

        {user.username && (
          <p className="text-sm text-slate-500">
            @{user.username}
          </p>
        )}

        {user.bio && (
          <p className="text-sm text-slate-400 mt-2 line-clamp-2">
            {user.bio}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 space-y-2 text-sm text-slate-500">

        {user.location && (
          <div className="flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
          </div>
        )}

        <div className="text-center">
          <span className="font-semibold text-slate-700">
            {user.followers?.length || 0}
          </span>{" "}
          Followers
        </div>

      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-5">

        <button
          disabled={isFollowing}
          onClick={handleFollow}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition ${
            isFollowing
              ? "bg-slate-100 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:opacity-90"
          }`}
        >
          <UserPlus className="w-4 h-4" />

          {isFollowing ? "Following" : "Follow"}
        </button>

        <button
          onClick={handleConnectionRequest}
          className="flex items-center justify-center px-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
        >
          {isConnected ? (
            <MessageCircle className="w-5 h-5 text-slate-700" />
          ) : (
            <Plus className="w-5 h-5 text-slate-700" />
          )}
        </button>

      </div>
    </div>
  );
};

export default UserCard;