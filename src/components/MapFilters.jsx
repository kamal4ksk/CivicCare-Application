import {
  FiSearch,
  FiMapPin,
  FiFilter,
} from "react-icons/fi";
import { FaLayerGroup } from "react-icons/fa";

function MapFilters({
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
}) {
  const categories = [
    "All",
    "Infrastructure",
    "Water",
    "Electricity",
    "Garbage",
    "Corruption",
    "Safety",
    "Other",
  ];

  const statuses = ["All", "Pending", "In Progress", "Resolved"];
  const priorities = ["All", "High", "Medium", "Low"];

  return (
    <div className="w-full md:w-[280px] md:mt-4 md:rounded-2xl bg-white p-4 md:shadow-xs border border-transparent md:border-slate-100/50">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
          <FaLayerGroup className="text-white" size={16} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-800">Issue Map</h2>
          <p className="text-xs text-gray-500">
            Real-time community issues across Kerala
          </p>
        </div>
      </div>

      <div className="relative mb-3">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={14}
        />

        <input
          type="text"
          placeholder="Search location or issue..."
          className="w-full rounded-xl bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none"
        />
      </div>

      <button className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
        <FiMapPin size={14} />
        Find My Location
      </button>

      <hr className="mb-4" />

      <div className="mb-4 flex items-center gap-2">
        <FiFilter size={14} className="text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-800">Filters</h3>
      </div>

      <div className="mb-4">
        <h4 className="mb-2 text-xs font-medium text-gray-500">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                selectedCategory === item
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="mb-2 text-xs font-medium text-gray-500">Status</h4>
        <div className="flex flex-wrap gap-2">
          {statuses.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedStatus(item)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                selectedStatus === item
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-medium text-gray-500">Priority</h4>
        <div className="flex flex-wrap gap-2">
          {priorities.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedPriority(item)}
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${
                selectedPriority === item
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item === "High" && <span className="h-2 w-2 rounded-full bg-red-500" />}
              {item === "Medium" && <span className="h-2 w-2 rounded-full bg-orange-500" />}
              {item === "Low" && <span className="h-2 w-2 rounded-full bg-green-500" />}
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MapFilters;