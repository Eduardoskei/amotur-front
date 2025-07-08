'use client'

import NavBar from "@/components/NavBar";
import dynamic from "next/dynamic";
import { useState } from "react";
import { places, MapInfo, PointsType } from "@/data/place";
import MapLoading from "@/components/MapLoading";
import { Search } from "lucide-react";
import { Filter } from "@/components/Filter";


const Map = dynamic(() => import("@/components/Map"), {
  ssr: false  ,
  loading: () => <MapLoading/>,
});

export default function Home() {
  const [locaisFiltrados, setLocaisFiltrados] = useState<MapInfo[]>([]);
  /* const [tipoSelecionado, setTipoSelecionado] = useState<PointsType[]>([]);
  const [praiasSelecionadas, setPraiasSelecionadas] = useState<string[]>([]);

  const toggleFiltro = <T,>(item: T, lista: T[], setLista: (nova: T[]) => void) => {
    setLista(
      lista.includes(item) ? lista.filter((i) => i !== item) : [...lista, item]
    );
  };

  const locaisFiltrados: MapInfo[] = places.filter((place) => {
  if (tipoSelecionado.length === 0 && praiasSelecionadas.length === 0) {
    return true;
  }

  const matchTipo =
    tipoSelecionado.length === 0 || tipoSelecionado.includes(place.typePlace);

  const matchPraia =
    praiasSelecionadas.length === 0 || praiasSelecionadas.includes(place.beach);

  return matchTipo && matchPraia;
  }); */

  return (
    <div className="w-full h-full absolute font-poppins">
      <NavBar links={[
        {
          label: "Entrar",
          href: "#"
        },
        {
          label: "Cadastrar",
          href: "#"
        },
        {
          label: "Sobre",
          href: "#" 
        },
        {
          label: "Sair",
          href: "#" 
        }
      ]}
      onFilterChange={setLocaisFiltrados}
      />
      <div className="grid grid-cols-1 md:grid-cols-[375px_1fr]">

        <div className="hidden p-4 md:flex flex-col bg-[#98A2B2]">
          <Filter onFilterChange={setLocaisFiltrados}/>
        </div>

        <div className="h-[calc(100vh-96px)] 
          md:h-[calc(100vh-80px)] w-full">
            <Map places={locaisFiltrados}/>
        </div>

      </div>
    </div>
  )
}