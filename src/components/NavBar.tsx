"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { places, MapInfo, PointsType } from "@/data/place";
import { Menu } from "lucide-react"
import { Filter } from "./Filter";

type NavBarContents = {
  links: {
  label: string;
  href: string;
  }[],
  onFilterChange: (locaisFiltrados: MapInfo[]) => void
}

export default function NavBar({ links, onFilterChange }: NavBarContents) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const [tipoSelecionado, setTipoSelecionado] = useState<PointsType[]>([]);
  const [praiasSelecionadas, setPraiasSelecionadas] = useState<string[]>([])

  useEffect(() => {
    if (isMenuOpen) {
      setShowMenu(true)
    } else {
      const timeout = setTimeout(() => {
        setShowMenu(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="relative flex items-center w-full h-24 md:h-20 
      px-4 lg:px-16 bg-white drop-shadow-md z-50">
        
        <Menu className="absolute lg:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
        </Menu>

        <div className="flex max-lg:justify-center flex-1/3">
          <Image
            src="https://lirp.cdn-website.com/3b6c9aee/dms3rep/multi/opt/logo-amotur+%282%29-213w.png"
            alt="amotur-logo"
            width={150}
            height={48}
          />
        </div>

        <ul className="hidden lg:flex flex-1/3 justify-center gap-12 lg:gap-24 text-[18px]">
          {links.map((link, index) => (
                <li key={index} className={`p-2 rounded-md transition-all border-b-2 border-r-2
                border-b-transparent border-r-transparent cursor-pointer ${link.label === "Sair" ?
                "hover:border-red-600" : "hover:border-[#010C5A]"}`}>

                  <a href={link.href} className={`${link.label === "Sair" ?
                  "text-red-600" : ""}`}>{link.label}</a>

                </li>
              ))}
        </ul>

        <div className="hidden lg:block md:flex-1/10 xl:flex-1/4"/>
      </header>

      {showMenu && (
          <div className={`fixed lg:hidden top-20 left-0 w-full h-full 
          bg-white flex flex-col px-4 z-10000 ${isMenuOpen ? "animate-slide-down" : "animate-slide-up"}`}>

            <ul className="flex flex-col gap-8 text-[22px] mt-12 mb-4">
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className={`${link.label === "Sair" ?
                  "text-red-600" : ""}`}>{link.label}</a>
                </li>
              ))}
            </ul>
            
            <Filter 
              tipoSelecionado={tipoSelecionado}
              setTipoSelecionado={setTipoSelecionado}
              praiasSelecionadas={praiasSelecionadas}
              setPraiasSelecionadas={setPraiasSelecionadas}
              onFilterChange={onFilterChange}
            />

          </div>
        )}
    </>
  )
}