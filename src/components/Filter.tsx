import { Search } from "lucide-react"
import { useState } from "react";
import { places, MapInfo, PointsType } from "@/data/place";


export default function Filter() {
  const [tipoSelecionado, setTipoSelecionado] = useState<PointsType[]>([]);
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
  });

  return (
    <div>

      <div className="relative flex items-center mb-12">
        <Search className="absolute left-3 text-gray-600"/>
        <input type="text" placeholder="Buscar..."
        className="w-full py-4 pl-12 pr-10 text-lg border border-[rgba(0, 0, 0, 0.5)]
        rounded-lg bg-white"/>
      </div>     

      {/* <div className="grid grid-cols-3 gap-8 font-[550] z-10
    bg-white rounded-lg px-4 py-6 text-base sm:[640px]">

        <div className="flex flex-col-reverse gap-3 items-center w-full cursor-pointer"
        onClick={() =>
                toggleFiltro("Hotel" as PointsType, tipoSelecionado, setTipoSelecionado)
              }>
          <span>Hoteis</span>
          <div className="flex mx-auto justify-center items-center w-10 h-10 bg-[#D62B2B] rounded-[50%]">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} 
            viewBox="0 0 24 24">
              <path fill="#fff" d="M22 21H2v-2h1V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5h2v10h1zm-5-2h2v-8h-6v8h2v-6h2zm0-10V5H5v14h6V9zM7 11h2v2H7zm0 4h2v2H7zm0-8h2v2H7z"></path>
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 items-center w-full cursor-pointer"
        onClick={() =>
                toggleFiltro("Restaurante" as PointsType, tipoSelecionado, setTipoSelecionado)
              }>
          <span>Restaurantes</span>
          <div className="flex mx-auto justify-center items-center w-10 h-10 bg-[#2BD0D6] rounded-[50%]">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32">
              <path fill="#fff" d="M9 2h2v10H9z"></path>
              <path fill="#fff" d="M14 11a4 4 0 0 1-8 0V2H4v9a6 6 0 0 0 5 5.91V30h2V16.91A6 6 0 0 0 16 11V2h-2zm8-9h-1v28h2V20h3a2 2 0 0 0 2-2V8a5.78 5.78 0 0 0-6-6m4 16h-3V4.09c2.88.56 3 3.54 3 3.91z"></path>
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 items-center w-full cursor-pointer"
        onClick={() =>
                toggleFiltro("Pousada" as PointsType, tipoSelecionado, setTipoSelecionado)
              }>
          <span>Pousadas</span>
          <div className="flex mx-auto justify-center items-center w-10 h-10 bg-[#52DA37] rounded-[50%]">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
              <path fill="#fff" d="M1 19V4h2v10h8V6h8q1.65 0 2.825 1.175T23 10v9h-2v-3H3v3zm6-6q-1.25 0-2.125-.875T4 10t.875-2.125T7 7t2.125.875T10 10t-.875 2.125T7 13m6 1h8v-4q0-.825-.587-1.412T19 8h-6zm-6-3q.425 0 .713-.288T8 10t-.288-.712T7 9t-.712.288T6 10t.288.713T7 11m6-3v6z"></path>
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 items-center w-full cursor-pointer"
        onClick={() =>
                toggleFiltro("Bar" as PointsType, tipoSelecionado, setTipoSelecionado)
              }>
          <span>Bares</span>
          <div className="flex mx-auto justify-center items-center w-10 h-10 bg-[#FFE900] rounded-[50%]">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
              <path fill="#fff" d="M15.929 9.754a.75.75 0 0 0-1.473-.281a2.48 2.48 0 0 1-.773 1.376a2.5 2.5 0 0 1-1.169.598a.75.75 0 1 0 .307 1.469a4 4 0 0 0 1.872-.958a4 4 0 0 0 1.236-2.204M6 2.75A.75.75 0 0 1 6.75 2h10.5a.75.75 0 0 1 .75.75v6.5a6.25 6.25 0 0 1-5.5 6.206v5.053l2.748-.009a.75.75 0 0 1 .004 1.5l-3.5.011h-.005l-3-.011a.75.75 0 0 1 .006-1.5l2.247.008v-5.056A5.75 5.75 0 0 1 6 9.75zm1.5.75v2.75h9V3.5zm0 6.25A4.25 4.25 0 0 0 11.75 14a4.75 4.75 0 0 0 4.75-4.75v-1.5h-9z"></path>
            </svg>
          </div>
        </div>
        
      </div> */}
    </div>
  )
}