import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PopupProps {
  name: string;
  whatsapp: string;
  email?: string;
  phone?: string;
  instagram?: string;
  website?: string;
  images: string[];
}

export function PopupMap({
  name,
  whatsapp,
  email,
  phone,
  instagram,
  website,
  images
}: PopupProps) {
  return (
    <div className="bg-[#fcf7ee] p-6 rounded-3xl w-[420px] relative font-sans text-neutral-800 shadow-lg">
      
      {images?.length > 0 && (
        <div className="w-full h-52 mb-4 rounded-xl overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true}}
            autoplay={{ delay: 2000 }}
            loop={true}
            className="h-full"
          >
            {images.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`Imagem ${index + 1}`}
                  className="object-cover w-full h-full rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <h2 className="text-2xl font-bold leading-snug mb-1">{name}</h2>
      <p className="text-lg text-neutral-600 mb-4">Fale com a gente e fique por dentro das novidades.</p>

      <div className="grid grid-cols-2 gap-x-24 gap-y-2 text-base text-neutral-800">
        {whatsapp && (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Image src="https://cdn-icons-png.flaticon.com/512/2504/2504957.png" width={15} height={15} alt="Whatsapp Icon" className="mt-1"/>
            {whatsapp}
          </div>
        )}

        {phone && (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Image src="https://cdn-icons-png.flaticon.com/512/10797/10797331.png" width={15} height={15} alt="Phone Icon" className="mt-1"/>
            {phone}
          </div>
        )}

        {email && (
          <div className="flex items-center gap-2">
            <Image src="https://cdn-icons-png.flaticon.com/512/2099/2099131.png" width={15} height={15} alt="Email Icon" className="mt-1"/>
            {email}
          </div>
        )}

        {instagram && (
          <div className="flex items-center gap-2">
            <Image src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width={15} height={15} alt="Instagram Icon" className="mt-1"/>
            <a href={instagram.startsWith('http') ? instagram : `https://www.instagram.com/${instagram.replace(/^@/, '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Instagram</a>
          </div>
        )}

        {website && (
          <div className="flex items-center gap-2">
            <Image src="https://cdn-icons-png.flaticon.com/512/4116/4116480.png" width={15} height={15} alt="Website Icon" className="mt-1"/>
            <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Web Site</a>
          </div>
        )}
      </div>
    </div>
  );
}
