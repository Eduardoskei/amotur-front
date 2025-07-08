// src/data/places.ts

export type PointsType = "Restaurante" | "Pousada" | "Hotel" | "Bar";

export type MapInfo = {
  id: string;
  name: string;
  typePlace: PointsType;
  latitude: string;
  longitude: string;
  whatsApp: string;
  email?: string;
  phone?: string;
  instagram?: string;
  website?: string;
  // images: string[]
  beach: string;
};

export const places: MapInfo[] = [
  {
    id: "1",
    name: "Pousada Villa Mango",
    typePlace: "Pousada",
    latitude: "-3.0233383682799975",
    longitude: "-39.657587267228145",
    whatsApp: "(85) 991535286",
    website: "https://villamango.com.br",
    instagram: "@villamango",
    beach: "Icaraí",
  },
  {
    id: "2",
    name: "Sunset Bar Icaraizinho - Restaurante e Pizzaria",
    typePlace: "Restaurante",
    latitude: "-3.0243478431730897",
    longitude: "-39.64845456497045",
    whatsApp: "(88) 981626683",
    instagram: "@sunsetbaricaraizinho",
    beach: "Icaraí",
  },
  {
    id: "3",
    name: "Palm Beach Chalés, Restô e KiteSurf",
    typePlace: "Hotel",
    latitude: "-3.075967286851205",
    longitude: "-39.56842980213863",
    whatsApp: "(85) 99999-1007",
    instagram: "@palmbeach",
    beach: "Caetanos",
  },
  {
    id: "4",
    name: "Pousada Brisa del Mar",
    typePlace: "Pousada",
    latitude: "-3.077836722650056",
    longitude: "-39.56105609054402",
    whatsApp: "(85) 99999-1010",
    instagram: "@botecodoraul",
    beach: "Caetanos",
  },
  {
    id: "5",
    name: "Canoé Brasil",
    typePlace: "Pousada",
    latitude: "-3.0019915399602253",
    longitude: "-39.69851858568568",
    whatsApp: "(85) 981777788",
    beach: "Moitas",
  },
  {
    id: "6",
    name: "Barraca Da Queila E Vava",
    typePlace: "Bar",
    latitude: "-3.0002036208714284",
    longitude: "-39.69700499167119",
    whatsApp: "(88) 981095802",
    beach: "Moitas",
  },
];
