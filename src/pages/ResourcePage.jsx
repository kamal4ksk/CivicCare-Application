import React, { useState } from "react";
import UserHeader from "../components/UserHeader";
import { 
  HiOutlineBookOpen, 
  HiOutlinePhone, 
  HiOutlineClock, 
  HiOutlineDocumentText, 
  HiOutlineArrowTopRightOnSquare, 
  HiOutlineMapPin,
  HiOutlineMagnifyingGlass,
  HiXMark
} from "react-icons/hi2";

// Mock Data representing the images
const FEATURED_ARTICLES = [
  {
    id: 1,
    title: "How to Report Infrastructure Issues",
    category: "Infrastructure",
    description: "Learn the proper way to document and report infrastructure problems in your community.",
    date: "5/15/2026",
    image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=800&q=80",
    content: "Reporting infrastructure issues such as potholes, broken traffic signals, or damaged streetlights is a vital step toward improving city safety and quality of life.\n\n1. Take Clear Photos: Document the damage from multiple angles during daylight hours.\n2. Note the Location: Identify the nearest street intersection or building address.\n3. Submit a Ticket: Navigate to our Map view, click the corresponding district, and fill in the report details.\n4. Follow Up: Check the status card on your dashboard to monitor progress updates."
  }
];

const CONTACT_CATEGORIES = [
  {
    title: "Emergency Services",
    badgeColor: "bg-rose-50 text-rose-600 border-rose-100",
    iconColor: "text-rose-500",
    contacts: [
      { name: "Police", phone: "911", hours: "24/7" },
      { name: "Fire Department", phone: "911", hours: "24/7" },
      { name: "Ambulance", phone: "911", hours: "24/7" },
    ]
  },
  {
    title: "Municipal Services",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
    iconColor: "text-blue-500",
    contacts: [
      { name: "Water Supply Complaints", phone: "1-800-WATER", hours: "Mon-Fri 9AM-5PM" },
      { name: "Electricity Board", phone: "1-800-POWER", hours: "24/7" },
      { name: "Waste Management", phone: "1-800-CLEAN", hours: "Mon-Sat 8AM-6PM" },
    ]
  },
  {
    title: "Community Resources",
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    iconColor: "text-emerald-500",
    contacts: [
      { name: "City Hall", phone: "1-800-CITY", hours: "Mon-Fri 9AM-5PM" },
      { name: "Public Library", phone: "1-800-BOOKS", hours: "Mon-Sat 10AM-8PM" },
      { name: "Community Center", phone: "1-800-COMM", hours: "Mon-Sun 7AM-9PM" },
    ]
  }
];

const HELPFUL_GUIDES = [
  {
    id: 1,
    title: "How to Report an Issue",
    category: "Getting Started",
    description: "Step-by-step guide to reporting civic concerns",
    content: "To report an issue:\n1. Choose Map from the top navbar.\n2. Navigate to your local district.\n3. Click the target area, select the issue type, enter a description, and upload any photos.\n4. Click submit to immediately alert municipal staff."
  },
  {
    id: 2,
    title: "Community Guidelines",
    category: "Guidelines",
    description: "Rules and best practices for engagement",
    content: "Engagement Guidelines:\n1. Be Respectful: Civility is required when commenting or posting.\n2. Keep it Local: Keep posts focused on community improvement.\n3. No Spam or Advertising: Advertising or promotions will be removed.\n4. Respect Privacy: Do not share personal details of others."
  },
  {
    id: 3,
    title: "Safety Tips",
    category: "Safety",
    description: "Important safety information for citizens",
    content: "Neighborhood Safety Tips:\n1. Lock doors and windows when leaving home.\n2. Report any broken street lamps to prompt quick maintenance.\n3. Keep emergency contacts stored on speed dial.\n4. Remain aware of your surroundings when walking alone at night."
  },
  {
    id: 4,
    title: "Volunteer Opportunities",
    category: "Community",
    description: "Get involved in community initiatives",
    content: "Civic Volunteering Opportunities:\n1. Neighborhood cleanups are organized weekly by the Clean City Initiative.\n2. Local library mentoring programs.\n3. Help out at food banks or shelter programs on weekends.\n4. Sign up as a district emergency watch leader."
  },
  {
    id: 5,
    title: "Understanding Municipal Services",
    category: "Services",
    description: "Learn about available government services",
    content: "Services Overview:\n1. Waste Collection: Scheduled trash and recycling pickups.\n2. Permits & Licenses: Building permits and zoning licenses.\n3. Utility Maintenance: Clean drinking water and electrical grids.\n4. Public Facilities: Libraries, parks, and community pools."
  },
  {
    id: 6,
    title: "Emergency Preparedness",
    category: "Safety",
    description: "Be ready for emergencies in your area",
    content: "Emergency Preparation Guide:\n1. Prepare an emergency kit (water, dry food, flashlights, first-aid box).\n2. Create a family communication and exit plan.\n3. Know the nearest emergency assembly shelter.\n4. Sign up for civic alerts to receive severe weather updates."
  }
];

export default function ResourcePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeGuide, setActiveGuide] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Simulated calling action
  const triggerCall = (phone, serviceName) => {
    setToastMessage(`Simulating call to ${serviceName} at ${phone}... 📞`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const triggerDirections = () => {
    setToastMessage("Directions simulation: Opening map coordinates to 123 Main Street... 📍");
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Search logic
  const filteredArticles = FEATURED_ARTICLES.filter(
    (art) =>
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGuides = HELPFUL_GUIDES.filter(
    (g) =>
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f5fb] pb-12 font-sans antialiased">
      <UserHeader />

      <main className="mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full max-w-[1180px] flex flex-col gap-8">
        
        {/* Header Title section */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Resources & Information
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Articles, guides, and important contacts for citizens
          </p>
        </div>

        {/* Interactive Search Bar */}
        <div className="relative w-full max-w-3xl">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <HiOutlineMagnifyingGlass className="w-5 h-5 stroke-[2.5]" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles, resources, guides..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs transition-all duration-200"
          />
        </div>

        {/* Featured Articles Section */}
        {filteredArticles.length > 0 && (
          <div className="flex flex-col gap-4 text-left">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
              <HiOutlineBookOpen className="w-5 h-5 text-indigo-600 stroke-[2]" />
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredArticles.map((art) => (
                <div 
                  key={art.id}
                  onClick={() => setActiveArticle(art)}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={art.image} 
                      alt={art.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200/60 px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-xs">
                      {art.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-1">
                        {art.title}
                      </h3>
                      <p className="text-slate-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                        {art.description}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 mt-4 block">
                      {art.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <hr className="border-slate-200/60 my-2" />

        {/* Community Resources (Contacts Directory) */}
        <div className="text-left flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800">Community Resources</h2>
            <p className="text-slate-400 text-sm mt-0.5 font-medium">Important contacts and helpful information</p>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Contact Information</h3>
            
            <div className="flex flex-col gap-6">
              {CONTACT_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col gap-4">
                  <h4 className="text-sm font-extrabold text-slate-700">{cat.title}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cat.contacts.map((contact, cIdx) => (
                      <div 
                        key={cIdx}
                        onClick={() => triggerCall(contact.phone, contact.name)}
                        className="bg-slate-50 hover:bg-slate-100/80 border border-slate-100 rounded-xl p-4 flex items-start gap-3.5 cursor-pointer transition-all duration-200 active:scale-98 select-none group"
                      >
                        <div className={`w-9 h-9 rounded-full ${cat.badgeColor} border flex items-center justify-center shrink-0 mt-0.5`}>
                          <HiOutlinePhone className={`w-4 h-4 ${cat.iconColor} stroke-[2.5]`} />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-wide leading-none">
                            {contact.name}
                          </span>
                          <span className="text-base font-black text-slate-800 mt-1.5 leading-none group-hover:text-indigo-600 transition-colors">
                            {contact.phone}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-1.5 leading-none">
                            <HiOutlineClock className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
                            {contact.hours}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-slate-200/60 my-2" />

        {/* Helpful Guides Grid */}
        {filteredGuides.length > 0 && (
          <div className="text-left flex flex-col gap-4">
            <h2 className="text-lg font-bold text-slate-800">Helpful Guides & Resources</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  onClick={() => setActiveGuide(guide)}
                  className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between gap-4 h-full relative"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                      <HiOutlineDocumentText className="w-5 h-5 stroke-[2]" />
                    </div>
                    <HiOutlineArrowTopRightOnSquare className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors stroke-[2.5]" />
                  </div>
                  
                  <div className="flex-1 flex flex-col text-left">
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200/40 rounded-full px-2.5 py-0.5 w-fit mb-2">
                      {guide.category}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed line-clamp-2">
                      {guide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty Search State */}
        {filteredArticles.length === 0 && filteredGuides.length === 0 && (
          <div className="text-center py-16 px-4 border border-dashed border-slate-200 rounded-3xl">
            <p className="text-slate-400 text-sm font-semibold">No articles or guides matches your search.</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-2 text-xs text-indigo-600 font-bold hover:underline cursor-pointer"
            >
              Clear search text
            </button>
          </div>
        )}

        {/* Footer Office locator Box */}
        <div className="bg-gradient-to-r from-[#155DFC] to-[#9810FA] rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-md shadow-blue-500/10 text-left">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2B73FF] flex items-center justify-center shrink-0 shadow-xs border border-white/10 mt-1">
              <HiOutlineMapPin className="w-6 h-6 text-white stroke-[2]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-xl font-extrabold tracking-tight">City Municipal Office</h3>
              <p className="text-white/80 text-sm font-medium">123 Main Street, Downtown</p>
              <span className="text-white/70 text-xs font-semibold mt-1">Open Mon-Fri 9:00 AM - 5:00 PM</span>
              <button 
                onClick={triggerDirections}
                className="mt-3.5 bg-white text-indigo-700 hover:bg-slate-50 text-xs font-bold px-4 py-2.5 rounded-xl w-fit cursor-pointer shadow-xs active:scale-98 transition-all"
              >
                Get Directions
              </button>
            </div>
          </div>

          <div 
            onClick={() => triggerCall("1-800-CIVIC", "City Municipal Office")}
            className="bg-black/15 hover:bg-black/20 rounded-2xl px-5 py-4 flex flex-col items-center md:items-end justify-center cursor-pointer transition-all duration-200 active:scale-98 select-none"
          >
            <span className="text-[10px] font-black tracking-widest uppercase text-white/70">Call Us</span>
            <span className="text-lg md:text-xl font-black text-white mt-1">1-800-CIVIC</span>
          </div>
        </div>

      </main>

      {/* Guide detail reader modal */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="absolute inset-0 cursor-default" onClick={() => setActiveGuide(null)} />
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl border border-slate-100 flex flex-col max-h-[80vh] z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between text-left">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                  {activeGuide.category}
                </span>
                <h3 className="text-lg font-extrabold text-slate-800 mt-1.5 leading-tight">{activeGuide.title}</h3>
              </div>
              <button 
                onClick={() => setActiveGuide(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                <HiXMark className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[50vh] text-left">
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-medium">
                {activeGuide.content}
              </p>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setActiveGuide(null)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer active:scale-98"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article detail reader modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="absolute inset-0 cursor-default" onClick={() => setActiveArticle(null)} />
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden relative shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-56 bg-slate-100">
              <img 
                src={activeArticle.image} 
                alt={activeArticle.title} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-900/40 hover:bg-slate-900/60 text-white backdrop-blur-xs transition-colors cursor-pointer flex items-center justify-center"
              >
                <HiXMark className="w-5 h-5 stroke-[2.5]" />
              </button>
              <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-full text-xs font-bold text-slate-700">
                {activeArticle.category}
              </span>
            </div>
            <div className="p-6 border-b border-slate-100 text-left">
              <h3 className="text-xl font-extrabold text-slate-800 leading-tight">{activeArticle.title}</h3>
              <span className="text-[10px] font-bold text-slate-400 mt-1.5 block">{activeArticle.date}</span>
            </div>
            <div className="p-6 overflow-y-auto max-h-[40vh] text-left">
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-medium">
                {activeArticle.content}
              </p>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer active:scale-98"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Simulated Call Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900/95 text-white text-xs font-semibold py-3.5 px-5 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-xs border border-slate-800">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

    </div>
  );
}
