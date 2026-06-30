import React from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi';

export default function RecentIssuesCard({
  image,
  title,
  location,
  status,
  likes,
  comments,
}) {
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-[#fee2e2] text-[#ef4444]';
      case 'in progress':
        return 'bg-[#fef9c3] text-[#ca8a04]';
      case 'resolved':
        return 'bg-[#dcfce7] text-[#16a34a]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-start p-4 bg-white border border-[#f1f5f9] rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-slate-200 gap-4">
      
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full sm:w-24 h-48 sm:h-24 rounded-xl object-cover flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1 w-full flex flex-col justify-between">
        
        <div>
          {/* Title */}
          <h3 className="text-base sm:text-[17px] font-bold text-slate-900 leading-snug mb-2">
            {title}
          </h3>

          {/* Location + Status */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[13px] mb-3">
            <div className="flex items-center text-slate-500">
              <HiOutlineLocationMarker className="w-4 h-4 mr-1 shrink-0" />
              <span>{location}</span>
            </div>

            <span
              className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full capitalize ${getStatusStyles(
                status
              )}`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Likes & Comments */}
        <div className="flex items-center gap-5 text-[13px]">
          <div className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 cursor-pointer transition-colors group">
            <FiThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">{likes}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 cursor-pointer transition-colors group">
            <FiMessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">{comments}</span>
          </div>
        </div>

      </div>
    </div>
  );
}