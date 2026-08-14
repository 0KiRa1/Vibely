import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { Pencil, X } from "lucide-react";

const ProfileModal = ({ setShowEdit }) => {
  const user = dummyUserData;

  const [editForm, setEditForm] = useState({
    username: user.username || "",
    full_name: user.full_name || "",
    bio: user.bio || "",
    location: user.location || "",
    profile_picture: null,
    cover_photo: null,
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    console.log(editForm);

    setShowEdit(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800">
            Edit Profile
          </h2>

          <button
            onClick={() => setShowEdit(false)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSaveProfile}
          className="p-6 space-y-6"
        >
          {/* Cover Photo */}
          <div>
            <label
              htmlFor="cover_photo"
              className="cursor-pointer block"
            >
              <input
                hidden
                type="file"
                id="cover_photo"
                accept="image/*"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    cover_photo: e.target.files[0],
                  })
                }
              />

              <div className="relative group h-48 rounded-2xl overflow-hidden">
                <img
                  src={
                    editForm.cover_photo
                      ? URL.createObjectURL(editForm.cover_photo)
                      : user.cover_photo
                  }
                  alt=""
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Pencil className="w-6 h-6 text-white" />
                </div>
              </div>
            </label>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center">
            <label
              htmlFor="profile_picture"
              className="cursor-pointer"
            >
              <input
                hidden
                type="file"
                id="profile_picture"
                accept="image/*"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    profile_picture: e.target.files[0],
                  })
                }
              />

              <div className="relative group">
                <img
                  src={
                    editForm.profile_picture
                      ? URL.createObjectURL(
                          editForm.profile_picture
                        )
                      : user.profile_picture
                  }
                  alt=""
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />

                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
              </div>
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Name
            </label>

            <input
              type="text"
              value={editForm.full_name}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  full_name: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Username
            </label>

            <input
              type="text"
              value={editForm.username}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  username: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Bio
            </label>

            <textarea
              rows={4}
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  bio: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Location
            </label>

            <input
              type="text"
              value={editForm.location}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  location: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowEdit(false)}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;