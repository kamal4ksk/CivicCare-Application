import {
  FiFileText,
  FiClock,
  FiRefreshCw,
  FiCheckCircle,
  FiMapPin 
} from "react-icons/fi";

import TotalReportCard from "./TotalReportCard";

function PostStatus() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
      <TotalReportCard
        title="Total Reports"
        value="983"
        subtitle="All reports"
        icon={<FiFileText className="text-blue-500" size={18} />}
        iconBg="bg-blue-50"
      />

      <TotalReportCard
        title="Pending"
        value="224"
        subtitle="23% of total"
        icon={<FiClock className="text-orange-500" size={18} />}
        iconBg="bg-orange-50"
      />

      <TotalReportCard
        title="In Progress"
        value="164"
        subtitle="17% of total"
        icon={<FiRefreshCw className="text-blue-500" size={18} />}
        iconBg="bg-blue-50"
      />

      <TotalReportCard
        title="Resolved"
        value="595"
        subtitle="61% of total"
        icon={<FiCheckCircle className="text-green-500" size={18} />}
        iconBg="bg-green-50"
      />

      <div className="col-span-2 md:col-span-1">
        <TotalReportCard
          title="Active Districts"
          value="14"
          subtitle="Across Kerala"
          icon={<FiMapPin className="text-purple-500" size={18} />}
          iconBg="bg-purple-50"
        />
      </div>

    </div>
  );
}

export default PostStatus;