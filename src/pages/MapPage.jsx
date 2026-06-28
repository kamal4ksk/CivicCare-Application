import PostStatus from "../components/PostStatus";
import MapFilters from "../components/MapFilters";
import Map from "../components/Map";
import MapViews from "../components/MapViews";
import IssueIntensity from "../components/IssueIntensity";
import TopIssuesMap from "../components/TopIssuesMap";
import UserHeader from "../components/UserHeader";
import DistrictDetails from "../components/DistrictDetails";

import { useState } from "react";

function MapPage() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [mapView, setMapView] = useState("district");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  return (
    <div className="min-h-screen bg-[#f7f5fb] ">

    <UserHeader />

      {/* Main Container */}
      <div className="mx-auto py-4 px-4 w-full max-w-[1180px]">

        {/* 46 */}
        <PostStatus />

        {/* Map Section */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-[320px_1fr] overflow-hidden rounded-2xl md:rounded-b-2xl bg-white border border-slate-100/80 shadow-xs">

          {/* Sidebar */}
          <div className="bg-white border-b md:border-b-0 md:border-r border-slate-100 flex flex-col items-center md:items-stretch">
            <MapFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedPriority={selectedPriority}
              setSelectedPriority={setSelectedPriority}
            />
            <TopIssuesMap
              mapView={mapView}
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
              selectedPriority={selectedPriority}
            />
          </div>

          {/* Map Container */}
          <div className="relative h-[450px] md:h-[720px]">

            <Map
              mapView={mapView}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
            />

            {/* Map Views Control */}
            <MapViews
              mapView={mapView}
              setMapView={setMapView}
            />

            {/* Issue Intensity Legend */}
            <IssueIntensity mapView={mapView} />

            {/* District Details Drawer */}
            <DistrictDetails
              district={selectedDistrict}
              onClose={() => setSelectedDistrict(null)}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default MapPage;