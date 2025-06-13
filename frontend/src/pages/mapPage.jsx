import { useEffect, useState } from "react";

import "./pagecss/mapPage.css"

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
  Popup,
} from "react-leaflet";


import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";





const Routing = ({ from, to, setInfo }) => {
    
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
    })
      .on("routesfound", (e) => {
        const route = e.routes[0];
        const distance = (route.summary.totalDistance / 1000).toFixed(2);
        const time = Math.round(route.summary.totalTime / 60);
        setInfo({ distance, time });
      })
      .addTo(map);

    return () => map.removeControl(routingControl);
  }, [from, to]);

  return null;
};





const MapClickHandler = ({ setPointB }) => {
  useMapEvents({
    click(e) {
      setPointB({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};







const geocode = async (query) => {
  try {
    const res = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: query,
        format: "json",
        limit: 1,
      },
    });
    if (res.data.length === 0) return null;
    return {
      lat: parseFloat(res.data[0].lat),
      lng: parseFloat(res.data[0].lon),
    };
  } catch (error) {
    alert("Failed to geocode location");
    return null;
  }
};






export default function MapComponent() {
  const [center, setCenter] = useState({ lat: 28.61, lng: 77.23 });
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [info, setInfo] = useState(null);
  const [searchA, setSearchA] = useState("");
  const [searchB, setSearchB] = useState("");




  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const userLoc = { lat: latitude, lng: longitude };
        setCenter(userLoc);
        setPointA(userLoc);
      },
      () => alert("Could not access location")
    );
  }, []);




  const handleSearch = async () => {
    const aLoc = searchA ? await geocode(searchA) : pointA;
    const bLoc = await geocode(searchB);
    if (aLoc) setPointA(aLoc);
    if (bLoc) setPointB(bLoc);
    setInfo(null);
  };





  return (
    <div className="main-cont">
      {/* Search Bar */}
      <div
        style={{
    position: "absolute",
    zIndex: 1000,
    top: 10,
    left: "50%",
    transform: "translateX(-50%)", // Center horizontally
    background: "#fff",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
  }}
      >
        <div>
          <input
            placeholder="Search Point A"
            value={searchA}
            onChange={(e) => setSearchA(e.target.value)}
            style={{ width: "250px", marginBottom: "5px" }}
          />
        </div>
        <div>
          <input
            placeholder="Search Point B"
            value={searchB}
            onChange={(e) => setSearchB(e.target.value)}
            style={{ width: "250px" }}
          />
        </div>
        <button onClick={handleSearch} style={{ marginTop: "5px" }}>
          Search Route
        </button>
        <p style={{ fontSize: "12px", marginTop: "5px" }}>
          Or click on the map to set Point B
        </p>
        {info && (
          <>
            <div><strong>Distance:</strong> {info.distance} km</div>
            <div><strong>ETA:</strong> {info.time} minutes</div>
          </>
        )}
      </div>





      <MapContainer center={center} zoom={13} style={{ height: "100vh", width: "100%" }}>



        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler setPointB={setPointB} />




        {pointA && (
          <Marker position={pointA}>
            <Popup>Point A (Start)</Popup>
          </Marker>
        )}
        {pointB && (
          <Marker position={pointB}>
            <Popup>Point B (Destination)</Popup>
          </Marker>
        )}




        {pointA && pointB && (
          <Routing from={pointA} to={pointB} setInfo={setInfo} />
        )}



      </MapContainer>
    </div>
  );
}
