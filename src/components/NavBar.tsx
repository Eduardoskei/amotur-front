"use client"
import Image from "next/image"
import { useState, useEffect } from "react"

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
      <header className="relative flex justify-center items-center w-full h-1/10 
      px-4 xl:px-12 bg-white drop-shadow-md z-50">
        
        <div className="absolute left-4 xl:hidden w-8 h-5 flex flex-col 
        justify-between cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="block h-[3px] bg-[#393737] rounded transition-all 
          duration-300"></span>
          <span className="block h-[3px] bg-[#393737] rounded transition-all 
          duration-300"></span>
          <span className="block h-[3px] bg-[#393737] rounded transition-all 
          duration-300"></span>
        </div>

        <div className="absolute xl:left-4 xl:static">
          <Image
            src="https://lirp.cdn-website.com/3b6c9aee/dms3rep/multi/opt/logo-amotur+%282%29-213w.png"
            alt="amotur-logo"
            width={150}
            height={48}
          />
        </div>

        <ul className="hidden xl:flex gap-16 text-[18px] mx-auto">
          {links.map((link, index) => (
                <li key={index} className="p-2 rounded-lg transition-all border-2 
                border-transparent hover:border-[#4D658A]">
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
        </ul>
      </header>

      {showMenu && (
          <div className={`fixed xl:hidden top-20 left-0 w-full h-full 
          bg-white flex flex-col px-4 gap-8 z-40 ${isMenuOpen ? "animate-slide-down" : "animate-slide-up"}`}>
            <ul className="flex flex-col gap-8 text-[22px] mt-12">
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
    </>
  )
}