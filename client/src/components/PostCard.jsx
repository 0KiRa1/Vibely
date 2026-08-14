import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const postWithHashtags = post.content.replace(
    /(#\w+)/g,
    '<span class="text-purple-500 font-semibold">$1</span>'
  );

  const [likes, setLikes] = useState(post.likes_count)
  const currentUser = dummyUserData

  const navigate = useNavigate()

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      
      {/* Header */}
      <div onClick={() => navigate(`/profile/${post.user._id}`)} className="flex items-center gap-3">
        <img
          src={post.user.profile_picture}
          alt=""
          className="w-12 h-12 rounded-full object-cover border border-slate-200"
        />

        <div>
          <div className="flex items-center gap-1">
            <h3 className="font-semibold text-slate-800">
              {post.user.full_name}
            </h3>

            <BadgeCheck
              size={16}
              className="text-sky-500 fill-sky-500"
            />
          </div>

          <p className="text-sm text-slate-500">
            @{post.user.username} • {moment(post.createdAt).fromNow()}
          </p>
        </div>
      </div>

      {/* Content */}
      {post.content && (
        <div
          className="mt-4 text-slate-700 leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: postWithHashtags,
          }}
        />
      )}

      {/* Images */}
      {post.image_urls?.length > 0 && (
        <div
          className={`mt-4 grid gap-2 ${
            post.image_urls.length === 1
              ? "grid-cols-1"
              : "grid-cols-2"
          }`}
        >
          {post.image_urls.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt=""
              className={`w-full rounded-xl object-cover ${
                post.image_urls.length === 1
                  ? "max-h-[500px]"
                  : "h-56"
              }`}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
        <button className="flex items-center gap-2 text-slate-500 hover:text-pink-500 transition">
          <Heart size={20} />
          <span>{post.likes_count}</span>
        </button>

        <button className="flex items-center gap-2 text-slate-500 hover:text-purple-500 transition">
          <MessageCircle size={20} />
          <span>{post.comments_count}</span>
        </button>

        <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition">
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>


    {/* <div className='flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300'>
        <div className='flex items-center gap-1'>
            <Heart className={`w-4 h-4 cursor-pointer ${likes.includes(currentUser. _id) && 'text-red-500 fill-red-500'}` } 
             onClick={handleLike}/>
            <span>{likes.length}</span>
        </div>I

        <div className='flex items-center gap-1'>
            <MessageCircle className="w-4 h-4 cursor-pointer" />
            <span>{12}</span>
        </div>I

        <div className='flex items-center gap-1'>
            <Share2 className="w-4 h-4 cursor-pointer" />
            <span>{10}</span>
        </div>I
    </div> */}
    </div>

  );
};

export default PostCard;