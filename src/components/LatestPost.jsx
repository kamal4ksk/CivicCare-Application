import React, { useState, useEffect, useMemo } from 'react';
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineChatBubbleLeft,
  HiOutlineShare,
  HiOutlineMap,
  HiPaperAirplane,
} from 'react-icons/hi2';
import { toggleLikePost, addComment, getComments } from "../services/postService";

export default function LatestPost({
  id,
  tag,
  categoryColor,
  title,
  text,
  author,
  date,
  location,
  image,
  initialLikes,
  commentCount,
  likes: likesList = []
}) {
  const avatarLetter = author ? author.charAt(0).toUpperCase() : 'U';

  const currentUser = useMemo(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  }, []);

  const [liked, setLiked] = useState(() => {
    if (!currentUser || !likesList) return false;
    return likesList.includes(currentUser._id);
  });
  const [likes, setLikes] = useState(Number(initialLikes) || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    try {
      const response = await getComments(id);
      const mapped = response.data.map(c => ({
        author: c.userId?.name || "Anonymous",
        date: new Date(c.createdAt).toLocaleDateString('en-GB'),
        text: c.text,
        avatarBg: 'bg-gradient-to-br from-[#155DFC] to-[#9810FA]',
      }));
      setComments(mapped);
    } catch (error) {
      console.error("Failed to load comments", error);
    }
  };

  useEffect(() => {
    if (showComments && id) {
      loadComments();
    }
  }, [showComments, id]);

  const handleLike = async () => {
    if (!currentUser) {
      alert("Please login to react to concerns.");
      return;
    }
    try {
      const response = await toggleLikePost(id);
      setLiked(response.data.liked);
      setLikes(response.data.likesCount);
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Post link copied to clipboard!');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please login to comment.");
      return;
    }

    const input = e.target.commentText;
    const value = input.value.trim();

    if (!value) return;

    try {
      await addComment(id, value);
      input.value = '';
      loadComments();
    } catch (error) {
      console.error("Failed to add comment", error);
      alert(error.response?.data?.message || "Failed to submit comment");
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 lg:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#155DFC] to-[#9810FA] text-white flex items-center justify-center font-bold shrink-0">
            {avatarLetter}
          </div>

          <div className="min-w-0">
            <h4 className="font-bold text-slate-900 truncate">
              {author}
            </h4>

            <p className="text-xs text-slate-500 truncate">
              {date} {location && `• ${location}`}
            </p>
          </div>
        </div>

        <span
          className={`self-start sm:self-auto px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase border ${categoryColor}`}
        >
          {tag}
        </span>
      </div>

      {/* Content */}

      <div className="mt-4">
        <h3 className="text-lg font-bold text-slate-900 leading-snug">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-600 leading-7 break-words">
          {text}
        </p>
      </div>

      {/* Image */}

      {image && (
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
          <img
            src={image}
            alt=""
            className="w-full max-h-[420px] object-cover"
          />
        </div>
      )}

      {/* Action Buttons */}

      <div className="mt-5 border-t border-slate-200 pt-4 flex flex-wrap items-center justify-between gap-4">

        <div className="flex flex-wrap items-center gap-4">

          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition ${
              liked
                ? 'text-rose-600'
                : 'text-slate-500 hover:text-rose-600'
            }`}
          >
            {liked ? (
              <HiHeart className="w-5 h-5" />
            ) : (
              <HiOutlineHeart className="w-5 h-5" />
            )}

            <span className="text-sm font-semibold">{likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition"
          >
            <HiOutlineChatBubbleLeft className="w-5 h-5" />
            <span className="text-sm font-semibold">
              {comments.length}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-slate-500 hover:text-purple-600 transition"
          >
            <HiOutlineShare className="w-5 h-5" />
            <span className="text-sm font-semibold">
              Share
            </span>
          </button>
        </div>

        <button
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition"
        >
          <HiOutlineMap className="w-5 h-5" />
          <span className="text-sm font-semibold">
            View on Map
          </span>
        </button>
      </div>
            {/* Comments Section */}
      {showComments && (
        <div className="mt-5 border-t border-slate-200 pt-5 space-y-4">

          {/* Existing Comments */}
          {comments.map((comment, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <div
                className={`w-9 h-9 rounded-full ${comment.avatarBg} text-white flex items-center justify-center font-bold shrink-0`}
              >
                {comment.author.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0 bg-slate-100 rounded-xl p-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="font-semibold text-sm text-slate-900">
                    {comment.author}
                  </span>

                  <span className="text-xs text-slate-500">
                    {comment.date}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-700 break-words">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}

          {/* Add Comment */}
      <form
  onSubmit={handleCommentSubmit}
  className="flex flex-col sm:flex-row gap-3"
>
  <input
    type="text"
    name="commentText"
    placeholder="Write a comment..."
    required
    className="
      flex-1
      h-12 sm:h-11
      px-4
      py-3
      rounded-xl
      border border-slate-300
      text-sm
      outline-none
      focus:border-[#155DFC]
      focus:ring-2 focus:ring-blue-100
      bg-white
    "
  />

  <button
    type="submit"
    className="
      w-full sm:w-12
      h-12
      rounded-xl
      bg-gradient-to-r
      from-[#155DFC]
      to-[#9810FA]
      flex
      items-center
      justify-center
      text-white
      hover:opacity-90
      transition
    "
  >
    <HiPaperAirplane className="w-5 h-5 -rotate-45" />
  </button>
</form>
        </div>
      )}
    </div>
  );
}