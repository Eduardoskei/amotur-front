import Image from "next/image";
import { ClipLoader } from "react-spinners";

export default function MapLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-b animate-fade-in">
      <Image
        src="https://lirp.cdn-website.com/3b6c9aee/dms3rep/multi/opt/logo-amotur+%282%29-1920w.png"
        width={250}
        height={250}
        alt="AmoTur Logo"
        className="mb-6 w-48 sm:w-60 object-contain drop-shadow-sm"
        priority
      />

      <ClipLoader size={55} color="#576a90" />

      <p className="text-[#576a90] text-sm mt-4 font-semibold tracking-wide animate-pulse">
        Carregando mapa...
      </p>
    </div>
  );
}
