import TrendingTopics from "../components/TrendingTopics";
import NearbyUpdates from "../components/NearbyUpdates";
import UserHeader from "../components/UserHeader";

function FeedsPage() {
  return (
    <div className="min-h-screen bg-[#f7f5fb] pb-12">
      <UserHeader />
      
      <main className="mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full max-w-[1180px]">
        <div className="w-[280px] relative">

          {/* Trending Topics */}
          <div className="sticky top-[80px] z-10">
            <TrendingTopics />
          </div>

          {/* Gap + slower overlap */}
          <div className="sticky top-[240px] mt-6 z-20">
            <NearbyUpdates />
          </div>

        </div>
      </main>
    </div>
  );
}

export default FeedsPage;