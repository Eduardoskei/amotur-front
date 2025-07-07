import NavBar from "@/components/NavBar";
import Image from "next/image";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false  ,
  loading: () => <p>Carregando mapa...</p>,
});
import Filter from "@/components/Filter";

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
          <p>Mapa</p>
        </div>
      </div>
    </div>
  )
}