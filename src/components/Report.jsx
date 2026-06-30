import React from 'react';
import ReportCard from './ReportCard';

export default function Report() {
  const categoryData = [
    { id: 1, count: 1, title: 'Bribery' },
    { id: 2, count: 1, title: 'Potholes' },
    { id: 3, count: 1, title: 'Water' },
    { id: 4, count: 1, title: 'Electricity' },
    { id: 5, count: 1, title: 'Waste' },
    { id: 6, count: 0, title: 'Others' }
  ];

  return (
    <section className="w-full bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Component Header Label */}
        <div className="mb-6">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Reports by Category
          </h3>
        </div>

        {/* 6-Column Flex-Grid Layout Wrapper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryData.map((category) => (
            <ReportCard
              key={category.id}
              count={category.count}
              title={category.title}
            />
          ))}
        </div>

      </div>
    </section>
  );
}