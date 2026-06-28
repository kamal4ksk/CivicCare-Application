import { FiMapPin } from "react-icons/fi";
import NearbyEventCard from "./NearbyEventCard";

function NearbyUpdates() {
  return (
    <div className="rounded-2xl bg-white p-4">

      {/* Header */}
      <div className="mb-4 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500">
          <FiMapPin
            size={16}
            className="text-white"
          />
        </div>

        <h2 className="text-[15px] font-semibold text-gray-800">
          Nearby Updates
        </h2>

      </div>

      <div className="space-y-4">

        <NearbyEventCard
          title="Town Hall Meeting"
          description="Discuss civic improvements with local officials"
          location="City Hall"
          date="June 10, 2026"
          tag="Event"
          bgColor="bg-purple-50"
          tagColor="bg-purple-500"
        />

        <NearbyEventCard
          title="Free Health Checkup Camp"
          description="Community health initiative by Municipal Corp"
          location="Community Center"
          date="June 15, 2026"
          tag="Service"
          bgColor="bg-green-50"
          tagColor="bg-green-500"
        />

        <NearbyEventCard
          title="Road Maintenance Notice"
          description="Main Street will be under repair"
          location="Main Street"
          date="Starting June 8"
          tag="Announcement"
          bgColor="bg-sky-50"
          tagColor="bg-sky-500"
        />

      </div>

      {/* Button */}
      <button
        className="
          mt-4
          w-full
          rounded-xl
          bg-gray-100
          py-2.5
          text-xs
          font-medium
          text-gray-700
          transition
          hover:bg-gray-200
        "
      >
        View All Updates
      </button>

    </div>
  );
}

export default NearbyUpdates;