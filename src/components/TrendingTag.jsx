import { FiArrowUpRight } from "react-icons/fi";

function TrendingTag({ hashtag, posts }) {
  return (
   <div
  className="
    group
    flex items-start justify-between
    px-3 py-2
    rounded-lg
    cursor-pointer
    transition-all duration-200
    hover:bg-gray-100
    hover:-translate-y-0.5
  "
>
      <div>
       <h4
  className="
    text-[11px]
    font-bold
    text-gray-800
    transition-colors duration-200
    group-hover:text-gray-900
  "
>
          {hashtag}
        </h4>

        <p className="mt-0.5 text-[10px] text-gray-500">
          {posts} posts
        </p>
      </div>

      <FiArrowUpRight
  size={12}
  className="
    mt-1
    text-gray-400
    transition-all duration-200
    group-hover:text-gray-700
    group-hover:translate-x-1
    group-hover:-translate-y-1
  "
/>
    </div>
  );
}

export default TrendingTag;