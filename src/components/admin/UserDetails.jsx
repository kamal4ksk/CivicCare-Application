import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle, Ban, User } from 'lucide-react';
import { UserProfile } from './UserProfile';
import { UserOverview } from './UserOverview';
import { PostsUserManage } from './PostsUsermanage';
import { LikeInfoModal } from './LikeInfo';
import { CommentInfoModal } from './CommentInfo';

const mockLikers = ['Ananya K.', 'Rajan M.', 'Priya S.', 'Devika R.', 'Arun P.', 'Nisha T.', 'Vishnu L.', 'Meera J.'];
const mockCommenters = [
  { name: 'Rajan M.', comment: 'This needs urgent attention!' },
  { name: 'Priya S.', comment: 'I noticed this too last week.' },
  { name: 'Devika R.', comment: 'Please fix this ASAP.' },
  { name: 'Arun P.', comment: 'Reported to municipality already.' },
  { name: 'Nisha T.', comment: 'Glad someone brought this up.' },
];

function getLikers(postId, count) {
  const seed = postId.charCodeAt(0);
  const result = [];
  for (let i = 0; i < Math.min(count, mockLikers.length); i++) {
    result.push(mockLikers[(seed + i) % mockLikers.length]);
  }
  return result;
}

function getCommenters(postId, count) {
  const seed = postId.charCodeAt(0);
  const result = [];
  for (let i = 0; i < Math.min(count, mockCommenters.length); i++) {
    result.push(mockCommenters[(seed + i) % mockCommenters.length]);
  }
  return result;
}

/**
 * Component 99 - User Details
 * Right-hand panel of the Manage User page (96). Shows the selected user's
 * profile (100), overview stats (101), their posts (102), and provides
 * Send Email / Suspend actions. Also wires up Like (104) / Comment (106) modals.
 *
 * Props:
 *  - user: full user object including posts: array
 *      { id, name, email, phone, joinDate, postsCount, totalSpamReports, role,
 *        isSuspended, location, posts: [...] }
 *  - onSuspendToggle: (user) => void
 */
export function UserDetails({ user, onSuspendToggle }) {
  const postsRef = useRef(null);
  const [engagementModal, setEngagementModal] = useState(null); // { type: 'likes' | 'comments', post }

  if (!user) {
    return (
      <motion.div
        key="empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <User className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-gray-500">Select a user to view their details</p>
      </motion.div>
    );
  }

  const userPosts = user.posts || [];

  return (
    <>
      <motion.div
        key={user.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-5"
      >
        <UserProfile user={user} />

        <UserOverview
          user={user}
          onPostsClick={() => postsRef.current?.scrollIntoView({ behavior: 'smooth' })}
        />

        <div ref={postsRef}>
          <PostsUserManage
            userName={user.name}
            posts={userPosts}
            onLikesClick={(post) => setEngagementModal({ type: 'likes', post })}
            onCommentsClick={(post) => setEngagementModal({ type: 'comments', post })}
          />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
          <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            Send Email
          </button>
          <button
            onClick={() => onSuspendToggle?.(user)}
            className={`flex-1 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              user.isSuspended
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            {user.isSuspended ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Reactivate Profile
              </>
            ) : (
              <>
                <Ban className="w-4 h-4" />
                Suspend Profile
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Engagement Modals */}
      <LikeInfoModal
        isOpen={engagementModal?.type === 'likes'}
        post={engagementModal?.post}
        likers={engagementModal ? getLikers(engagementModal.post.id, engagementModal.post.likes) : []}
        onClose={() => setEngagementModal(null)}
      />
      <CommentInfoModal
        isOpen={engagementModal?.type === 'comments'}
        post={engagementModal?.post}
        commenters={engagementModal ? getCommenters(engagementModal.post.id, engagementModal.post.comments) : []}
        onClose={() => setEngagementModal(null)}
      />
    </>
  );
}

export default UserDetails;