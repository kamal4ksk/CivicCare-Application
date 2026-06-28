import {
  FiMap,
  FiLayers,
  FiMapPin,
  FiUser,
} from "react-icons/fi";

function MapViews({ mapView, setMapView }) {
  const views = [
    {
      id: "district",
      label: "District View",
      icon: FiMap,
    },
    {
      id: "heatmap",
      label: "Heatmap View",
      icon: FiLayers,
    },
    {
      id: "pins",
      label: "Issue Pins",
      icon: FiMapPin,
    },
    {
      id: "reports",
      label: "My Reports",
      icon: FiUser,
    },
  ];

  return (
<div className="absolute top-3 right-3 z-20 w-40 rounded-xl bg-white p-1.5 shadow-md md:top-6 md:right-6 md:w-44 md:p-2 md:rounded-2xl">
      {views.map((view) => {
        const Icon = view.icon;

        return (
          <button
            key={view.id}
            onClick={() => setMapView(view.id)}
            className={`mb-1 flex w-full items-center gap-2 rounded-xl px-3 py-3 text-sm transition
              ${
                mapView === view.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <Icon />
            {view.label}
          </button>
        );
      })}

    </div>
  );
}

export default MapViews;