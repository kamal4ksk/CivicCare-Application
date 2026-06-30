import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineFire, HiOutlineInformationCircle } from 'react-icons/hi2';
import { FiLayers } from 'react-icons/fi';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DistrictHotspotCard from './DistrictHotspotCard';

// Setup Mapbox Token
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';
mapboxgl.accessToken = MAPBOX_TOKEN;

// 14 Districts of Kerala data
const districtsData = [
  { rank: 1, name: "Ernakulam", category: "Potholes", count: 112, color: "bg-red-500", lat: 9.9816, lng: 76.2999, reports: "112 reports", top: "68%", left: "50%" },
  { rank: 2, name: "Thiruvananthapuram", category: "Corruption", count: 95, color: "bg-red-500", lat: 8.5241, lng: 76.9366, reports: "95 reports", top: "92%", left: "70%" },
  { rank: 3, name: "Thrissur", category: "Electricity", count: 89, color: "bg-orange-500", lat: 10.5276, lng: 76.2144, reports: "89 reports", top: "58%", left: "45%" },
  { rank: 4, name: "Alappuzha", category: "Flooding", count: 76, color: "bg-blue-500", lat: 9.4981, lng: 76.3388, reports: "76 reports", top: "79%", left: "48%" },
  { rank: 5, name: "Kozhikode", category: "Corruption", count: 74, color: "bg-red-500", lat: 11.2588, lng: 75.7804, reports: "74 reports", top: "34%", left: "30%" },
  { rank: 6, name: "Kollam", category: "Potholes", count: 67, color: "bg-orange-500", lat: 8.8932, lng: 76.6141, reports: "67 reports", top: "86%", left: "58%" },
  { rank: 7, name: "Malappuram", category: "Potholes", count: 63, color: "bg-orange-500", lat: 11.0735, lng: 76.0740, reports: "63 reports", top: "45%", left: "40%" },
  { rank: 8, name: "Kannur", category: "Water Supply", count: 57, color: "bg-orange-500", lat: 11.8745, lng: 75.3704, reports: "57 reports", top: "20%", left: "22%" },
  { rank: 9, name: "Kottayam", category: "Road Damage", count: 48, color: "bg-orange-500", lat: 9.5916, lng: 76.5221, reports: "48 reports", top: "74%", left: "55%" },
  { rank: 10, name: "Palakkad", category: "Waste Management", count: 41, color: "bg-orange-500", lat: 10.7867, lng: 76.6547, reports: "41 reports", top: "52%", left: "55%" },
  { rank: 11, name: "Idukki", category: "Forest Fire", count: 35, color: "bg-orange-500", lat: 9.9189, lng: 77.1025, reports: "35 reports", top: "66%", left: "70%" },
  { rank: 12, name: "Wayanad", category: "Landslide Risk", count: 32, color: "bg-blue-500", lat: 11.6854, lng: 76.1320, reports: "32 reports", top: "24%", left: "34%" },
  { rank: 13, name: "Pathanamthitta", category: "Electricity", count: 29, color: "bg-blue-500", lat: 9.2648, lng: 76.7870, reports: "29 reports", top: "82%", left: "62%" },
  { rank: 14, name: "Kasaragod", category: "Water Shortage", count: 28, color: "bg-blue-500", lat: 12.5102, lng: 74.9852, reports: "28 reports", top: "10%", left: "15%" }
];

const generateGeoJSON = (districts) => {
  const features = [];
  districts.forEach(d => {
    features.push({
      type: 'Feature',
      properties: {
        id: `${d.name}-primary`,
        district: d.name,
        category: d.category,
        intensity: Math.floor(d.count / 18) + 1,
        description: `Frequent reports of ${d.category.toLowerCase()} in ${d.name} center.`
      },
      geometry: {
        type: 'Point',
        coordinates: [d.lng, d.lat]
      }
    });

    const numPoints = Math.min(6, Math.floor(d.count / 15));
    for (let i = 0; i < numPoints; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.04 + Math.random() * 0.12;
      const offsetLng = Math.cos(angle) * radius;
      const offsetLat = Math.sin(angle) * radius;
      features.push({
        type: 'Feature',
        properties: {
          id: `${d.name}-sec-${i}`,
          district: d.name,
          category: d.category,
          intensity: Math.floor(Math.random() * 3) + 1,
          description: `Active ${d.category.toLowerCase()} report under validation.`
        },
        geometry: {
          type: 'Point',
          coordinates: [d.lng + offsetLng, d.lat + offsetLat]
        }
      });
    }
  });

  return { type: 'FeatureCollection', features };
};

export default function DistrictHotspots() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v12');
  const [showStyleMenu, setShowStyleMenu] = useState('false');

  const maxCount = Math.max(...districtsData.map(d => d.count));
  const geojsonData = generateGeoJSON(districtsData);

  useEffect(() => {
    if (!MAPBOX_TOKEN || !mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [76.25, 10.4],
      zoom: 7.1,
      minZoom: 6,
      maxZoom: 14
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('style.load', () => {
      map.addSource('hotspots', {
        type: 'geojson',
        data: geojsonData
      });

      map.addLayer({
        id: 'hotspots-heat',
        type: 'heatmap',
        source: 'hotspots',
        maxzoom: 15,
        paint: {
          'heatmap-weight': ['interpolate', ['linear'], ['get', 'intensity'], 0, 0, 6, 1.2],
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(0, 0, 255, 0)',
            0.15, 'rgba(56, 189, 248, 0.45)',
            0.4, 'rgba(34, 197, 94, 0.7)',
            0.65, 'rgba(234, 179, 8, 0.85)',
            0.85, 'rgba(249, 115, 22, 0.95)',
            1.0, 'rgba(239, 68, 68, 1)'
          ],
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 24],
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0.9, 14, 0.15]
        }
      });

      map.addLayer({
        id: 'hotspots-point',
        type: 'circle',
        source: 'hotspots',
        minzoom: 8,
        paint: {
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            8, ['interpolate', ['linear'], ['get', 'intensity'], 1, 4, 6, 9],
            14, ['interpolate', ['linear'], ['get', 'intensity'], 1, 10, 6, 22]
          ],
          'circle-color': [
            'match', ['get', 'category'],
            'Potholes', '#ef4444',
            'Corruption', '#ec4899',
            'Electricity', '#f97316',
            'Flooding', '#3b82f6',
            'Water Supply', '#06b6d4',
            'Road Damage', '#8b5cf6',
            'Waste Management', '#10b981',
            'Forest Fire', '#dc2626',
            'Landslide Risk', '#b45309',
            '#ef4444'
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 0.85
        }
      });
    });

    map.on('click', 'hotspots-point', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const { category, description, district } = e.features[0].properties;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup({ className: 'custom-mapbox-popup', closeButton: true })
        .setLngLat(coordinates)
        .setHTML(`
          <div style="font-family: system-ui, sans-serif; padding: 4px; min-width: 140px;">
            <h4 style="margin: 0 0 3px 0; font-weight: 800; font-size: 13px; color: #1e293b;">${category}</h4>
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b; font-weight: 600;">${district} District</p>
            <span style="font-size: 11px; color: #334155; line-height: 1.4; display: block;">${description}</span>
          </div>
        `)
        .addTo(map);
    });

    map.on('mouseenter', 'hotspots-point', () => { map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseleave', 'hotspots-point', () => { map.getCanvas().style.cursor = ''; });

    return () => { map.remove(); };
  }, [mapStyle]);

  const handleDistrictClick = (d) => {
    setSelectedDistrict(d.name);

    if (MAPBOX_TOKEN && mapRef.current) {
      mapRef.current.flyTo({
        center: [d.lng, d.lat],
        zoom: 9.8,
        essential: true,
        duration: 1500
      });

      const activePopups = document.getElementsByClassName('mapboxgl-popup');
      while (activePopups[0]) { activePopups[0].remove(); }

      setTimeout(() => {
        if (!mapRef.current) return;
        new mapboxgl.Popup({ className: 'custom-mapbox-popup' })
          .setLngLat([d.lng, d.lat])
          .setHTML(`
            <div style="font-family: system-ui, sans-serif; padding: 4px; text-align: center;">
              <h4 style="margin: 0 0 2px 0; font-weight: 800; font-size: 14px; color: #1e293b;">${d.name}</h4>
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b;">Primary Issue: <strong style="color: #475569;">${d.category}</strong></p>
              <div style="background-color: #fef2f2; border: 1px solid #fee2e2; border-radius: 8px; padding: 6px 10px; display: inline-block;">
                <span style="font-size: 12px; font-weight: 800; color: #ef4444;">${d.count} Active Reports</span>
              </div>
            </div>
          `)
          .addTo(mapRef.current);
      }, 1500);
    } else {
      const mapViewport = document.getElementById('map-viewport-container');
      if (mapViewport) { mapViewport.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    }
  };

  return (
    // Fixed: Included id="map-section" right here to coordinate anchor scrolling transitions properly
    <section id="map-section" className="w-full min-h-screen py-20 px-4 md:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-[rgb(10,10,10)] font-sans antialiased">
      <style>{`
        .mapboxgl-popup-content {
          border-radius: 16px !important;
          padding: 14px 16px !important;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08) !important;
          border: 1px solid rgba(226, 232, 240, 0.8) !important;
          background: rgba(255, 255, 255, 0.98) !important;
          backdrop-filter: blur(8px);
        }
        .mapboxgl-popup-close-button {
          color: #64748b !important;
          font-size: 16px !important;
          padding: 6px 10px !important;
          top: 6px !important;
          right: 6px !important;
          border-radius: 50%;
        }
        .mapboxgl-popup-close-button:hover {
          background-color: #f1f5f9 !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/50 rounded-full text-amber-700 text-xs font-semibold tracking-wide mb-4 shadow-sm">
            <HiOutlineFire className="w-4 h-4 text-amber-500 fill-amber-500/20 animate-pulse" />
            <span>Live Issue Hotspots</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Kerala District Hotspots
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            See where citizens are raising concerns across all 14 districts. Tap on any bubble to view details.
          </p>
        </div>

        {/* Main Split Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: Map Card Viewport */}
          <div id="map-viewport-container" className="lg:col-span-5 flex flex-col w-full">
            <div className="w-full relative aspect-[3/4] bg-white border-8 border-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] rounded-[32px] overflow-hidden flex flex-col">
              {MAPBOX_TOKEN ? (
                <>
                  <div ref={mapContainerRef} className="w-full flex-1" />
                  <div className="absolute top-4 left-4 z-10">
                    <button
                      onClick={() => setShowStyleMenu(!showStyleMenu)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-white/95 backdrop-blur-md border border-slate-100 shadow-sm rounded-xl text-slate-700 hover:text-slate-900 font-semibold text-xs"
                    >
                      <FiLayers className="w-3.5 h-3.5" />
                      <span>Map Layers</span>
                    </button>
                    {showStyleMenu && (
                      <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-slate-100 shadow-md rounded-xl p-1 z-20">
                        <button onClick={() => { setMapStyle('mapbox://styles/mapbox/streets-v12'); setShowStyleMenu(false); }} className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg ${mapStyle.includes('streets') ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}>Streets Style</button>
                        <button onClick={() => { setMapStyle('mapbox://styles/mapbox/dark-v11'); setShowStyleMenu(false); }} className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg ${mapStyle.includes('dark') ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}>Snapchat Dark</button>
                        <button onClick={() => { setMapStyle('mapbox://styles/mapbox/light-v11'); setShowStyleMenu(false); }} className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg ${mapStyle.includes('light') ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}>Minimal Light</button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full flex-1 bg-slate-50 relative flex flex-col justify-center items-center p-6 overflow-hidden">
                  <div className="relative w-auto h-full max-h-[380px] flex justify-center items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Districts_of_Kerala.png" alt="Kerala Districts Fallback" className="w-auto h-full object-contain opacity-80 select-none mix-blend-multiply" />
                    {districtsData.map((d) => (
                      <div key={d.rank} className="absolute z-10 cursor-pointer flex flex-col items-center group transition-transform duration-200 hover:scale-110" style={{ top: d.top, left: d.left }} onClick={() => setSelectedDistrict(d.name)}>
                        <div className="relative flex h-4 w-4 items-center justify-center">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${d.name === selectedDistrict ? 'bg-red-400 ring-4 ring-red-400/20' : 'bg-orange-400'}`}></span>
                          <span className={`relative inline-flex rounded-full h-3 w-3 shadow-md border-2 border-white ${d.name === selectedDistrict ? 'bg-red-600' : 'bg-orange-500'}`}></span>
                        </div>
                        <div className={`absolute bottom-full mb-2 whitespace-nowrap bg-slate-900 text-white rounded-lg px-2 py-1 text-[10px] font-bold shadow-lg opacity-0 transition-opacity pointer-events-none group-hover:opacity-100 ${d.name === selectedDistrict ? 'opacity-100' : ''}`}>
                          <div className="text-center">
                            <div>{d.name}</div>
                            <div className="text-red-400 font-extrabold">{d.reports}</div>
                          </div>
                          <div className="w-1.5 h-1.5 bg-slate-900 absolute top-full left-1/2 -translate-x-1/2 rotate-45" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-x-4 bottom-4 bg-white/95 backdrop-blur-xs border border-amber-200 shadow-md rounded-2xl p-4 flex gap-3 z-20">
                    <HiOutlineInformationCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Mapbox Token Required</h4>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Please insert your `VITE_MAPBOX_ACCESS_TOKEN` in the `.env` file to activate the live map.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 px-2">
              <span className="block text-xs font-bold text-slate-700 mb-2">Heatmap Intensity</span>
              <div className="w-full h-2.5 rounded-full bg-gradient-to-r from-sky-400 via-green-400 to-red-500 shadow-inner" />
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mt-1.5 tracking-wide uppercase">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Districts list */}
          <div className="lg:col-span-7 flex flex-col w-full">
            <div className="flex items-center justify-between mb-6 px-1">
              <h3 className="text-lg font-extrabold text-slate-850">Top Districts by Active Issues</h3>
              <span className="text-xs text-slate-400 font-semibold">14 Districts Active</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 max-h-[380px] md:max-h-[480px] lg:max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
              {districtsData.map((d) => (
                <DistrictHotspotCard
                  key={d.rank}
                  rank={d.rank}
                  name={d.name}
                  category={d.category}
                  count={d.count}
                  color={d.color}
                  maxCount={maxCount}
                  isActive={selectedDistrict === d.name}
                  onClick={() => handleDistrictClick(d)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </section>
  );
}