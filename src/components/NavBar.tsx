"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import Filter from "./Filter"
import { Menu } from "lucide-react"

type NavBarContents = {
  links: {
  label: string;
  href: string;
  }[]
}

export default function NavBar({ links }: NavBarContents) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

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
      px-4 md:px-16 bg-white drop-shadow-md z-50">
        
        <Menu className="absolute md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
        </Menu>

        <div className="flex max-md:justify-center flex-1/3">
          <Image
            src="https://lirp.cdn-website.com/3b6c9aee/dms3rep/multi/opt/logo-amotur+%282%29-213w.png"
            alt="amotur-logo"
            width={150}
            height={48}
          />
        </div>

        <ul className="hidden md:flex flex-1/3 justify-center gap-12 lg:gap-24 text-[18px]">
          {links.map((link, index) => (
                <li key={index} className="p-2 rounded-lg transition-all border-2 
                border-transparent cursor-pointer hover:border-[#4D658A]">
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
        </ul>

        <div className="hidden md:block md:flex-1/10 xl:flex-1/4"/>
      </header>

      {showMenu && (
          <div className={`fixed md:hidden top-20 left-0 w-full h-full 
          bg-white flex flex-col gap-24 px-4 z-40 ${isMenuOpen ? "animate-slide-down" : "animate-slide-up"}`}>

            <ul className="flex flex-col gap-8 text-[22px] mt-12">
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            
            <Filter/>
          </div>
        )}
    </>
  )
}
