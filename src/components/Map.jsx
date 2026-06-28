import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ZoomControl,
  Circle,
  Marker,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";

function Map({
  mapView,
  selectedDistrict,
  setSelectedDistrict,
}) {

  const [districts, setDistricts] = useState(null);

  const districtCounts = {
    Kannur: 78,
    Kozhikode: 85,
    Wayanad: 32,
    Malappuram: 61,
    Palakkad: 48,
    Kasaragod: 56,
    Thrissur: 112,
    Ernakulam: 230,
    Kottayam: 38,
    Kollam: 67,
    Alappuzha: 45,
    Pathanamthitta: 22,
    Idukki: 28,
    Thiruvananthapuram: 81,
  };

  const districtData = {

    Ernakulam: {
      total: 230,
      pending: 40,
      progress: 35,
      resolved: 155,
      issues: [
        "Potholes",
        "Waste Management",
        "Water Supply",
      ],

      myReports: [
        {
          title: "Pothole near bus stand",
          status: "Resolved",
        },
      ],
    },

    Thrissur: {
      total: 112,
      pending: 18,
      progress: 24,
      resolved: 70,
      issues: [
        "Street Lights",
        "Flooding",
        "Road Damage"
      ]
    },

    Kozhikode: {
      total: 85,
      pending: 20,
      progress: 15,
      resolved: 50,
      issues: [
        "Drainage",
        "Garbage",
        "Water Supply"
      ]
    },

    Kannur: {
      total: 78,
      pending: 16,
      progress: 18,
      resolved: 44,
      issues: [
        "Road Damage",
        "Garbage",
        "Street Lights"
      ]
    },
    Malappuram: {
      total: 61,
      pending: 14,
      progress: 10,
      resolved: 37,
      issues: [
        "Road Repair",
        "Power Outage",
        "Water Supply",
      ],

      myReports: [
        {
          title: "Garbage pile near school",
          status: "Pending",
        },
        {
          title: "Street light not working",
          status: "Resolved",
        },
      ],
    },

    Palakkad: {
      total: 48,
      pending: 10,
      progress: 8,
      resolved: 30,
      issues: [
        "Waste",
        "Drainage",
        "Roads"
      ]
    },

    Kasaragod: {
      total: 56,
      pending: 12,
      progress: 10,
      resolved: 34,
      issues: [
        "Road",
        "Electricity",
        "Water"
      ]
    },

    Wayanad: {
      total: 32,
      pending: 7,
      progress: 6,
      resolved: 19,
      issues: [
        "Road",
        "Bridge",
        "Water"
      ]
    },

    Idukki: {
      total: 28,
      pending: 5,
      progress: 6,
      resolved: 17,
      issues: [
        "Landslide",
        "Road",
        "Bridge"
      ]
    },

    Kottayam: {
      total: 38,
      pending: 7,
      progress: 8,
      resolved: 23,
      issues: [
        "Waste",
        "Road",
        "Drainage"
      ]
    },

    Alappuzha: {
      total: 45,
      pending: 10,
      progress: 8,
      resolved: 27,
      issues: [
        "Flooding",
        "Road",
        "Water"
      ]
    },

    Kollam: {
      total: 67,
      pending: 13,
      progress: 15,
      resolved: 39,
      issues: [
        "Garbage",
        "Street Lights",
        "Road"
      ]
    },

    Pathanamthitta: {
      total: 22,
      pending: 4,
      progress: 5,
      resolved: 13,
      issues: [
        "Bridge",
        "Road",
        "Water"
      ]
    },

    Thiruvananthapuram: {
      total: 81,
      pending: 15,
      progress: 20,
      resolved: 46,
      issues: [
        "Traffic",
        "Garbage",
        "Water"
      ]
    }

  };

  const heatmapData = [
    {
      district: "Kasaragod",
      count: 56,
      center: [12.45, 75.15],
    },
    {
      district: "Kannur",
      count: 78,
      center: [11.99, 75.53],
    },
    {
      district: "Wayanad",
      count: 32,
      center: [11.71, 76.10],
    },
    {
      district: "Kozhikode",
      count: 85,
      center: [11.5, 75.80],
    },
    {
      district: "Malappuram",
      count: 61,
      center: [11.10, 76.20],
    },
    {
      district: "Palakkad",
      count: 48,
      center: [10.80, 76.55],
    },
    {
      district: "Thrissur",
      count: 112,
      center: [10.50, 76.20],
    },
    {
      district: "Ernakulam",
      count: 230,
      center: [10.10, 76.45],
    },
    {
      district: "Idukki",
      count: 28,
      center: [9.85, 76.97],
    },
    {
      district: "Kottayam",
      count: 38,
      center: [9.59, 76.52],
    },
    {
      district: "Alappuzha",
      count: 45,
      center: [9.40, 76.45],
    },
    {
      district: "Pathanamthitta",
      count: 22,
      center: [9.27, 76.90],
    },
    {
      district: "Kollam",
      count: 67,
      center: [8.95, 76.90],
    },
    {
      district: "Thiruvananthapuram",
      count: 81,
      center: [8.62, 77.04],
    },
  ];

  const reportPins = [
    {
      district: "Ernakulam",
      count: 1,
      priority: "High",
      center: [10.1632, 76.5413],
    },
    {
      district: "Malappuram",
      count: 2,
      priority: "Medium",
      center: [11.0732, 76.0740],
    },
  ];

  const issuePins = [
    {
      id: 1,
      district: "Kasaragod",
      title: "Road Damage",
      count: 3,
      priority: "High",
      position: [12.49, 74.99],
    },
    {
      id: 2,
      district: "Kannur",
      title: "Garbage",
      count: 5,
      priority: "Medium",
      position: [11.88, 75.40],
    },
    {
      id: 3,
      district: "Wayanad",
      title: "Water Leakage",
      count: 1,
      priority: "Low",
      position: [11.70, 76.13],
    },
    {
      id: 4,
      district: "Kozhikode",
      title: "Street Light",
      count: 6,
      priority: "High",
      position: [11.26, 75.78],
    },
    {
      id: 5,
      district: "Malappuram",
      title: "Road Block",
      count: 2,
      priority: "Medium",
      position: [11.04, 76.08],
    },
    {
      id: 6,
      district: "Palakkad",
      title: "Drainage",
      count: 1,
      priority: "Low",
      position: [10.78, 76.65],
    },
    {
      id: 7,
      district: "Thrissur",
      title: "Flood",
      count: 4,
      priority: "High",
      position: [10.53, 76.21],
    },
    {
      id: 8,
      district: "Ernakulam",
      title: "Traffic",
      count: 7,
      priority: "High",
      position: [10.01, 76.32],
    },
    {
      id: 9,
      district: "Idukki",
      title: "Landslide",
      count: 2,
      priority: "Medium",
      position: [9.85, 76.97],
    },
    {
      id: 10,
      district: "Kottayam",
      title: "Water",
      count: 1,
      priority: "Low",
      position: [9.59, 76.52],
    },
    {
      id: 11,
      district: "Alappuzha",
      title: "Garbage",
      count: 2,
      priority: "Medium",
      position: [9.49, 76.34],
    },
    {
      id: 12,
      district: "Pathanamthitta",
      title: "Bridge",
      count: 1,
      priority: "Low",
      position: [9.27, 76.78],
    },
    {
      id: 13,
      district: "Kollam",
      title: "Street Light",
      count: 3,
      priority: "Medium",
      position: [8.89, 76.61],
    },
    {
      id: 14,
      district: "Thiruvananthapuram",
      title: "Water",
      count: 5,
      priority: "High",
      position: [8.52, 76.94],
    },
  ];


  useEffect(() => {
    fetch("/data/district.geojson")
      .then((res) => {
        console.log("GeoJSON Status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("GeoJSON Loaded:", data);
        setDistricts(data);
      })
      .catch((err) => {
        console.error("GeoJSON Error:", err);
      });
  }, []);



  const districtStyle = (feature) => {
    const district = feature.properties.DISTRICT;
    const count = districtCounts[district] || 0;

    // Heatmap & Pins = white districts
    if (mapView === "heatmap" || mapView === "pins") {
      return {
        fillColor: "#ffffff",
        fillOpacity: 0.95,
        color: "#000000",
        weight: 2,
        opacity: 1,
      };
    }

    // District View = colored districts
    let color = "#22c55e";

    if (count > 200) color = "#991b1b";
    else if (count > 100) color = "#ef4444";
    else if (count > 70) color = "#f97316";
    else if (count > 40) color = "#facc15";

    return {
      fillColor: color,
      fillOpacity: 0.8,
      color: "#ffffff",
      weight: 2,
      opacity: 1,
    };
  };



  const onEachDistrict = (feature, layer) => {
    const district = feature.properties.DISTRICT || "District";
    const count = districtCounts[district] || 0;

    layer.unbindTooltip();

    // District View
    if (mapView === "district") {
      layer.bindTooltip(
        `
      <div class="district-marker">
        <div class="district-name">${district}</div>
        <div class="district-count">${count}</div>
      </div>
      `,
        {
          permanent: true,
          direction: "center",
          className: "district-tooltip",
        }
      );
    }

    // Heatmap View
    if (mapView === "heatmap") {
      layer.bindTooltip(
        `
      <div class="district-marker">
        <div class="district-name">${district}</div>
      </div>
      `,
        {
          permanent: true,
          direction: "center",
          className: "district-tooltip",
        }
      );
    }

    // Issue Pins View
    if (mapView === "pins") {
      layer.bindTooltip(
        `
      <div class="district-marker">
        <div class="district-name">${district}</div>
      </div>
      `,
        {
          permanent: true,
          direction: "center",
          className: "district-tooltip",
        }
      );
    }

    if (mapView === "reports") {
      layer.bindTooltip(
        `
      <div class="district-marker">
        <div class="district-name">${district}</div>
      </div>
    `,
        {
          permanent: true,
          direction: "center",
          className: "district-tooltip",
        }
      );
    }

    layer.on({

      click: () => {

        setSelectedDistrict({

          name: district,

          ...districtData[district],

        });

      },

      mouseover: (e) => {

        e.target.setStyle({
          fillOpacity: 1
        });

      },

      mouseout: (e) => {

        e.target.setStyle({

          fillOpacity:
            mapView === "district"
              ? 0.8
              : 0.95

        });

      }

    });
  };


  const createPin = (color, count) =>
    L.divIcon({
      className: "",
      html: `
      <div style="
        position:relative;
        width:38px;
        height:50px;
      ">
        <div style="
          width:38px;
          height:38px;
          background:${color};
          border-radius:50%;
          color:white;
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:700;
          font-size:16px;
          box-shadow:0 8px 18px rgba(0,0,0,.25);
        ">
          ${count}
        </div>

        <div style="
          position:absolute;
          left:14px;
          bottom:0;
          width:0;
          height:0;
          border-left:6px solid transparent;
          border-right:6px solid transparent;
          border-top:12px solid ${color};
        "></div>
      </div>
    `,
      iconSize: [38, 50],
      iconAnchor: [19, 50],
    });






  return (
    <div className="relative z-0 h-[450px] md:h-[720px] rounded-b-2xl md:rounded-b-none md:rounded-r-2xl overflow-hidden">
      <MapContainer
        center={[10.5605, 76.3911]}
        zoom={8}
        zoomControl={false}
        className="h-full w-full"
      >
        <ZoomControl position="bottomright" />



        {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        /> */}



        {districts && (
          <GeoJSON
            key={mapView}
            data={districts}
            style={(feature) => districtStyle(feature)}
            onEachFeature={(feature, layer) =>
              onEachDistrict(feature, layer)
            }
          />
        )}

        {mapView === "heatmap" &&
          heatmapData.map((item) => (
            <Circle
              key={item.district}
              center={item.center}
              radius={
                item.count > 200
                  ? 9500
                  : item.count > 100
                    ? 7500
                    : item.count > 70
                      ? 6000
                      : item.count > 40
                        ? 5000
                        : 4000
              }
              pathOptions={{
                fillColor:
                  item.count > 200
                    ? "#991b1b"
                    : item.count > 100
                      ? "#ef4444"
                      : item.count > 70
                        ? "#f97316"
                        : item.count > 40
                          ? "#f59e0b"
                          : "#facc15",

                fillOpacity: 0.55,
                color: "#ffffff",
                weight: 1,
              }}
            />

          ))}

        {mapView === "pins" &&
          issuePins.map((pin) => {
            const color =
              pin.priority === "High"
                ? "#ef4444"
                : pin.priority === "Medium"
                  ? "#f97316"
                  : "#22c55e";

            return (
              <Marker
                key={pin.id}
                position={pin.position}
                icon={createPin(color, pin.count)}
              >
                <Tooltip direction="top">
                  <div className="text-sm">
                    <div className="font-semibold">{pin.title}</div>
                    <div>{pin.district}</div>
                    <div>{pin.priority} Priority</div>
                  </div>
                </Tooltip>
              </Marker>
            );
          })}

        {mapView === "reports" &&
          reportPins.map((item) => {
            let color = "#22c55e";

            if (item.priority === "High")
              color = "#ef4444";
            else if (item.priority === "Medium")
              color = "#f97316";

            return (
              <Marker
                key={item.district}
                position={item.center}
                icon={L.divIcon({
                  className: "",
                  html: `
            <div style="position:relative;display:flex;justify-content:center;align-items:center;">

              <div style="
                width:56px;
                height:56px;
                border-radius:9999px;
                background:${color};
                opacity:.2;
                position:absolute;
              "></div>

              <div style="
                width:38px;
                height:38px;
                border-radius:9999px;
                background:${color};
                color:white;
                display:flex;
                justify-content:center;
                align-items:center;
                font-weight:bold;
                font-size:16px;
                position:relative;
              ">
                ${item.count}
              </div>

            </div>
          `,
                  iconSize: [56, 56],
                })}
              />
            );
          })}

      </MapContainer>

    </div>
  );
}

export default Map;