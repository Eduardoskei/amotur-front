"use client"
import { useRef } from "react";
import NavBar from "@/components/NavBar";
import Image from "next/image";

export default function Home() {
  const popUp1 = useRef<HTMLDialogElement | null>(null);
  const popUp2 = useRef<HTMLDialogElement | null>(null);

  const openModal1 = () => popUp1.current?.showModal();
  const closeModal1 = () => popUp1.current?.close();

  const openModal2 = () => popUp2.current?.showModal();
  const closeModal2 = () => popUp2.current?.close();

  return (
    <div className="h-screen font-instrument-sans">
      <NavBar/>
      <div className="relative w-screen h-[140px] sm:h-[240px]">
        <Image
          src={"/praia.jpg"}
          alt="praia"
          fill
          className="mask-b-from-70% mask-b-to-100% object-cover"
        />
      </div>

        <div className="flex justify-self-center mt-5 p-10 w-full justify-between items-center">
        {/* Instruções */}
        <button
          onClick={openModal1}
          className="bg-custom-blue border 
                border-cyan-700 text-white h-10 w-30 text-xl px-2.5 py-1.5 rounded-lg 
                hover:scale-105 hover:shadow-lg cursor-pointer transition duration-300"
        >
          Instruções
        </button>
        <dialog
          ref={popUp1}
          className="justify-self-center self-center 
                w-3/4 lg:w-1/2 px-10 py-6 rounded-2xl shadow-2xl backdrop:bg-dialog-backdrop"
        >
          <h2 className="text-center font-bold text-2xl mb-4">
            Navegando pelo mapa
          </h2>
          <p className="text-lg mb-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
            laudantium illo amet voluptatibus aspernatur pariatur, deleniti
            autem fugiat modi explicabo placeat nemo exercitationem commodi
            officiis suscipit adipisci eos eveniet magni!
          </p>
          <button
            onClick={closeModal1}
            className="bg-custom-blue border 
                    border-cyan-700 text-white text-lg px-2 py-1 rounded-lg 
                    hover:scale-105 hover:shadow-lg cursor-pointer transition duration-300"
          >
            Fechar
          </button>
        </dialog>

        {/* Guia */}
        <button
          onClick={openModal2}
          className="bg-custom-blue border 
                border-cyan-700 text-white h-10 w-30 text-xl px-2.5 py-1.5 rounded-lg 
                hover:scale-105 hover:shadow-lg cursor-pointer transition duration-300"
        >
          Guia
        </button>
        <dialog
          ref={popUp2}
          className="justify-self-center self-center 
                w-3/4 lg:w-1/2 px-10 py-6 rounded-2xl shadow-2xl backdrop:bg-dialog-backdrop"
        >
          <h2 className="text-center font-bold text-2xl mb-4">
            Interagindo com os ícones
          </h2>
          <p className="text-lg mb-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
            laudantium illo amet voluptatibus aspernatur pariatur, deleniti
            autem fugiat modi explicabo placeat nemo exercitationem commodi
            officiis suscipit adipisci eos eveniet magni!
          </p>
          <button
            onClick={closeModal2}
            className="bg-custom-blue border 
                    border-cyan-700 text-white text-lg px-2 py-1 rounded-lg 
                    hover:scale-105 hover:shadow-lg cursor-pointer transition duration-300"
          >
            Fechar
          </button>
        </dialog>
      </div>

      {/* Mapa */}
      <div>

      </div>

    </div>
  );
}
