/**
 * Component 107 - Comment User
 * Reusable row item shown inside the "Comment Info" modal (106).
 *
 * Props:
 *  - name: string
 *  - comment: string
 */
export function CommentUser({ name, comment }) {
  return (
    <div className="p-2.5 bg-gray-50 rounded-xl">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {name.charAt(0)}
        </div>
        <p className="text-sm font-semibold text-gray-900">{name}</p>
      </div>
      <p className="text-xs text-gray-500 pl-9">{comment}</p>
    </div>
  );
}

export default CommentUser;