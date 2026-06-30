import React from 'react';
import HeaderLanding from '../components/HeaderLanding';
import HeroSection from '../components/HeroSection';
import RecentIssues from '../components/RecentIssues';
import Trending from '../components/Trending';
import DistrictHotspots from '../components/DistrictHotspots';
import PlatformFeatures from '../components/PlatformFeatures';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col antialiased">
      {/* 1. Header Landing */}
      <HeaderLanding />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Clean Split Layout Box matching image_42f966.jpg */}
      <section className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left side: Recent Issues (span 8) */}
            <div className="lg:col-span-8 w-full flex flex-col">
              <RecentIssues />
            </div>

            {/* Right side: Trending (span 4) */}
            <div className="lg:col-span-4 w-full flex flex-col">
              <Trending />
            </div>

          </div>
        </div>
      </section>

      {/* 4. Kerala Hotspots Map */}
      <DistrictHotspots />

      {/* 5. Platform Features */}
      <PlatformFeatures />

      {/* 6. App Download */}
      <AppDownload />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}