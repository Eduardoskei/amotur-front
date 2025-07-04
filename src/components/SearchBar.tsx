import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="relative flex items-center mb-12">
      <Search className="absolute left-3 text-gray-600"/>
      <input type="text" placeholder="Buscar..."
      className="w-full py-4 pl-12 pr-10 text-lg border border-[rgba(0, 0, 0, 0.5)]
      rounded-lg bg-white"/>
    </div>
  )
}