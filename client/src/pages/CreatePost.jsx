import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { Image, X } from "lucide-react";
import { toast } from "react-hot-toast";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = dummyUserData;

  const handleSubmit = async () => {
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Create Post
        </h1>

        <p className="text-slate-500 mt-2">
          Share your thoughts, ideas, and experiences with the world.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5">

        {/* User */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user.profile_picture}
            alt=""
            className="w-14 h-14 rounded-full object-cover border border-slate-200"
          />

          <div>
            <h2 className="font-semibold text-slate-800">
              {user.full_name}
            </h2>

            <p className="text-sm text-slate-500">
              @{user.username}
            </p>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="What's on your mind?"
          className="w-full min-h-[180px] p-4 border border-slate-200 rounded-2xl outline-none resize-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition"
        />

        {/* Images Preview */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="w-full h-40 object-cover"
                />

                <button
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="absolute top-2 right-2 bg-black/60 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">

          <label
            htmlFor="images"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer transition"
          >
            <Image className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">
              Add Images
            </span>
          </label>

          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setImages([
                ...images,
                ...Array.from(e.target.files || []),
              ])
            }
          />

          <button
            disabled={loading}
            onClick={()=> toast.promise(handleSubmit(), {
              loading: "Publishing...",
              success: "Post published successfully!",
              error: "Error publishing post!"
            })}
            className="px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90 transition"
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default CreatePost;