function DistrictDetails({ district, onClose }) {
  if (!district) return null;

  const percentage = Math.round(
    (district.resolved / district.total) * 100
  );

  return (
    <div className="absolute bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto z-[1000] w-full md:w-[320px] rounded-t-2xl md:rounded-2xl bg-white p-4 shadow-xl border-t md:border border-slate-100/60 max-h-[85%] overflow-y-auto">

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">
          {district.name}
        </h2>

        <button
          onClick={onClose}
          className="text-xl text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <div className="mb-4 flex justify-between">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
          {district.total} Reports
        </span>
      </div>

      <div className="space-y-2">

        <div className="flex justify-between">
          <span className="text-orange-500">● Pending</span>
          <span>{district.pending}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-blue-500">● In Progress</span>
          <span>{district.progress}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-green-500">● Resolved</span>
          <span>{district.resolved}</span>
        </div>

      </div>

      <div className="mt-5">

        <div className="mb-2 flex justify-between text-sm">
          <span>Resolution Rate</span>
          <span>{percentage}%</span>
        </div>

        <div className="h-2 rounded-full bg-gray-200">

          <div
            className="h-2 rounded-full bg-green-500"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-5">

        <h3 className="mb-2 font-semibold">
          Top Issues
        </h3>

        <ul className="space-y-1 text-gray-600">

          {district.issues.map((issue) => (
            <li key={issue}>
              • {issue}
            </li>
          ))}

        </ul>
        {district.myReports && (
  <>
    <hr className="my-4" />

    <h3 className="mb-3 font-semibold text-gray-800">
      Your Reports
    </h3>

    <div className="space-y-3">
      {district.myReports.map((report, index) => (
        <div
          key={index}
          className="flex items-center justify-between"
        >
          <span className="text-sm text-gray-700">
            {report.title}
          </span>

          <span
            className={`rounded-full px-2 py-1 text-xs font-medium
              ${
                report.status === "Resolved"
                  ? "bg-green-100 text-green-600"
                  : report.status === "Pending"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-blue-100 text-blue-600"
              }`}
          >
            {report.status}
          </span>
        </div>
      ))}
    </div>
  </>
)}

      </div>

    </div>
  );
}

export default DistrictDetails;