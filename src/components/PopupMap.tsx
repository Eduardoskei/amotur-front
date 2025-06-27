import React from "react";
import Link from "next/link";
import Image from "next/image";

interface PopupContentProps {
  name: string;
  whatsapp: string;
  email?: string;
  phone?: string;
  instagram?: string;
  website?: string;
}

export function PopupMap({
  name,
  whatsapp,
  email,
  phone,
  instagram,
  website
}: PopupContentProps) {
  return (
    <div className="bg-[#fcf7ee] p-6 rounded-3xl w-[420px] relative font-sans text-neutral-800">

      <h2 className="text-2xl font-bold leading-snug mb-1">{name}</h2>
      <p className="text-lg text-neutral-600 mb-4">Fale com a gente e fique por dentro das novidades.</p>

      <div className="space-y-1 text-base text-neutral-800">
        {whatsapp && (
            <div className="flex items-center gap-2">
             <Image src='/popupIcon/whatsapp.png' width={15} height={15} alt="Whatsapp Icon"/>
              {whatsapp}
            </div>
        )}

        {phone && (
            <div className="flex self-center items-center gap-2">
             <Image src='/popupIcon/phone.png' width={15} height={15} alt="Phone Icon"/>
              {phone}
            </div>
        )}

        {email && (
            <div className="flex self-center items-center gap-2">
             <Image src='/popupIcon/email.png' width={15} height={15} alt="Email Icon"/>
              {email}
            </div>
        )}

        {(instagram || website) &&(
            <div>
                {instagram && (
                  <div className="flex items-center gap-2">
                    <Image src='/popupIcon/instagram.png' width={15} height={15} alt="Instagram Icon"/>
                    <a href={instagram} target="_blank">Instagram</a>
                  </div>
                )}
                
                {website && (
                  <div className="flex items-center gap-2">
                    <Image src='/popupIcon/website.png' width={15} height={15} alt="website Icon"/>
                    <a href={website} target="_blank">Web Site</a>
                  </div>
                )}
            </div>
        )}
      </div>

    </div>
  );
}
