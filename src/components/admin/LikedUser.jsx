import { Heart } from 'lucide-react';

/**
 * Component 105 - Liked User
 * Reusable row item shown inside the "Like Info" modal (104).
 *
 * Props:
 *  - name: string
 */
export function LikedUser({ name }) {
  return (
    <div className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        {name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <Heart className="w-3 h-3 text-red-400" />
          <span className="text-xs text-gray-500">Liked this post</span>
        </div>
      </div>
    </div>
  );
}

export default LikedUser;