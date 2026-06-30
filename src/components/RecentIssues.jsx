import React from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import RecentIssuesCard from './RecentIssuesCard';

export default function RecentIssues() {
  const issuesData = [
    {
      id: 1,
      title: "Pothole on MG Road causing accidents",
      location: "Ernakulam",
      status: "pending",
      likes: 234,
      comments: 45,
      image: "https://i.guim.co.uk/img/media/975f39c09487ba67e9c6fd1ccc2c1929ed16d63c/760_10_4148_2491/master/4148.jpg?width=465&dpr=1&s=none&crop=none"
    },
    {
      id: 2,
      title: "Water supply disruption for 3 days",
      location: "Thiruvananthapuram",
      status: "in progress",
      likes: 189,
      comments: 32,
      image: "https://newsblare.com/wp-content/uploads/2026/02/48-Hour-Water-Supply-Disruption-in-Delhi-Begins-Today-Full-List-of-Affected-Areas-1280x700.jpg"
    },
    {
      id: 3,
      title: "Garbage not collected in residential area",
      location: "Kochi",
      status: "pending",
      likes: 156,
      comments: 28,
      image: "https://static.toiimg.com/thumb/msid-112616589,width-1280,height-720,resizemode-72/112616589.jpg"
    },
    {
      id: 4,
      title: "Street lights not working for weeks",
      location: "Kozhikode",
      status: "resolved",
      likes: 301,
      comments: 67,
      image: "https://www.thepost.co.nz/media/images/9Tzi8ywRz924XE3uHaD6DZ3Ef+IdbOiYlvIROR5vlqUeRrexTocZGobKRJ9od%2Fgnk3B%2FCeKTmTAsIjj6Q0YaYWZmSvM28YPTGuL%2FuMnA7U02uahSN8vh5jxoxCrc6VA9cFmvasINL3N6nAYj%2FKZS8MpKdlU28t9wwSm+0ZSQiKmJf8z0zxTi0sE4tdlLPqxPYnYaVBueqaDxjZSuCIDBQJdwc5zw0gXTf78o8HtcRfkqRiDE4LdwIdEtkebEimWJcfbG8XGl4Wr6iopAtYnu0pOQbMlFmHB5o1o%2FU8n5ymMCQ%2FQX5h2FK9xaG1A9HCSU3ZvVXdVc5g1MKZeJbTX9XM+XPJyTpV9+607sj65%2FEqFt54DJG9hrhB2J%2FhJ0+t7YGJ9NVOTgWAbra1fgAz4+4g=="
    }
  ];

  return (
    <section className="w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <HiOutlineExclamationTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />

          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
            Recent Issues
          </h2>
        </div>

        <a
          href="#all"
          className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </a>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {issuesData.map((issue) => (
          <RecentIssuesCard
            key={issue.id}
            {...issue}
          />
        ))}
      </div>

    </section>
  );
}