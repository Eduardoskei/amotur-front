import NavBar from "@/components/NavBar";
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
        }
      ]}/>
      <div className="flex flex-col w-full min-h-[calc(100vh-80px)]">
        <Filter/>
        <div></div>
      </div>
    </div>
  )
}