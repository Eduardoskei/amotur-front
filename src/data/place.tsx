// src/data/places.ts

export type PointsType = "Restaurante" | "Pousada" | "Hotel" | "Bar";

export type BeachType = 'Icarai' | 'Moitas' | 'Caetanos';

export type MapInfo = {
  id: string;
  name: string;
  typePlace: PointsType;
  latitude: string;
  longitude: string;
  contacts: {
    whatsApp: string;
    email?: string;
    phone?: string;
    instagram?: string;
    website?: string;
  };
  imagens: string[];
  beach: string;
};

export type PostPlaces = {
  name: string
  typePlace: PointsType
  latitude: string
  longitude: string
  contacts: {
    whatsApp: string
    email?: string
    phone?: string
    instagram?: string
    website?: string
  }
  praia: BeachType
  imagens: string[]
}

export type FormPlaces = {
  name: string;
  typePlace: PointsType;
  latitude: number;
  longitude: number;
  praia: BeachType;
  contacts: {
    whatsApp: string;
    email?: string;
    phone?: string;
    instagram?: string;
    website?: string;
  };
  imagens: File[]; // para envio via FormData
};
