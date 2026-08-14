import React, { useEffect, useState } from "react";
import { dummyPostsData, dummyUserData } from "../assets/assets";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import UserProfileInfo from "../components/UserProfileInfo";
import PostCard from "../components/PostCard";
import moment from "moment";
import ProfileModel from "../components/ProfileModel";

const Profile = () => {
  const { profileId } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  const fetchUser = async () => {
    setUser(dummyUserData);
    setPosts(dummyPostsData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

        {/* Cover Photo */}
        <div className="relative h-40 md:h-45">
          <img
            src={user.cover_photo}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <UserProfileInfo
          user={user}
          posts={posts}
          profileId={profileId}
          setShowEdit={setShowEdit}
        />
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <div className="mt-6 bg-white rounded-2xl p-2 flex justify-center gap-2">
          {["posts", "media", "likes"].map((tab) => (
            <button
              onClick={()=>setActiveTab(tab)}
              key={tab}
              className={`px-5 py-2 rounded-xl font-medium transition ${
              activeTab === tab
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts */}
        {
          activeTab === "posts" && (
            <div className="mt-4 flex flex-col items-centre gap-6">
              {posts.map((post) => 
                <PostCard key={post._id} post={post}/>
              )}
            </div>
        )}

        {/* Media */}
        {activeTab === "media" && (
          <div className="mt-6 bg-white rounded-3xl border border-slate-200 p-6">
            
            <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Media Gallery
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts
                .filter((post) => post.image_urls?.length > 0)
                .map((post) =>
                  post.image_urls.map((image, index) => (
                    <Link
                      key={`${post._id}-${index}`}
                      target="_blank"
                      to={image}
                      className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={image}
                          alt=""
                          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>

                      <div className="p-3">
                        <p className="text-xs text-slate-500">
                          Posted {moment(post.createdAt).fromNow()}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
            </div>

          </div>
        )}
    </div>

      {/* Edit Profile Modal */}
      {showEdit && <ProfileModel setShowEdit={setShowEdit} />}

    </div>
  ) : (
    <Loading />
  );
};

export default Profile;