import Image from "next/image"

export default function Filter() {
  return (
    <div className="flex flex-row gap-5 px-4 mt-[14px] font-[550] z-10">

      <button className="flex flex-row p-4 gap-3 items-center rounded-[50px] border">
        <span>Hoteis</span>
        <div className="flex justify-center items-center w-8 h-8 bg-[#D62B2B] rounded-[50%]">
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} 
            viewBox="0 0 24 24">
              <path fill="#fff" 
              d="M22 21H2v-2h1V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5h2v10h1zm-5-2h2v-8h-6
              v8h2v-6h2zm0-10V5H5v14h6V9zM7 11h2v2H7zm0 4h2v2H7zm0-8h2v2H7z">
              </path>
          </svg>
        </div>
      </button>

      <button className="flex flex-row p-4 gap-3 items-center rounded-[50px] border">
        <span>Restaurantes</span>
        <div className="flex justify-center items-center w-8 h-8 bg-[#2BD0D6] rounded-[50%]">
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} 
            viewBox="0 0 24 24">
            <path fill="#fff" 
              d="M7 22v-9.15q-1.275-.35-2.137-1.4T4 9V2h2v7h1V2h2v7h1V2h2v7q0 1.4-.862 2.45T9 12.85V22zm10 0v-8h-3V7q0-2.075 1.463-3.537T19 2v20z">
            </path>
          </svg>
        </div>
      </button>

      <button className="flex flex-row p-4 gap-3 items-center rounded-[50px] border">
        <span>Pousadas</span>
        <div className="flex justify-center items-center w-8 h-8 bg-[#52DA37] rounded-[50%]">
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="#fff" 
          d="M1 19V4h2v10h8V6h8q1.65 0 2.825 1.175T23 10v9h-2v-3H3v3zm6-6q-1.25 0-2.125-.875T4 10t.875-2.125T7 7t2.125.875T10 10t-.875 2.125T7 13m6 1h8v-4q0-.825-.587-1.412T19 8h-6zm-6-3q.425 0 .713-.288T8 10t-.288-.712T7 9t-.712.288T6 10t.288.713T7 11m6-3v6z">
            </path>
          </svg>
        </div>
      </button>

      <button className="flex flex-row p-4 gap-3 items-center rounded-[50px] border">
        <span>Bares</span>
        <div className="flex justify-center items-center w-8 h-8 bg-[#D62B2B] rounded-[50%]">
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} 
            viewBox="0 0 24 24"><path fill="#fff" 
            d="M22 21H2v-2h1V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5h2v10h1zm-5-2h2v-8h-6
            v8h2v-6h2zm0-10V5H5v14h6V9zM7 11h2v2H7zm0 4h2v2H7zm0-8h2v2H7z"></path>
          </svg>
        </div>
      </button>
    </div>
  )
}