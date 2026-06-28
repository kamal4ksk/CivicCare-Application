function IssueIntensity({ mapView }) {

if (mapView === "reports") {
  return (
    <div className="absolute bottom-3 left-3 z-[40] rounded-xl bg-white px-4 py-3 shadow-md md:bottom-6 md:left-6 md:px-6 md:py-5 md:rounded-2xl md:shadow-xl">

      <h3 className="mb-5 text-lg font-bold">
        My Reports
      </h3>

      <div className="space-y-4">

        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-full bg-red-500"/>
          <span className="text-gray-700">
            High Priority
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-full bg-orange-500"/>
          <span className="text-gray-700">
            Medium Priority
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-full bg-green-500"/>
          <span className="text-gray-700">
            Low Priority
          </span>
        </div>

      </div>

      <div className="my-4 border-t"/>

      <div className="space-y-1 text-sm text-gray-500">

        <p>3 reports submitted</p>

        <p>1 resolved</p>

      </div>

    </div>
  );
}


  if (mapView === "pins") {
    return (
      <div className="absolute bottom-3 left-3 z-[40] rounded-xl bg-white px-3.5 py-2.5 shadow-md md:bottom-6 md:left-6 md:px-5 md:py-4 md:rounded-2xl md:shadow-xl">

        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Issue Pins
        </h3>

        <div className="space-y-3">

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-700">
              High Priority
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-orange-500"></div>
            <span className="text-sm text-gray-700">
              Medium Priority
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700">
              Low Priority
            </span>
          </div>

        </div>

      </div>
    );
  }

  if (mapView === "heatmap") {
    return (
      <div className="absolute bottom-3 left-3 z-[40] rounded-xl bg-white px-3.5 py-2.5 shadow-md md:bottom-6 md:left-6 md:px-5 md:py-4 md:rounded-2xl md:shadow-xl">

        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Heat Intensity
        </h3>

        <div className="space-y-3">

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-[#991b1b]" />
            <span className="text-sm text-gray-700">
              Critical (200+)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-[#ef4444]" />
            <span className="text-sm text-gray-700">
              Very High (100+)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-[#f97316]" />
            <span className="text-sm text-gray-700">
              High (70+)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-[#f59e0b]" />
            <span className="text-sm text-gray-700">
              Medium (40–70)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-[#facc15]" />
            <span className="text-sm text-gray-700">
              Low (Below 40)
            </span>
          </div>

        </div>

      </div>
    );
  }

  // District View (default)
  return (
    <div className="absolute bottom-3 left-3 z-[40] rounded-xl bg-white px-3.5 py-2.5 shadow-md md:bottom-6 md:left-6 md:px-5 md:py-4 md:rounded-2xl md:shadow-xl">

      <h3 className="mb-4 text-sm font-bold text-gray-900">
        Issue Intensity
      </h3>

      <div className="space-y-3">

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-[#991b1b]" />
          <span className="text-sm text-gray-700">
            Critical (200+)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-[#ef4444]" />
          <span className="text-sm text-gray-700">
            Very High (100+)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-[#f97316]" />
          <span className="text-sm text-gray-700">
            High (70+)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-[#f59e0b]" />
          <span className="text-sm text-gray-700">
            Medium (40–70)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-[#facc15]" />
          <span className="text-sm text-gray-700">
            Low (Below 40)
          </span>
        </div>

      </div>

    </div>
  );
}

export default IssueIntensity;