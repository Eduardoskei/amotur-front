'use client'

import NavBar from "@/components/NavBar";
import Image from "next/image";
import dynamic from "next/dynamic";
import Filter from "@/components/Filter";
import { useState } from "react";
import { places, MapInfo, PointsType } from "@/data/place";
import MapLoading from "@/components/MapLoading";
import { Search } from "lucide-react";


const Map = dynamic(() => import("@/components/Map"), {
  ssr: false  ,
  loading: () => <MapLoading/>,
});

export default function Home() {
  
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
      ]}/>
      <div className="grid grid-cols-1 md:grid-cols-[375px_1fr]">

        <div className="hidden p-4 md:flex flex-col bg-[#98A2B2]">

          <div className="relative flex items-center mb-4">
            <Search className="absolute left-3 text-gray-600"/>
            <input type="text" placeholder="Buscar..."
            className="w-full py-4 pl-12 pr-10 text-lg border border-[rgba(0, 0, 0, 0.5)]
            rounded-lg bg-white"/>
          </div>

          <div className="grid grid-cols-3 gap-2 font-[550] z-10
      bg-white rounded-lg px-3 py-4 text-[14px] sm:[640px] mb-4">

            <div className={`flex flex-col-reverse gap-3 items-center w-full cursor-pointer rounded-lg border-2 p-2 ${
              praiasSelecionadas.includes("Icaraí") ?
              "border-[#4D658A]" : "border-transparent"
            }`}
            onClick={() =>
                    toggleFiltro("Icaraí", praiasSelecionadas, setPraiasSelecionadas)
                  }>
              <span>Icaraí</span>
              <div className="flex mx-auto justify-center items-center w-10 h-10 bg-[#4D658A] rounded-[50%]">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 48 48">
                  <g fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3.5"><path stroke-linejoin="round" d="M22 14s-2.7 5.293-4 12s-1 16-1 16m16.953-18.728c.346.23.893.391 1.428.503c.932.194 1.792-.446 1.768-1.397c-.045-1.774-.737-4.675-4.258-7.014c-3.325-2.207-6.626-2.238-8.708-1.92c-1.187.18-1.66 1.478-.978 2.467c.608.883 1.316 1.774 1.795 1.945c1 .355 2.203-.582 3.08 0c.876.581.615 1.925 1.492 2.507c.876.582 2.013-.18 2.89.402c.875.582.615 1.925 1.491 2.507"/><path stroke-linejoin="round" d="M20 17c.858-.286 1.389-1.226 1.686-1.979c.246-.622.026-1.308-.55-1.648c-1.295-.766-4.06-1.814-8.374-.561c-4.265 1.238-5.39 4.056-5.677 5.715a1.33 1.33 0 0 0 1.178 1.565c.56.063 1.176.035 1.544-.277c.807-.685 1.025-1.582 1.927-1.824c.901-.241 1.679.858 2.58.616c.902-.241 1.026-1.582 1.927-1.824c.902-.241 2.26.717 3.76.217M27 6c-2.5 1-5 6-5 8l13-6c-1.38-2.391-5.5-3-8-2"/><path stroke-linejoin="round" d="M20 5c4 1.422 3.38 6.609 2 9L10 5.922C11 4 16 3.579 20 5"/><path d="M26 35c8.284 0 13 1.79 13 4s-6.716 4-15 4s-15-1.79-15-4c0-.54.4-1.053 1.125-1.523"/></g>
                </svg>
              </div>
            </div>

            <div className={`flex flex-col-reverse gap-3 items-center w-full cursor-pointer rounded-lg border-2 p-2 ${
              praiasSelecionadas.includes("Moitas") ?
              "border-[#4D658A]" : "border-transparent"
            }`}
            onClick={() =>
                    toggleFiltro("Moitas" as PointsType, praiasSelecionadas, setPraiasSelecionadas)
                  }>
              <span>Moitas</span>
              <div className="flex mx-auto justify-center items-center w-10 h-10 bg-[#4D658A] rounded-[50%]">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M7.5 14A6 6 0 1 1 10 2.36L8 5l2 2S7 8 2 8m14.5 6A6 6 0 1 0 14 2.36L16 5l-2 2s3 1 8 1m-12 5v-2m4 2v-2"></path><ellipse cx={12} cy={17.5} rx={7} ry={4.5}></ellipse><path d="M2 16c2 0 3 1 3 1m-3 5c0-1.7 1.3-3 3-3m14-2s1-1 3-1m-3 3c1.7 0 3 1.3 3 3"></path></g>
                </svg>
              </div>
            </div>

            <div className={`flex flex-col-reverse gap-3 items-center w-full cursor-pointer rounded-lg border-2 p-2 ${
              praiasSelecionadas.includes("Caetanos") ?
              "border-[#4D658A]" : "border-transparent"
            }`}
            onClick={() =>
                    toggleFiltro("Caetanos", praiasSelecionadas, setPraiasSelecionadas)
                  }>
              <span>Caetanos</span>
              <div className="flex mx-auto justify-center items-center w-10 h-10 bg-[#4D658A] rounded-[50%]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 14 14">
                  <path fill="#fff" fill-rule="evenodd" d="M8.203 0C7.637 0 7.02.114 6.521.352c-.471.224-1.03.665-1.03 1.39c0 .474.369.712.512.797c.09.052.187.1.266.137l.034.016q.107.05.209.103c.298.156.561.35.702.761c.188.55.04 1.036-.388 1.424c-.452.41-1.244.717-2.294.717c-.747 0-1.37-.086-1.916-.3c-.538-.212-1.034-.562-1.509-1.138a.625.625 0 0 0-.964.795c.599.726 1.264 1.21 2.016 1.505c.743.293 1.537.388 2.373.388c1.27 0 2.392-.37 3.133-1.04c.766-.694 1.095-1.692.732-2.755c-.287-.841-.869-1.237-1.307-1.466l-.21-.103q.07-.05.179-.103c.297-.142.723-.23 1.144-.23c1.531 0 2.414.5 2.959 1.05c.556.562.81 1.222.99 1.689l.008.024c.389 1.01.537 2.043.577 3.137a.625.625 0 0 0 1.25-.047c-.044-1.176-.206-2.358-.66-3.54l-.02-.051c-.18-.47-.514-1.34-1.257-2.091C11.256.619 10.047 0 8.203 0M6.608 1.442l.01.008zM3.014 8.12a2.06 2.06 0 0 1 1.097-.288c.45 0 .802.11 1.097.288c.261.158.464.362.622.521l.031.031c.174.176.307.302.471.394c.153.085.355.153.668.153s.515-.068.668-.153c.164-.092.297-.218.471-.394l.03-.03a3.3 3.3 0 0 1 .623-.522a2.06 2.06 0 0 1 1.097-.288c.45 0 .802.11 1.097.288c.261.158.464.362.622.521l.03.031c.175.176.308.302.472.394c.153.085.355.153.668.153h.722a.5.5 0 0 1 .5.5v1.556h-1.222c-.293 0-.474-.062-.607-.137c-.147-.082-.269-.196-.444-.372l-.032-.032a3.4 3.4 0 0 0-.644-.54a2.2 2.2 0 0 0-1.162-.306c-.472 0-.847.117-1.162.307a3.3 3.3 0 0 0-.645.539l-.032.032c-.174.176-.296.29-.443.372c-.133.075-.314.137-.607.137s-.474-.062-.607-.137c-.147-.082-.268-.196-.443-.372l-.032-.032c-.157-.158-.37-.373-.645-.54a2.2 2.2 0 0 0-1.162-.306c-.472 0-.847.117-1.162.307a3.3 3.3 0 0 0-.644.539l-.032.032c-.175.176-.297.29-.444.372c-.133.075-.314.137-.607.137H0V9.72a.5.5 0 0 1 .5-.5h.722c.313 0 .515-.068.668-.153c.164-.092.297-.218.471-.394l.031-.03a3.2 3.2 0 0 1 .622-.522m9.764 4.405H14v.725a.5.5 0 0 1-.5.5S9.54 14 7 14s-6.5-.25-6.5-.25a.5.5 0 0 1-.5-.5v-.725h1.222c.494 0 .887-.11 1.218-.296c.317-.178.548-.41.719-.581c.185-.187.299-.3.436-.383c.116-.07.267-.127.516-.127s.4.057.516.127c.137.083.25.196.437.383c.17.17.401.403.718.58c.331.186.724.297 1.218.297s.887-.11 1.218-.296c.317-.178.548-.41.718-.581c.186-.187.3-.3.437-.383a.94.94 0 0 1 .516-.127c.25 0 .4.057.516.127c.137.083.25.196.436.383c.17.17.402.403.719.58c.33.186.724.297 1.218.297" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-3 gap-2 font-[550] z-10
      bg-white rounded-lg px-3 py-4 text-[14px] sm:[640px]">

          <div className={`flex flex-col-reverse gap-3 items-center w-full cursor-pointer rounded-lg border-2 p-2 ${
            tipoSelecionado.includes("Hotel" as PointsType) ?
            "border-[#4D658A]" : "border-transparent"
          }`}
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

          <div className={`flex flex-col-reverse gap-3 items-center w-full cursor-pointer rounded-lg border-2 p-2 ${
            tipoSelecionado.includes("Restaurante" as PointsType) ?
            "border-[#4D658A]" : "border-transparent"
          }`}
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

          <div className={`flex flex-col-reverse gap-3 items-center w-full cursor-pointer rounded-lg border-2 p-2 ${
            tipoSelecionado.includes("Pousada" as PointsType) ?
            "border-[#4D658A]" : "border-transparent"
          }`}
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

          <div className={`flex flex-col-reverse gap-3 items-center w-full cursor-pointer rounded-lg border-2 p-2 ${
            tipoSelecionado.includes("Bar" as PointsType) ?
            "border-[#4D658A]" : "border-transparent"
          }`}
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
        
      </div>
        </div>
        <div className="h-[calc(100vh-96px)] 
        md:h-[calc(100vh-80px)] w-full">
          <Map places={locaisFiltrados}/>
        </div>
      </div>
    </div>
  )
}