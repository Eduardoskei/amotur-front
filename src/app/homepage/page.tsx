'use client'

import NavBar from "@/components/NavBar";
import dynamic from "next/dynamic";
import { Filter } from "@/components/Filter";
import { useEffect, useState } from "react";
import { MapInfo, PointsType } from "@/data/place";
import MapLoading from "@/components/MapLoading";
import { getPlaces } from "@/services/placeService";


const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <MapLoading />,
});

export default function Home() {
  const [places, setPlaces] = useState<MapInfo[]>([]);
  const [locaisFiltrados, setLocaisFiltrados] = useState<MapInfo[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState<PointsType[]>([]);
  const [praiasSelecionadas, setPraiasSelecionadas] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const data = await getPlaces();
      setPlaces(data);
      setLocaisFiltrados(data); 
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => {
      
      const matchTipo =
        tipoSelecionado.length === 0 || tipoSelecionado.includes(place.typePlace);

      const matchPraia =
        praiasSelecionadas.length === 0 || praiasSelecionadas.includes(place.praia); 

      return matchTipo && matchPraia;
    });
    setLocaisFiltrados(filtered);
  }, [places, tipoSelecionado, praiasSelecionadas]);
  return (
    <div className="w-full h-full absolute font-poppins">
      <NavBar links={[
        { label: "Entrar", href: "#" },
        { label: "Cadastrar", href: "#" },
        { label: "Sobre", href: "#" },
        { label: "Sair", href: "#" }
      ]}
      tipoSelecionado={tipoSelecionado}
      setTipoSelecionado={setTipoSelecionado}
      praiasSelecionadas={praiasSelecionadas}
      setPraiasSelecionadas={setPraiasSelecionadas}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[375px_1fr]">

        <div className="hidden p-4 lg:flex flex-col bg-[#98A2B2]">
          <Filter
            tipoSelecionado={tipoSelecionado}
            setTipoSelecionado={setTipoSelecionado}
            praiasSelecionadas={praiasSelecionadas}
            setPraiasSelecionadas={setPraiasSelecionadas}
          />
        </div>

        <div className="h-[calc(100vh-96px)]
          md:h-[calc(100vh-80px)] w-full">
          <Map places={locaisFiltrados} />
        </div>
      </div>
    </div>
  );
}