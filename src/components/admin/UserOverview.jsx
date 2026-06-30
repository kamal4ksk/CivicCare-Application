import { FileText, Flag, Calendar, MapPin } from 'lucide-react';

/**
 * Component 101 - User Overview
 * Stats grid (posts / spam reports / joined date / location) shown inside
 * "User Details" (99), below the profile header (100).
 *
 * Props:
 *  - user: { postsCount, totalSpamReports, joinDate, location }
 *  - onPostsClick?: () => void  scrolls to the posts list (102)
 */
export function UserOverview({ user, onPostsClick }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <button
        onClick={onPostsClick}
        className="p-3 bg-gray-50 rounded-xl text-center hover:bg-blue-50 hover:border hover:border-blue-200 transition-all cursor-pointer"
      >
        <FileText className="w-5 h-5 text-blue-600 mx-auto mb-1" />
        <p className="text-xl font-bold text-gray-900">{user.postsCount}</p>
        <p className="text-xs text-gray-500">Posts ↓</p>
      </button>
      <div className="p-3 bg-gray-50 rounded-xl text-center">
        <Flag className="w-5 h-5 text-red-500 mx-auto mb-1" />
        <p className="text-xl font-bold text-gray-900">{user.totalSpamReports}</p>
        <p className="text-xs text-gray-500">Spam Reports</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-xl text-center">
        <Calendar className="w-5 h-5 text-purple-600 mx-auto mb-1" />
        <p className="text-sm font-bold text-gray-900">
          {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
        <p className="text-xs text-gray-500">Joined</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-xl text-center">
        <MapPin className="w-5 h-5 text-green-600 mx-auto mb-1" />
        <p className="text-sm font-bold text-gray-900 truncate">{user.location.split(',')[0]}</p>
        <p className="text-xs text-gray-500">Location</p>
      </div>
    </div>
  );
}

export default UserOverview;