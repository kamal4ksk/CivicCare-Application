import {
  FiAlertTriangle,
  FiDroplet,
  FiZap,
  FiTrash2,
  FiDollarSign,
} from "react-icons/fi";
import { useState } from "react";
import ViewAll from "./ViewAll";
import TopIssueCard from "./TopIssueCard";



function TopIssuesMap({
  mapView,
  selectedCategory,
  selectedStatus,
  selectedPriority,
}) {
  const [showModal, setShowModal] = useState(false);

  const allIssues = [
    {
      id: 1,
      title: "Large pothole on Main Street",
      district: "Ernakulam",
      location: "Kochi, Ernakulam",
      category: "Infrastructure",
      status: "Pending",
      priority: "High",
      time: "2h ago",
      icon: <FiAlertTriangle className="text-orange-500" size={16} />,
      priorityColor: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      id: 2,
      title: "Water supply irregular in Palavattom",
      district: "Ernakulam",
      location: "Kochi, Ernakulam",
      category: "Water",
      status: "In Progress",
      priority: "Medium",
      time: "3h ago",
      icon: <FiDroplet className="text-blue-500" size={16} />,
      priorityColor: "bg-orange-500",
      textColor: "text-orange-500",
    },
    {
      id: 3,
      title: "Street light not working",
      district: "Thrissur",
      location: "Thrissur",
      category: "Electricity",
      status: "Pending",
      priority: "Medium",
      time: "5h ago",
      icon: <FiZap className="text-yellow-500" size={16} />,
      priorityColor: "bg-orange-500",
      textColor: "text-orange-500",
    },
    {
      id: 4,
      title: "Garbage collection delayed",
      district: "Kollam",
      location: "Kollam",
      category: "Garbage",
      status: "Resolved",
      priority: "Low",
      time: "1d ago",
      icon: <FiTrash2 className="text-green-500" size={16} />,
      priorityColor: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      id: 5,
      title: "Corruption in building permit",
      district: "Kannur",
      location: "Kannur",
      category: "Corruption",
      status: "Pending",
      priority: "High",
      time: "1d ago",
      icon: <FiDollarSign className="text-red-500" size={16} />,
      priorityColor: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      id: 6,
      title: "Road repair needed urgently",
      district: "Kozhikode",
      location: "Kozhikode",
      category: "Infrastructure",
      status: "In Progress",
      priority: "High",
      time: "4h ago",
      icon: <FiAlertTriangle className="text-orange-500" size={16} />,
      priorityColor: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      id: 7,
      title: "Power outage for 3 hours",
      district: "Malappuram",
      location: "Malappuram",
      category: "Electricity",
      status: "Pending",
      priority: "High",
      time: "6h ago",
      icon: <FiZap className="text-yellow-500" size={16} />,
      priorityColor: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      id: 8,
      title: "Drainage clogged causing flooding",
      district: "Alappuzha",
      location: "Alappuzha",
      category: "Infrastructure",
      status: "Resolved",
      priority: "High",
      time: "8h ago",
      icon: <FiAlertTriangle className="text-orange-500" size={16} />,
      priorityColor: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      id: 9,
      title: "Illegal waste dumping",
      district: "Palakkad",
      location: "Palakkad",
      category: "Garbage",
      status: "In Progress",
      priority: "Medium",
      time: "12h ago",
      icon: <FiTrash2 className="text-green-500" size={16} />,
      priorityColor: "bg-orange-500",
      textColor: "text-orange-500",
    },
    {
      id: 10,
      title: "Bridge safety concern",
      district: "Idukki",
      location: "Idukki",
      category: "Safety",
      status: "Pending",
      priority: "High",
      time: "1d ago",
      icon: <FiAlertTriangle className="text-orange-500" size={16} />,
      priorityColor: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      id: 11,
      title: "Bus stand needs cleaning",
      district: "Kottayam",
      location: "Kottayam",
      category: "Garbage",
      status: "Resolved",
      priority: "Low",
      time: "2d ago",
      icon: <FiTrash2 className="text-green-500" size={16} />,
      priorityColor: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      id: 12,
      title: "Water contamination reported",
      district: "Wayanad",
      location: "Wayanad",
      category: "Water",
      status: "Pending",
      priority: "High",
      time: "2d ago",
      icon: <FiDroplet className="text-blue-500" size={16} />,
      priorityColor: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      id: 13,
      title: "Bribery at passport office",
      district: "Kasaragod",
      location: "Kasaragod",
      category: "Corruption",
      status: "In Progress",
      priority: "High",
      time: "3d ago",
      icon: <FiDollarSign className="text-red-500" size={16} />,
      priorityColor: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      id: 14,
      title: "Pothole near school",
      district: "Pathanamthitta",
      location: "Pathanamthitta",
      category: "Infrastructure",
      status: "Resolved",
      priority: "High",
      time: "3d ago",
      icon: <FiAlertTriangle className="text-orange-500" size={16} />,
      priorityColor: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      id: 15,
      title: "Street lights broken",
      district: "Thiruvananthapuram",
      location: "Thiruvananthapuram",
      category: "Electricity",
      status: "Pending",
      priority: "Medium",
      time: "4d ago",
      icon: <FiZap className="text-yellow-500" size={16} />,
      priorityColor: "bg-orange-500",
      textColor: "text-orange-500",
    },
  ];

  const filteredIssues = allIssues.filter((issue) => {
    const matchesCategory =
      selectedCategory === "All" || issue.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || issue.status === selectedStatus;
    const matchesPriority =
      selectedPriority === "All" || issue.priority === selectedPriority;

    return matchesCategory && matchesStatus && matchesPriority;
  });

  const districtCounts = filteredIssues.reduce((acc, issue) => {
    acc[issue.district] = (acc[issue.district] || 0) + 1;
    return acc;
  }, {});

  const rankings = Object.entries(districtCounts)
    .map(([district, count]) => ({ district, count }))
    .sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...rankings.map((item) => item.count), 1);

  const pinnedIssues = Object.entries(
    filteredIssues.reduce((acc, issue) => {
      if (!acc[issue.district]) acc[issue.district] = [];
      acc[issue.district].push(issue);
      return acc;
    }, {})
  ).map(([district, issues]) => ({ district, issues }));

  if (mapView === "heatmap") {
    return (
      <div className="h-[330px] border-t border-gray-100 bg-white">
        <div className="px-4 py-3">
          <h3 className="text-lg font-semibold text-gray-800">District Ranking</h3>
        </div>

        <div className="h-[270px] space-y-3 overflow-y-auto px-4 pb-4">
          {rankings.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No issues match the selected filters.
            </div>
          ) : (
            rankings.map((item, index) => (
              <div key={item.district} className="flex items-center gap-3">
                <span className="w-3 text-xs text-gray-400">{index + 1}</span>
                <span className="w-[95px] truncate text-sm text-gray-700">
                  {item.district}
                </span>
                <div className="h-2 flex-1 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-red-700 via-red-500 to-orange-500"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs font-semibold text-red-600">
                  {item.count}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (mapView === "reports") {
    const total = filteredIssues.length;
    const resolved = filteredIssues.filter((issue) => issue.status === "Resolved").length;
    const pending = filteredIssues.filter((issue) => issue.status === "Pending").length;

    return (
      <div className="h-[330px] border-t border-gray-100 bg-white">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Your Reports</h2>
            <p className="text-sm text-gray-400">{total} total</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 px-4">
          <div className="rounded-2xl bg-gray-50 py-3 text-center">
            <h3 className="text-3xl font-bold text-blue-600">{total}</h3>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="rounded-2xl bg-gray-50 py-3 text-center">
            <h3 className="text-3xl font-bold text-green-600">{resolved}</h3>
            <p className="text-xs text-gray-500">Resolved</p>
          </div>
          <div className="rounded-2xl bg-gray-50 py-3 text-center">
            <h3 className="text-3xl font-bold text-orange-500">{pending}</h3>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
        </div>

        <div className="mt-4 h-[185px] space-y-3 overflow-y-auto px-4 pb-4">
          {filteredIssues.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No issues match the selected filters.
            </div>
          ) : (
            filteredIssues.map((issue) => (
              <div key={issue.id} className="rounded-2xl bg-gray-50 p-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    {issue.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{issue.title}</h3>
                    <p className="text-xs text-gray-400">{issue.time}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                    {issue.status.toLowerCase()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (mapView === "pins") {
    return (
      <div className="h-[330px] border-t border-gray-100 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-semibold text-gray-800">
            {filteredIssues.length} Issues Pinned
          </h3>
          <button
            onClick={() => setShowModal(true)}
            className="text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            View All ({filteredIssues.length})
          </button>
        </div>

        <div className="h-[260px] overflow-y-auto px-4 pb-4 space-y-5">
          {pinnedIssues.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No issues match the selected filters.
            </div>
          ) : (
            pinnedIssues.map((group) => (
              <div key={group.district}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-blue-600">📍</span>
                  <span className="font-semibold text-gray-800">{group.district}</span>
                  <span className="text-sm text-gray-400">({group.issues.length})</span>
                </div>

                {group.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="ml-5 mb-2 flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
                  >
                    <span className="truncate text-sm text-gray-700">{issue.title}</span>
                    <span className={`text-xs font-semibold ${issue.textColor}`}>
                      {issue.priority}
                    </span>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        <ViewAll open={showModal} onClose={() => setShowModal(false)} />
      </div>
    );
  }

  return (
    <div className="h-[330px] border-t border-gray-100 bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-800">
          {filteredIssues.length > 0 ? `Top ${Math.min(filteredIssues.length, 5)} Recent Issues` : "No Matching Issues"}
        </h3>

        <button
          onClick={() => setShowModal(true)}
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          View All ({filteredIssues.length})
        </button>
      </div>

      <div className="h-[260px] space-y-3 overflow-y-auto px-4 pb-4">
        {filteredIssues.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No issues match the selected filters.
          </div>
        ) : (
          filteredIssues.slice(0, 5).map((issue) => (
            <TopIssueCard
              key={issue.id}
              icon={issue.icon}
              title={issue.title}
              location={issue.location}
              priority={issue.priority}
              priorityColor={issue.priorityColor}
              time={issue.time}
            />
          ))
        )}
      </div>
      <ViewAll open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default TopIssuesMap;