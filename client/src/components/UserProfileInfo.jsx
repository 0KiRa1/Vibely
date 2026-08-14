import { Calendar, MapPin, PenBox, BadgeCheck } from "lucide-react";
import moment from "moment";
import React from "react";

const UserProfileInfo = ({ user, posts, profileId, setShowEdit }) => {
  return (
    <div className="bg-white">
      <div className="relative">
        {/* Profile Image */}
        <div className="absolute -bottom-12 left-6">
          <img
            src={user.profile_picture}
            alt=""
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 px-6 pb-6">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-slate-900">
                {user.full_name}
              </h1>

              <BadgeCheck className="w-6 h-6 text-sky-500 fill-sky-500" />
            </div>

            <p className="text-slate-500 mt-1">
              {user.username
                ? `@${user.username}`
                : "Add a username"}
            </p>
          </div>

          {!profileId && (
            <button
              onClick={() => setShowEdit(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-medium shadow-md hover:shadow-lg transition"
            >
              <PenBox className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Bio */}
        <p className="mt-4 text-slate-600 leading-relaxed max-w-4xl">
          {user.bio}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 mt-4 text-sm text-slate-500">

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {user.location || "Add a location"}
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Joined{" "}
            <span className="font-medium text-slate-700">
              {moment(user.created_at).fromNow()}
            </span>
          </div>

        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-4 pt-4 border-t border-slate-200">
          <div>
            <span className="font-bold text-3xl">
              {posts.length}
            </span>
            <span className="ml-2 text-slate-500">
              Posts
            </span>
          </div>

          <div>
            <span className="font-bold text-3xl">
              {user.followers?.length || 0}
            </span>
            <span className="ml-2 text-slate-500">
              Followers
            </span>
          </div>

          <div>
            <span className="font-bold text-3xl">
              {user.following?.length || 0}
            </span>
            <span className="ml-2 text-slate-500">
              Following
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfileInfo;