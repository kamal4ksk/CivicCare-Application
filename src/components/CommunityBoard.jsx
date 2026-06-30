import React from 'react';
import BoardCard from './BoardCard';

export default function CommunityBoard() {
  const boardData = [
    {
      id: 1,
      badgeText: "Trending",
      badgeBg: "bg-[#FF5A00]",
      title: "Report Infrastructure Issues",
      description: "Join thousands of citizens making their neighborhoods better by reporting potholes, broken streetlights, and hazards.",
      image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      badgeText: "Success Story",
      badgeBg: "bg-[#00C853]",
      title: "Community Cleanup Initiative",
      description: "Over 500 volunteers collected 2+ tons of waste last weekend, successfully restoring the beauty of our local parks.",
      image: "https://images.unsplash.com/photo-1618477462146-050d2767eac4?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    /* Cleaned section classes: Removed py-10, px-4, etc., so it moves upwards effortlessly */
    <section className="w-full bg-transparent font-sans antialiased text-[rgb(0,0,0)] text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block Section updated with exact styles */}
        <div className="mb-4">
          <h2 
            style={{
              width: '802.664px',
              height: '36px',
              margin: '0px 0px 4px 0px',
              border: '0px solid rgba(0,0,0,0.1)',
              display: 'block',
              boxSizing: 'border-box',
              fontSize: '24px',
              fontFamily: 'sans-serif',
              fontWeight: 500,
              lineHeight: 'normal',
              color: 'rgb(10,10,10)'
            }}
          >
            Community Board
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl leading-relaxed">
            Shape your neighborhood by participating in local discussions and tracking service requests.
          </p>
        </div>

        {/* Fluid 2-Column Responsive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {boardData.map((card) => (
            <BoardCard
              key={card.id}
              badgeText={card.badgeText}
              badgeBg={card.badgeBg}
              title={card.title}
              description={card.description}
              image={card.image}
            />
          ))}
        </div>

      </div>
    </section>
  );
}