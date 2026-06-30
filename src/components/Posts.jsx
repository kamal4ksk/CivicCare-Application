import React, { useState } from 'react';
import {
  HiOutlineShare,
  HiOutlineInformationCircle,
  HiOutlineChartBar,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineHeart,
  HiOutlineChatBubbleLeftRight,
  HiOutlineEye,
} from 'react-icons/hi2';
import LikeCard from './LikeCard';

export default function Posts({
  tag,
  categoryColor,
  title,
  text,
  author,
  date,
  interactions,
  stats,
  onShare,
  onReport,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-[0_2px_12px_-5px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-slate-200">

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <span
          className={`text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${categoryColor}`}
        >
          {tag}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={onShare}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <HiOutlineShare className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={onReport}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <HiOutlineInformationCircle className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2">
        {title}
      </h4>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-6 mb-4 break-words">
        {text}
      </p>

      {/* Author */}
      <div className="text-xs text-slate-400 mb-4">
        By {author} • {date}
      </div>

      {/* Expand Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition"
      >
        <div className="flex items-center gap-3">
          <HiOutlineChartBar className="w-5 h-5 text-blue-600" />

          <div className="text-left">
            <p className="text-sm font-semibold text-slate-700">
              Engagement Insights
            </p>

            <p className="text-xs text-slate-400">
              {interactions} total interactions
            </p>
          </div>
        </div>

        {isOpen ? (
          <HiOutlineChevronUp className="w-5 h-5 text-slate-500" />
        ) : (
          <HiOutlineChevronDown className="w-5 h-5 text-slate-500" />
        )}
      </button>

      {/* Statistics */}
      {isOpen && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <LikeCard
            icon={HiOutlineHeart}
            count={stats.likes}
            label="Likes"
            iconColor="text-red-500"
          />

          <LikeCard
            icon={HiOutlineChatBubbleLeftRight}
            count={stats.comments}
            label="Comments"
            iconColor="text-blue-500"
          />

          <LikeCard
            icon={HiOutlineShare}
            count={stats.shares}
            label="Shares"
            iconColor="text-green-500"
          />

          <LikeCard
            icon={HiOutlineEye}
            count={stats.views}
            label="Views"
            iconColor="text-purple-500"
          />
        </div>
      )}
    </div>
  );
}