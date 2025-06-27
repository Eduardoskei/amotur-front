"use client";

import { useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { PopupMap } from "./PopupMap";
import L from 'leaflet';


type MapInfo = {
  id: string
  name: string
  typePlace: PointsType
  latitude: number
  longitude: number
  whatsapp: string
  email?: string
  phone?: string
  instagram?: string
  website?: string
};

type PointsType = 'Restaurante' | 'Pousada' | 'Hotel' | 'Bar' | 'PontoTuristico';

const mapIcon: Record<PointsType, L.Icon> = {
  Restaurante: new L.Icon({
    iconUrl: '/mapIcons/restaurant.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  Pousada: new L.Icon({
    iconUrl: '/mapIcons/guesthouse.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  Hotel: new L.Icon({
    iconUrl: '/mapIcons/hotel.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  Bar: new L.Icon({
    iconUrl: '/mapIcons/bar.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  PontoTuristico: new L.Icon({
    iconUrl: '/mapIcons/turisticspot.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  })
};

const places:MapInfo[] = [
  {
    id: "1",
    name: "Pousada Curva dos Ventos",
    typePlace: "Pousada",
    latitude: -3.0370,
    longitude: -39.6675,
    whatsapp: "(88) 98140-3075",
    website: "https://curvadosventos.com.br",
    instagram: "@curvadosventos"
  },
  {
    id: "2",
    name: "Casa de Pedra Icaraizinho",
    typePlace: "Hotel",
    latitude: -3.0390,
    longitude: -39.6660,
    whatsapp: "(85) 99120-5550"
  },
  {
    id: "3",
    name: "Restaurante Hibisco",
    typePlace: "Restaurante",
    latitude: -3.0366,
    longitude: -39.6673,
    whatsapp: "(85) 99999-1007",
    instagram: "@restaurantehibisco"
  },
  {
    id: "4",
    name: "Pousada Brisa del Mar",
    typePlace: "Pousada",
    latitude: -3.0365,
    longitude: -39.6672,
    whatsapp: "(85) 99999-1010",
    website: "https://brisadelmar.com"
  },
  {
    id: "5",
    name: "Restaurante Moinho dos Ventos",
    typePlace: "Restaurante",
    latitude: -3.0371,
    longitude: -39.6676,
    whatsapp: "(85) 99999-1011"
  },
  {
    id: "6",
    name: "Pousada Villa Mango",
    typePlace: "Pousada",
    latitude: -3.0362,
    longitude: -39.6670,
    whatsapp: "(85) 99999-1012"
  },
  {
    id: "7",
    name: "Pousada Canaã Icaraizinho",
    typePlace: "Pousada",
    latitude: -3.0380,
    longitude: -39.6655,
    whatsapp: "(85) 99999-1013",
    website: "https://pousadacanaa.com.br"
  },
  {
    id: "8",
    name: "Umami Restaurant & Residence",
    typePlace: "Restaurante",
    latitude: -3.0375,
    longitude: -39.6678,
    whatsapp: "(85) 99999-1014",
    instagram: "@umamirestaurant"
  },
  {
    id: "9",
    name: "Praia de Icaraí (Ponto Turístico)",
    typePlace: "PontoTuristico",
    latitude: -3.0369,
    longitude: -39.6675,
    whatsapp: ""
  },
  {
    id: "10",
    name: "Hotel Vila do Sol",
    typePlace: "Hotel",
    latitude: -3.0348,
    longitude: -39.6690,
    whatsapp: "(85) 99999-1015"
  },
  {
    id: "11",
    name: "Bar e Restaurante Pé na Areia",
    typePlace: "Bar",
    latitude: -3.0402,
    longitude: -39.6655,
    whatsapp: "(85) 98888-7777",
    email: "contato@penaareia.com.br",
    phone: "(85) 3344-5566",
    instagram: "@penaareia",
    website: "https://penaareia.com.br"
  }
];


export default function Map() {

  const [mapInfo, setMapInfo] = useState(places);

  return (
    <MapContainer
      center={[-3.036872, -39.668872]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {mapInfo.map((info) =>(
        <Marker key={info.id} position={[info.latitude, info.longitude]} icon={mapIcon[info.typePlace]}>
          <Popup>
            <PopupMap 
            name={info.name} 
            whatsapp={info.whatsapp} 
            phone={info.phone} 
            email={info.email} 
            instagram={info.instagram} 
            website={info.website}/>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
