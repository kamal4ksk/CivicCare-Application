function TotalReportCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
      <div>
        <p className="text-[11px] font-medium text-gray-500">
          {title}
        </p>

        <h3 className="mt-1 text-3xl font-bold text-gray-900">
          {value}
        </h3>

        <p className="text-[11px] text-gray-400">
          {subtitle}
        </p>
      </div>

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </div>
    </div>
  );
}

export default TotalReportCard;