"use client"
import NavBar from "@/components/NavBar";
import dynamic from "next/dynamic";
import Filter from "@/components/Filter";
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false  ,
  loading: () => <p>Carregando mapa...</p>,
});

export default function Home() {
  
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
        <div className="hidden p-4 md:flex bg-[#98A2B2]">
          <Filter/>
        </div>
        <div className="h-[calc(100vh-96px)] 
        md:h-[calc(100vh-80px)] w-full">
          <Map/>
        </div>
      </div>
    </div>
  )
}