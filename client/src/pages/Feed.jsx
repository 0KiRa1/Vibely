import React, { useEffect, useState } from "react";
import { dummyPostsData, assets } from "../assets/assets";
import Loading from "../components/Loading";
import StoriesBar from "../components/StoriesBar";
import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className="min-h-screen bg-slate-50 flex flex-col xl:flex-row gap-6 p-4 md:p-6">

      {/* Main Feed */}
      <div className="flex-1 max-w-4xl">

        {/* Stories */}
        <div className="mb-4">
          <StoriesBar />
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

      </div>

      {/* Right Sidebar */}
      <div className="hidden xl:block w-[380px] space-y-6">

        {/* Sponsored */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          
          <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Sponsored
          </h3>

          <img
            src={assets.sponsored_img}
            alt="Sponsored"
            className="w-full h-48 object-cover rounded-xl"
          />

          <p className="mt-3 font-semibold text-slate-800">
            Email Marketing
          </p>

          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Supercharge your marketing with a powerful, easy-to-use
            platform built for results. Reach more customers and grow
            your business faster.
          </p>

        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <RecentMessages />
        </div>

      </div>

    </div>
  ) : (
    <Loading />
  );
};

export default Feed;