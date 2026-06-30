import { RecentPostCard } from './RecentPostcard';

/**
 * Component 92 - Admin Recent Posts
 * "Recent Posts" section shown on the Admin Dashboard.
 *
 * Props:
 *  - posts: array of { id, title, author, status, createdAt }  (already sliced to desired count)
 */
export function AdminRecentPosts({ posts = [] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
        <span className="text-sm text-gray-500">{posts.length} posts</span>
      </div>

      <div className="space-y-3">
        {posts.map((post, i) => (
          <RecentPostCard key={post.id} post={post} delay={i * 0.05} />
        ))}
        {posts.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">No posts yet</p>
        )}
      </div>
    </div>
  );
}

export default AdminRecentPosts;