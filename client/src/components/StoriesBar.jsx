import React, { useEffect, useState } from "react";
import { dummyStoriesData } from "../assets/assets";
import { Plus } from "lucide-react";
import moment from "moment";
import StoryModel from "./StoryModel";
import StoryViewer from "./StoryViewer";

const StoriesBar = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStory, setViewStory] = useState(null)

  const fetchStories = async () => {
    setStories(dummyStoriesData);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar">

      {/* Create Story */}
      <div onClick={()=>setShowModal(true)} className="flex-shrink-0 w-30 h-50 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white">
          <Plus className="w-6 h-6" />
        </div>

        <p className="mt-3 text-sm font-medium text-slate-700">
          Create Story
        </p>
      </div>

      {/* Stories */}
      {stories.map((story, idx) => (
        <div
          onClick={()=>setViewStory(story)}
          key={idx}
          className="relative flex-shrink-0 w-30 h-50 rounded-2xl overflow-hidden cursor-pointer group"
        >
          {story.media_type === "image" ? (
            <img
              src={story.media_url}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : story.media_type === "video" ? (
            <video
              src={story.media_url}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500" />
          )}

          <div className="absolute inset-0 bg-black/20" />

          <img
            src={story.user.profile_picture}
            alt=""
            className="absolute top-3 left-3 w-10 h-10 rounded-full border-2 border-white object-cover"
          />

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-sm font-semibold line-clamp-2">
              {story.content}
            </p>

            <p className="text-xs text-white/80 mt-1">
              {moment(story.createdAt).fromNow()}
            </p>
          </div>
        </div>
      ))}

      {/* Add Story Modal */}

      {
        showModal && <StoryModel setShowModal={setShowModal} fetchStories={fetchStories}/>
      }

      {/* View Story Modal */}

      {
        viewStory && <StoryViewer viewStory = {viewStory} setViewStory = {setViewStory} />
      }

    </div>
  );
};


export default StoriesBar;