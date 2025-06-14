import { useEffect, useState } from "react";



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



import SearchBar from "../components/searchBar";



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

        <SearchBar  searchA={searchA}
          setSearchA={setSearchA}
          searchB={searchB}
          setSearchB={setSearchB}
          handleSearch={handleSearch}
          info={info}  />




        <MapContainer center={center} zoom={13} style={{ height: "100vh", width: "100%" }}>



          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler setPointB={setPointB} style={{ "z-index":"1" , "position": "fixed"}} />




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
