"use client";

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import { PopupMap } from "./PopupMap";
import { MapInfo, PointsType } from "@/data/place";

const mapIcon: Record<PointsType, L.Icon> = {
  Restaurante: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/948/948036.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  Pousada: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6254/6254153.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  Hotel: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3009/3009489.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  Bar: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2564/2564169.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
};

export default function Map({ places }: { places: MapInfo[] }) {
  return (
    <MapContainer
      center={[-3.036872, -39.668872]}
      zoom={10}
      minZoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {places.map((info) => {
        const contacts = typeof info.contacts === 'string' ? JSON.parse(info.contacts) : info.contacts;

        return (
          <Marker
            key={info.id}
            position={[parseFloat(info.latitude), parseFloat(info.longitude)]}
            icon={mapIcon[info.typePlace]}
          >
            <Popup closeButton={false} keepInView={true}>
              <PopupMap
                images={info.imagens}
                name={info.name}
                whatsapp={contacts.whatsApp}
                phone={contacts.phone}
                email={contacts.email}
                instagram={contacts.instagram}
                website={contacts.website}
              />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
