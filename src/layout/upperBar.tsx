
import { useState } from "react"
import { Link } from "react-router-dom"

const UpperBar = () => {
    const [search, setSearch] = useState("")

    return (
        <div className="bg-[var(--dark-slate-gray)] flex flex-col items-center justify-center sticky top-0 z-50 p-4">
            <div className="bg-[var(--dark-slate-gray)] w-full h-full flex justify-center items-center pl-4 pr-4 ">
                <div className="h-full w-full flex flex-row gap-4 justify-between">
                    <span className="flex flex-row items-center ">
                        <Link to="/" className="aspect-square rounded-full border border-gray-500 h-full flex items-center justify-center text-white text-xs font-bold hover:bg-gray-600 transition-colors">
                            UKUweb
                        </Link>
                    </span>
                    <span className="w-3/12 flex flex-row justify-end items-center">
                        <div className="w-[80%] bg-[var(--dark-slate-gray-dark)] text-white pl-4 p-2 rounded-full border border-gray-500">
                            <input type="text" placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UpperBar