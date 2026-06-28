import {
  FiX,
  FiChevronRight,
  FiAlertTriangle,
  FiDroplet,
  FiZap,
  FiTrash2,
  FiDollarSign,
  FiShield,
} from "react-icons/fi";

const issues = [
  {
    icon: <FiAlertTriangle className="text-orange-500" size={20} />,
    title: "Large pothole on Main Street",
    location: "Kochi, Ernakulam",
    priority: "High",
    status: "Pending",
    time: "2h ago",
  },
  {
    icon: <FiDroplet className="text-blue-500" size={20} />,
    title: "Water supply irregular in Palavattom",
    location: "Kochi, Ernakulam",
    priority: "Medium",
    status: "In Progress",
    time: "3h ago",
  },
  {
    icon: <FiZap className="text-yellow-500" size={20} />,
    title: "Street light not working",
    location: "Thrissur, Thrissur",
    priority: "Medium",
    status: "Pending",
    time: "5h ago",
  },
  {
    icon: <FiTrash2 className="text-green-500" size={20} />,
    title: "Garbage collection delayed",
    location: "Kollam, Kollam",
    priority: "Low",
    status: "Resolved",
    time: "1d ago",
  },
  {
    icon: <FiDollarSign className="text-red-500" size={20} />,
    title: "Corruption in building permit",
    location: "Kannur, Kannur",
    priority: "High",
    status: "Pending",
    time: "1d ago",
  },
  {
    icon: <FiAlertTriangle className="text-orange-500" size={20} />,
    title: "Road repair needed urgently",
    location: "Kozhikode, Kozhikode",
    priority: "High",
    status: "In Progress",
    time: "4h ago",
  },
  {
    icon: <FiZap className="text-yellow-500" size={20} />,
    title: "Power outage for 3 hours",
    location: "Malappuram, Malappuram",
    priority: "High",
    status: "Resolved",
    time: "6h ago",
  },
  {
    icon: <FiDroplet className="text-blue-500" size={20} />,
    title: "Drainage clogged causing flooding",
    location: "Alappuzha, Alappuzha",
    priority: "High",
    status: "Pending",
    time: "8h ago",
  },
  {
    icon: <FiTrash2 className="text-green-500" size={20} />,
    title: "Illegal waste dumping",
    location: "Palakkad, Palakkad",
    priority: "Medium",
    status: "In Progress",
    time: "12h ago",
  },
  {
    icon: <FiShield className="text-purple-500" size={20} />,
    title: "Bridge safety concern",
    location: "Idukki, Idukki",
    priority: "High",
    status: "Pending",
    time: "1d ago",
  },
  {
    icon: <FiTrash2 className="text-green-500" size={20} />,
    title: "Bus stand needs cleaning",
    location: "Kottayam, Kottayam",
    priority: "Low",
    status: "Pending",
    time: "1d ago",
  },
  {
    icon: <FiZap className="text-yellow-500" size={20} />,
    title: "Street lights broken in residential area",
    location: "Thiruvananthapuram",
    priority: "Medium",
    status: "In Progress",
    time: "2d ago",
  },
  {
    icon: <FiDroplet className="text-blue-500" size={20} />,
    title: "Water contamination reported",
    location: "Wayanad, Wayanad",
    priority: "High",
    status: "Pending",
    time: "2d ago",
  },
  {
    icon: <FiDollarSign className="text-red-500" size={20} />,
    title: "Bribery at passport office",
    location: "Kasaragod, Kasaragod",
    priority: "High",
    status: "In Progress",
    time: "3d ago",
  },
  {
    icon: <FiAlertTriangle className="text-orange-500" size={20} />,
    title: "Pothole near school",
    location: "Pathanamthitta",
    priority: "High",
    status: "Resolved",
    time: "3d ago",
  },
];

export default function ViewAll({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[3000] bg-black/40 flex items-center justify-center">

      <div className="w-[670px] h-[760px] overflow-hidden rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              All Issues
            </h2>

            <p className="mt-1 text-gray-500">
              Showing {issues.length} issues
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 hover:bg-gray-200"
          >
            <FiX size={24} />
          </button>

        </div>

        <div className="h-[660px] space-y-4 overflow-y-auto p-6">

          {issues.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between rounded-3xl bg-gray-50 p-5 transition hover:bg-gray-100"
            >
              <div className="flex gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                  {item.icon}
                </div>

                <div>

                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.location}
                  </p>

                  <div className="mt-4 flex items-center gap-3">

                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                      item.priority === "High"
                        ? "bg-red-50 text-red-500"
                        : item.priority === "Medium"
                        ? "bg-orange-50 text-orange-500"
                        : "bg-green-50 text-green-600"
                    }`}>
                      ● {item.priority}
                    </span>

                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                      item.status === "Pending"
                        ? "bg-orange-50 text-orange-600"
                        : item.status === "Resolved"
                        ? "bg-green-50 text-green-600"
                        : "bg-blue-50 text-blue-600"
                    }`}>
                      {item.status}
                    </span>

                    <span className="text-sm text-gray-400">
                      {item.time}
                    </span>

                  </div>

                </div>

              </div>

              <FiChevronRight
                className="mt-3 text-gray-400"
                size={22}
              />

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}