import {
  ArrowLeft,
  Sparkles,
  TextIcon,
  Upload
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const StoryModel = ({ setShowModal, fetchStories }) => {
  const bgColors = [
    "#ec4899",
    "#a855f7",
    "#3b82f6",
    "#4f46e5",
    "#ca8a04",
    "#0d9488",
  ];

  const [mode, setMode] = useState("text");
  const [background, setBackground] = useState(bgColors[0]);

  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMode("media");
    }
  };

  const handleCreateStory = async () => {
    console.log({
      text,
      media,
      background,
      mode,
    });

    setShowModal(false);
    fetchStories();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">

          <button
            onClick={() => setShowModal(false)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-semibold text-slate-800">
            Create Story
          </h2>

          <div className="w-9" />

        </div>

        {/* Preview */}
        <div
          style={{ backgroundColor: background }}
          className="h-80 rounded-2xl flex items-center justify-center overflow-hidden"
        >

          {mode === "text" && (
            <textarea
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-full bg-transparent text-white text-center text-xl font-medium resize-none outline-none p-6 placeholder:text-white/70"
            />
          )}

          {mode === "media" && previewUrl && (
            media?.type.startsWith("image") ? (
              <img
                src={previewUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={previewUrl}
                controls
                className="w-full h-full object-cover"
              />
            )
          )}

        </div>

        {/* Colors */}
        <div className="flex gap-2 mt-4 justify-center">

          {bgColors.map((color) => (
            <button
              key={color}
              onClick={() => setBackground(color)}
              className={`w-8 h-8 rounded-full transition-all ${
                background === color
                  ? "ring-4 ring-purple-200 scale-110"
                  : ""
              }`}
              style={{ backgroundColor: color }}
            />
          ))}

        </div>

        {/* Modes */}
        <div className="grid grid-cols-2 gap-3 mt-5">

          <button
            onClick={() => {
              setMode("text");
              setMedia(null);
              setPreviewUrl(null);
            }}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition ${
              mode === "text"
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            <TextIcon size={18} />
            Text
          </button>

          <label
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium cursor-pointer transition ${
              mode === "media"
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaUpload}
              className="hidden"
            />

            <Upload size={18} />
            Photo/Video
          </label>

        </div>

        {/* Create Button */}
        <button
          onClick={() =>
            toast.promise(handleCreateStory(), {
              loading: "Saving...",
              success: "Story Added",
              error: (e) => e.message,
            })
          }
          className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          <Sparkles size={18} />
          Create Story
        </button>

      </div>

    </div>
  );
};

export default StoryModel;