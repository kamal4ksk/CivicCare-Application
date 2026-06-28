import {
  FiAlertTriangle,
  FiDroplet,
  FiZap,
  FiTrash2,
  FiDollarSign,
} from "react-icons/fi";

function TopIssueCard({
  icon,
  title,
  location,
  priority,
  priorityColor,
  time,
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-3 hover:bg-gray-100 transition">

      <div className="mt-1">
        {icon}
      </div>

      <div className="flex-1 min-w-0">

        <div className="flex justify-between items-start">

          <div>
            <h4 className="truncate text-[12px] font-semibold text-gray-800">
              {title}
            </h4>

            <p className="text-[10px] text-gray-500">
              {location}
            </p>
          </div>

          <span className="text-[10px] text-gray-400 whitespace-nowrap">
            {time}
          </span>

        </div>

        <div className="mt-2 flex items-center gap-1">

          <span
            className={`h-2 w-2 rounded-full ${priorityColor}`}
          />

          <span className="text-[10px] font-medium">
            {priority}
          </span>

        </div>

      </div>

    </div>
  );
}

export default TopIssueCard;