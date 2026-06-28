import { FiTrendingUp } from "react-icons/fi";
import TrendingTag from "./TrendingTag";

function TrendingTopics() {
  return (
    <div className="w-full rounded-lg bg-white">

      <div className="flex items-center gap-2 px-4 py-3">

        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-orange-400">
          <FiTrendingUp
            size={12}
            className="text-white"
          />
        </div>

        <h3 className="text-sm font-semibold text-gray-800">
          Trending Topics
        </h3>

      </div>

      <div className="space-y-1 px-3 pb-3">

        <TrendingTag
          hashtag="#INFRASTRUCTURE"
          posts="234"
        />

        <TrendingTag
          hashtag="#ENVIRONMENT"
          posts="189"
        />

        <TrendingTag
          hashtag="#ROADSAFETY"
          posts="156"
        />

        <TrendingTag
          hashtag="#CORRUPTION"
          posts="98"
        />

      </div>

    </div>
  );
}

export default TrendingTopics;