import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMap as MapIcon, HiXMark as CloseIcon } from 'react-icons/hi2';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from "./Map";


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

export default function IssueMap() {
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const fullMapContainerRef = useRef(null);
  
  const [isFullMapOpen, setIsFullMapOpen] = useState(false);
  const geojsonData = generateGeoJSON(districtsData);

  // Initialize main inline Map
  useEffect(() => {
    if (!MAPBOX_TOKEN || !mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [76.25, 10.4],
      zoom: 7.1,
      minZoom: 6,
      maxZoom: 14,
      interactive: true
    });

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

    return () => map.remove();
  }, []);

  // Initialize Modal Full Map
  useEffect(() => {
    if (!isFullMapOpen || !MAPBOX_TOKEN || !fullMapContainerRef.current) return;

    // Small delay to ensure modal transitions/layout finishes before map engine initializes size calculations
    const timer = setTimeout(() => {
      const map = new mapboxgl.Map({
        container: fullMapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [76.25, 10.4],
        zoom: 6.8,
        minZoom: 6,
        maxZoom: 14,
        interactive: true
      });

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

    }, 200);

    return () => clearTimeout(timer);
  }, [isFullMapOpen]);

  return (
    <section className="w-full bg-transparent py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-[rgb(0,0,0)]">
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

      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between w-full mb-4 select-none">
          <div className="flex items-center space-x-2.5">
            <MapIcon className="w-5 h-5 text-blue-600 stroke-[2.2]" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Issue Heatmap
            </h2>
          </div>
          
          <button 
            onClick={() => navigate('/map')}
            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>Open Full Map</span>
            <FiArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Viewport Frame Container */}
        <div className="w-full h-[280px] sm:h-[340px] rounded-[24px] overflow-hidden relative shadow-xs border border-slate-200/50">
          
          <Map
            mapView="district"
            selectedDistrict={null}
            setSelectedDistrict={() => {}}
            className="w-full h-full relative z-0"
          />

          {/* Top-Left: Floating Mapped Count Badge */}
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md border border-slate-100 rounded-xl px-3 py-1.5 shadow-xs select-none">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight">
              14 Districts Mapped
            </span>
          </div>

          {/* Bottom-Right: Floating Action Overlay Capsule */}
          <button 
            onClick={() => navigate('/map')}
            className="absolute bottom-4 right-4 z-10 inline-flex items-center space-x-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-100 shadow-sm transition-all active:scale-98 cursor-pointer"
          >
            <span>View Full Map</span>
            <FiArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] text-slate-500" />
          </button>

          {/* Attribution Taglet */}
          <div className="absolute bottom-0 right-0 z-10 bg-white/80 backdrop-blur-xs text-[9px] font-medium text-slate-400 px-2 py-0.5 pointer-events-none select-none tracking-tight border-tl border-slate-100">
            🇺🇦 <span className="hover:underline text-blue-500">Leaflet</span> | © OpenStreetMap
          </div>

        </div>

      </div>

      {/* FULL MAP MODAL DIALOG */}
      {isFullMapOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setIsFullMapOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-150 select-none shrink-0">
              <div className="flex items-center space-x-2.5">
                <MapIcon className="w-5 h-5 text-blue-600 stroke-[2.2]" />
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Kerala Issues Heatmap (Full View)
                </h3>
              </div>
              <button 
                onClick={() => setIsFullMapOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-full transition-colors duration-200 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Map Viewport Container */}
            <div className="w-full flex-1 relative bg-slate-50">
              {MAPBOX_TOKEN ? (
                <div ref={fullMapContainerRef} className="w-full h-full" />
              ) : (
                <div className="w-full h-full bg-slate-100/40 flex items-center justify-center relative">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/1/18/Districts_of_Kerala.png" 
                    alt="Static Kerala Location Viewport Layout" 
                    className="w-full h-full object-contain opacity-40 mix-blend-multiply select-none p-4"
                  />
                  
                  {districtsData.map((d) => (
                    <div 
                      key={d.rank} 
                      className="absolute w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white shadow-md animate-pulse" 
                      style={{ top: d.top, left: d.left }}
                    />
                  ))}
                </div>
              )}

              {/* Attribution Overlay */}
              <div className="absolute bottom-0 right-0 z-10 bg-white/80 backdrop-blur-xs text-[9px] font-medium text-slate-400 px-2 py-0.5 pointer-events-none select-none tracking-tight border-tl border-slate-100">
                🇺🇦 <span className="hover:underline text-blue-500">Leaflet</span> | © OpenStreetMap
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}