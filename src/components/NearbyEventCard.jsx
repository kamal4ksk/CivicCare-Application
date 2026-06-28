import {
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";

function NearbyEventCard({
  title,
  description,
  location,
  date,
  tag,
  bgColor,
  tagColor,
}) {
  return (
    <div
      className={`rounded-xl p-4 ${bgColor}
      transition-all duration-200 hover:scale-[1.01]`}
    >
      {/* Title */}
      <h3 className="text-[13px] font-semibold text-gray-800">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
        {description}
      </p>

      {/* Location + Date */}
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-[11px] text-gray-500">
          <FiMapPin size={11} />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-gray-500">
          <FiCalendar size={11} />
          <span>{date}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-3 h-px bg-gray-200" />

      {/* Tag */}
      <span
        className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-medium text-white ${tagColor}`}
      >
        {tag}
      </span>
    </div>
  );
}

export default NearbyEventCard;