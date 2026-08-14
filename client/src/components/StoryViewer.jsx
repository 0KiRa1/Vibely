import React, { useEffect } from "react";
import { useState } from "react";
import { BadgeCheck, X } from "lucide-react";
import moment from "moment";

const StoryViewer = ({ viewStory, setViewStory }) => {

  const [progress, setprogress] = useState(0)

  useEffect(() => {
    let timer, interval;

    if (viewStory && viewStory.media_type !== "video") {
      setprogress(0)
       const duration = 10000;
       const setTime = 100;
       let elapsed = 0;

        interval = setInterval(() => {
         elapsed += setTime;
         setprogress((elapsed / duration) * 100);
       }, setTime);

        timer = setTimeout(() => {
          setViewStory(null);
        }, duration);

        return () => {
          clearInterval(interval);
          clearTimeout(timer);
        };
    }

  }, [viewStory, setViewStory])


  const handleClose = () => {
    setViewStory(null);
  };

  if (!viewStory) {
    return null;
  }

  const renderContent = () => {
    switch (viewStory.media_type) {
      case "image":
        return (
          <img
            src={viewStory.media_url}
            alt=""
            className="w-full h-full object-cover"
          />
        );

      case "video":
        return (
          <video
            src={viewStory.media_url}
            autoPlay
            controls
            onEnded={() => setViewStory(null)}
            className="w-full h-full object-cover"
          />
        );

      case "text":
        return (
          <div
            className="w-full h-full flex items-center justify-center p-8 text-center"
            style={{
              background:
                viewStory.background_color ||
                "linear-gradient(135deg,#ec4899,#a855f7,#3b82f6)",
            }}
          >
            <p className="text-white text-2xl md:text-3xl font-bold leading-relaxed">
              {viewStory.content}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">

      {/* Background Click Close */}
      <div
        className="absolute inset-0"
        onClick={handleClose}
      />

      {/* Story Card */}
      <div className="relative w-full max-w-[400px] h-[85vh] rounded-3xl overflow-hidden bg-black shadow-2xl">

        {/* Progress */}
        <div className="absolute top-3 left-3 right-3 z-30">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Header */}
        <div className="absolute top-6 left-4 right-4 z-30 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <img
              src={viewStory.user?.profile_picture}
              alt=""
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />

            <div>
              <div className="flex items-center gap-1">
                <p className="text-white font-medium text-sm">
                  {viewStory.user?.full_name}
                </p>

                <BadgeCheck
                  size={16}
                  className="text-sky-400 fill-sky-400"
                />
              </div>

              <p className="text-xs text-white/70">
                {moment(viewStory.createdAt).fromNow()}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>

        </div>

        {/* Story Content */}
        <div className="w-full h-full">
          {renderContent()}
        </div>

        {/* Caption */}
        {viewStory.media_type !== "text" &&
          viewStory.content && (
            <div className="absolute bottom-4 left-4 right-4 z-30">

              <div className="bg-black/40 backdrop-blur-md rounded-2xl px-4 py-3">

                <p className="text-white text-sm line-clamp-3">
                  {viewStory.content}
                </p>

              </div>

            </div>
          )}

      </div>

    </div>
  );
};

export default StoryViewer;