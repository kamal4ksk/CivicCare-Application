import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import { HiMegaphone } from 'react-icons/hi2'; 
import { FiArrowRight } from 'react-icons/fi';

export default function AppDownload() {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      
      {/* =========================================================
          SECTION 1: THE APP DOWNLOAD PANEL
          ========================================================= */}
      {/* Added id="about" to handle header smooth scroll targeting */}
      <section id="about" className="w-full min-h-[660px] py-[80px] px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#eff6ff] via-[#faf5ff] to-[#fdf2f8] text-[16px] font-sans font-normal leading-normal text-[rgb(10,10,10)] border-0 border-solid border-[rgba(0,0,0,0.1)] block box-border antialiased flex items-center">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Content Column: Text Copy, Badges, and Stats */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Take CivicCare <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Anywhere You Go
              </span>
            </h2>
            
            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed mt-4 mb-8 max-w-md">
              Download our mobile app and report issues on the go. Available on iOS and Android.
            </p>

            {/* Platform Distribution Badges Container */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              {/* App Store */}
              <a href="#ios" className="flex items-center justify-center lg:justify-start bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl px-4 py-2.5 transition-all duration-200 shadow-sm w-full sm:w-44 group hover:-translate-y-0.5">
                <svg className="w-6 h-6 mr-3 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium leading-none">Download on the</span>
                  <span className="text-sm font-bold leading-tight tracking-tight mt-0.5">App Store</span>
                </div>
              </a>

              {/* Google Play */}
              <a href="#android" className="flex items-center justify-center lg:justify-start bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl px-4 py-2.5 transition-all duration-200 shadow-sm w-full sm:w-44 group hover:-translate-y-0.5">
                <svg className="w-6 h-6 mr-3 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M5.25 3.033a2.21 2.21 0 0 0-.487 1.55v14.834c.002.583.181 1.147.51 1.62l9.023-9.023L5.25 3.033zm10.122 8.351l2.846-1.62c.74-.42 1.157-1.125 1.157-1.884s-.417-1.464-1.157-1.884l-2.846-1.62-2.316 2.316 2.316 2.316zm-1.114 1.114l-2.317-2.316-9.043 9.043c.278.077.567.113.856.107h1.002c1.077 0 2.062-.57 2.585-1.5l4.917-2.834zM11.756 9.435l4.917-2.834c.523-.93 1.508-1.5 2.585-1.5h1.002c.29-.006.578.03.856.107l-9.36 9.36z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium leading-none">Get it on</span>
                  <span className="text-sm font-bold leading-tight tracking-tight mt-0.5">Google Play</span>
                </div>
              </a>
            </div>

            {/* Metrics Counter Display Layout */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-slate-200/60 w-full max-w-md">
              <div>
                <div className="flex items-center justify-center lg:justify-start space-x-1">
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">4.8</span>
                  <FaStar className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mb-0.5" />
                </div>
                <span className="text-[11px] sm:text-xs text-slate-400 font-semibold tracking-wide block mt-0.5">App Rating</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight block">50K+</span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-semibold tracking-wide block mt-0.5">Downloads</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight block">24/7</span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-semibold tracking-wide block mt-0.5">Support</span>
              </div>
            </div>
          </div>
{/* Mockup Column */}
<div className="order-1 lg:order-2 lg:col-span-5 flex justify-center items-center">

  {/* Phone Frame */}
<div className="w-[256px] h-[500px] p-[12px] border-[4px] border-gray-200 rounded-[24px] bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] relative transition-all duration-500 hover:-translate-y-3 hover:rotate-2 hover:shadow-[0px_35px_70px_-12px_rgba(0,0,0,0.3)]">
      <div className="w-full h-full rounded-[16px] bg-gradient-to-br from-[rgb(219,234,254)] to-[rgb(243,232,255)] flex flex-col items-center justify-center text-center">

      {/* App Logo */}
      <div className="w-[80px] h-[80px] p-[16px] rounded-[16px] bg-gradient-to-br from-[rgb(43,127,255)] to-[rgb(152,16,250)] flex items-center justify-center mb-[16px]">
        <HiMegaphone className="w-10 h-10 text-white" />
      </div>

      <h4 className="text-[20px] font-bold text-slate-800 mb-2">
        CivicCare App
      </h4>

      <p className="text-[14px] text-slate-500 font-medium px-6">
        Your voice, your community
      </p>

    </div>
  </div>

</div>

{/* Close the grid container */}
</div>

{/* Close Section 1 */}
</section>
      {/* =========================================================
          SECTION 2: READY TO MAKE A DIFFERENCE CTA BANNER
          ========================================================= */}
      <section className="w-full min-h-[428px] py-[96px] px-4 bg-gradient-to-r from-[#155dfc] via-[#9810fa] to-[#e60076] text-[16px] font-sans font-normal leading-normal text-[rgb(10,10,10)] border-0 border-solid border-[rgba(0,0,0,0.1)] block box-border antialiased flex items-center text-center">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center px-2">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to Make a Difference?
          </h2>
          
          <p className="text-white/90 font-medium text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-10">
            Join thousands of citizens already creating positive change in their communities.
          </p>

          <Link to="/signin" className="inline-flex items-center space-x-2.5 px-6 sm:px-8 py-3.5 bg-white hover:bg-slate-50 text-indigo-600 font-bold text-sm sm:text-base rounded-xl shadow-md transition-all duration-200 active:scale-95 w-full sm:w-auto justify-center cursor-pointer">
            <span>Get Started Now</span>
            <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

        </div>
      </section>

    </div>
  );
}