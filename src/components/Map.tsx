"use client";

import { MapContainer, Marker, TileLayer, Popup, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import { PopupMap } from "./PopupMap";
import { MapInfo, PointsType } from "@/data/place";
import { useState } from "react";
import RegisterPlace from "./RegisterPlace";

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

type positionProps = {
  setFormPosition: (position: [number,number]) => void
}

function ShowPlaceFormOnClick({setFormPosition}: positionProps) {
  useMapEvent("click", (e)=>{

    const position: [number, number] = [e.latlng.lat, e.latlng.lng]
     setFormPosition(position)
  })

  return null;
}

export default function Map({ places }: { places: MapInfo[] }) {
  
  const [formPosition, setFormPosition] = useState<[number,number] | null>(null)
  
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
      {places.map((info) => (
        <Marker
          key={info.id}
          position={[parseFloat(info.latitude), parseFloat(info.longitude)]}
          icon={mapIcon[info.typePlace]}
        >
          <Popup closeButton={false} keepInView={false}>
            <PopupMap
              images={[
                "https://www.villamango.com.br/wp-content/uploads/2024/09/2.jpg",
                "https://www.temporadalivre.com/uploads/editor/pictures/b7ce1912d263/content_Icaraizinho-Luftansicht-vom-Strand_608x404-ID2090474-7c173b0b80dbecd9434e659f2e45e643.jpg",
                "https://media-cdn.tripadvisor.com/media/photo-s/15/a4/56/d0/de-praia-brasil.jpg",
              ]}
              name={info.name}
              whatsapp={info.whatsApp}
              phone={info.phone}
              email={info.email}
              instagram={info.instagram}
              website={info.website}
            />
          </Popup>
        </Marker>
      ))}

      <ShowPlaceFormOnClick setFormPosition={setFormPosition}/>

      {formPosition && (
        <Marker
          position={formPosition}
          icon={
            new L.Icon({
              iconUrl:"https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize:[40, 40],
            })
          }
        >
          <Popup closeButton={false}>
            <div onClick={(e) => e.stopPropagation()}>
              <RegisterPlace
              lat={formPosition[0]} 
              lng={formPosition[1]}/>
            </div>
          </Popup>
        </Marker>
      )}  
    </MapContainer>
  );
}
